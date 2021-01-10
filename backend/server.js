// require expressjs
const express = require('express');
const fs = require('fs');
const path = require('path');
const { finished } = require('stream');

// set up express
const app = express();
const PORT = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// returns the notes.html file
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'notes.html'));
});

// returns the index.html file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// route for getting notes
app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, 'db.json'), (err, rawData) => {
        if (err) throw err;
        let notes = JSON.parse(rawData);
        return res.json(notes);
    });
});

// route for posting new notes
app.post('/api/notes', (req, res) => {
    let newNote = JSON.stringify(req.body);
    fs.writeFile(path.join(__dirname, 'db.json'), newNote, (err) => {
        if (err) throw err;
        console.log('new note written successfully');
        return newNote;
    });
});

// route for deleting notes
app.delete('/api/notes:id', (req, res) => {
    let id = req.params.id;
    fs.readFile(path.join(__dirname, 'db.json'), (err, rawData) => {
        if (err) throw err;
        let data = JSON.parse(rawData);

        const noteExists = (noteObject) => {
            return noteObject.title === id;
        };

        console.log(data.find(noteExists));
    });
});

//starts server
app.listen(PORT, () => {
    console.log(`Server now listening on port ${PORT}`);
});