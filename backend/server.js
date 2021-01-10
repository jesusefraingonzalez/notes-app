// require expressjs
const express = require('express');

// set up express
const app = express();
const PORT = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/notes', (request, response) => {
    console.log(request, response);
});

app.get('*', (request, response) => {
    console.log(request, response);
});

app.listen(PORT , () => {
    console.log(`Server now listening on port ${PORT}`);
});