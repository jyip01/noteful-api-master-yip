const path = require('path')
const express = require('express')
const xss = require('xss')
const NotesService = require('./notes-service')
const notesRouter = express.Router()
const jsonParser = express.json()

const serializeNote = note => ({
    id: note.id,
    name: xss(note.name),
    modified: note.modified, 
    folderid: note.folderid, 
    content: xss(note.content)
})

notesRouter 
    .route('/')
    .get((req,res,next)=>{
        NotesService.getAllNotes(
            req.app.get('db')
        )
            .then(notes=>{
                res.json(notes.map(serializeNote))
            })
            .catch(next)
    })
    .post(jsonParser, (req,res,next)=>{
        const {name,modified,folderid,content} = req.body
        const newNote = {name,modified,folderid,content}

        //VALIDATION

        //name is required
        if(!newNote.name){
            return res
                .status(400)
                .send({error: {message:`Missing 'name' in request body`}})
        }

        //content is required
        if(!newNote.content){
            return res
                .status(400)
                .send({error: {message:`Missing 'content' in request body`}})
        }
        
        //folderid is required
        if(!newNote.folderid){
            return res
                .status(400)
                .send({error: {message:`Missing 'folderid' in request body`}})
        }

        NotesService.insertNote(
            req.app.get('db'),
            newNote
        )
            .then(note=>{
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl,`/${note.id}`))
                    .json(serializeNote(note))
            })
            .catch(next)
    })

notesRouter
    .route('/:note_id')
    .all((req, res, next)=>{
        NotesService.getById(
            req.app.get('db'),
            req.params.note_id
        )
            .then(note=>{
                if(!note){
                    return res.status(404).json({
                        error: {message: `Note doesn't exist`}
                    })
                }
                res.note=note
                next()
            })
            .catch(next)
    })
    .get((req,res,next)=>{
        res.json(serializeNote(res.note))
    })
    .delete((req,res,next)=>{
        NotesService.deleteNote(
            req.app.get('db'),
            req.params.note_id
        )
            .then(()=>{
                res.status(204).end()
            })
            .catch(next)
    })
    .patch(jsonParser,(req,res,next)=>{
        const {name,modified,folderId,content} = req.body
        const noteToUpdate = {name,modified,folderId,content}

        const numberOfValues = Object.values
        (noteToUpdate).filter(Boolean).length
            if(numberOfValues===0){
                return res.status(400).json({
                    error: {
                        message: `Request body must contain 'name','modified','folderId', or 'content'`
                    }
                })
            }

        NotesService.updateNote(
            req.app.get('db'),
            req.params.note_id,
            noteToUpdate
        )
            .then(numRowsAffected=>{
                res.status(204).end()
            })
            .catch(next)
    })


module.exports = notesRouter