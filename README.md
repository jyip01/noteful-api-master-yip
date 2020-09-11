
# Noteful API

This the noteful server for the noteful client, created for the Thinkful Module 17 "Add relationships to Blogful" checkpoint. 

## Entity Relationship Diagram 

![ERD](https://i.imgur.com/1v2kePT.jpg)

## Seeding the noteful database

FIRST, Use the path "/Users/meganwade/projects/noteful-api/seeds/seed.folders.sql" to seed the folders table. THEN, use the path "/Users/meganwade/projects/noteful-api/seeds/seed.notes.sql" to seed the notes table.

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run migrations `npm run migrate`

Run the tests `npm test`

## Deploying

When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.