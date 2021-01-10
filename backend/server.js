// require expressjs
const express = require('express');
const fs = require ('fs');

// set up express
const app = express();
const PORT = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// //open db.json
// fs.open('db.json', (err, fd) => {
//     if (err) throw err;
//     console.log(fd);
// });

// returns the notes.html file
app.get('/notes', (req, res) => {
    return ('../public/notes.html');
});

// returns the index.html file
app.get('*', (req, res) => {
    return ('../public/index.html');
});

// route for getting notes
app.get('/api/notes' , (req, res) => {

});

// route for posting new notes
app.post('/api/notes', (req, res) => {
   
});

// route for deleting notes
app.delete('/api/notes:id', (req, res) => {

});

//starts server
app.listen(PORT , () => {
    console.log(`Server now listening on port ${PORT}`);
});