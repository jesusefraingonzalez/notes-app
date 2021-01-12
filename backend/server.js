// require expressjs
const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// set up express
const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//paths to database and public folder
const DB_PATH = path.join(__dirname, 'db.json');
const PUBLIC_PATH = path.join(__dirname, '..', 'public');

//creates db if it doesn't already exist
if (!fs.existsSync(DB_PATH)) {
    fs.writeFile(DB_PATH, '[]', err => { if (err) throw err });
}

// returns the notes.html file
app.get('/notes', (req, res) => {
    res.sendFile(path.join(PUBLIC_PATH, 'notes.html'));
});

// route for getting notes
app.get('/api/notes', (req, res) => {
    fs.readFile(DB_PATH, (err, rawData) => {
        if (err) throw err;
        let notes = JSON.parse(rawData);
        return res.json(notes);
    });
});

// route for posting new notes
app.post('/api/notes', (req, res) => {
    let newNote = req.body;

    fs.readFile(DB_PATH, newNote, (err, data) => {
        if (err) throw err;

        //parse data from file into JSON
        let json = JSON.parse(data);

        //add unique id
        newNote.id = crypto.randomBytes(32).toString('hex');

        //push newNote data into json
        json.push(newNote);

        //write new json to file
        fs.writeFile(DB_PATH, JSON.stringify(json), (err) => {
            if (err) throw err;
            console.log(`${newNote.title} appended to file db.json`);
        });
        return res.json(newNote);
    }); 
});

// route for deleting notes
app.delete('/api/notes/:id', (req, res) => {
    let id = req.params.id;
    fs.readFile(DB_PATH, (err, rawData) => {
        if (err) throw err;
        let json = JSON.parse(rawData);
        // remove all instances of the given id from the database
        json = JSON.stringify(json.filter(element => {
            return !(element.id === id);
        }));

        fs.writeFile(DB_PATH, json, (err) => {
            if (err) throw err;
            console.log(`\nNote deleted from database:\n${id}\n`);
            res.sendStatus(200);
        });
        
    });
});

// catch all route
app.get('*', (req, res) => {
    res.sendFile(path.join(PUBLIC_PATH, 'index.html'));
});

//starts server
app.listen(PORT, () => {
    console.log(`Server now listening on port ${PORT}`);
});