const express = require('express');
const app = express();
const fs = require('fs');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//HELMET secutity
const helmet = require("helmet");
app.use(helmet());

//Set constant PORT variable to listen to port 3000
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

//GET function that displays all the data in 'favourites.json'
app.get('/api/favourites', (req, res) => { 
    fs.readFile('favourites.json', (err, data) => {
        if (err) res.send('File not found. First post to create file.');
        else
        res.send(JSON.parse(data));
    })
});

//POST function to add a new item to array.
app.post('/api/favourites', (req, res) => {
    fs.readFile('favourites.json', (err, data) => { //use fs readfile function.
        if (err) res.send('File not found. First post to create file.');
        else
        var existingData = JSON.parse(data); //parse json data.
        var updateItem = req.body;
        existingData.push(updateItem); //push new params into array.
        fs.writeFile('favourites.json', JSON.stringify(existingData), (err) => { //stringify data and write json file again.
            if (err) throw err;
            res.send(updateItem);
        });
    });
});

//DELETE function
app.delete('/api/favourites', (req, res) => { 
    fs.readFile('favourites.json', (err, data) => {  //use fs readfile function.
        if (err) res.send('File not found. First post to create file.');
        else
        var existingData = JSON.parse(data); //parse json data.
        var updatedData = existingData.filter(item => item.trackId !== Number(req.param('track-id'))); //used filter() to return all items in array that don't match id.
        fs.writeFile('favourites.json', JSON.stringify(updatedData), (err) => { //stringify data and write json file again.
            if (err) throw err;
            res.send(updatedData);
        });
    });
});

//Error message.
app.use(function(err, req, res, next) {
    console.log(err.stack)
    res.status(500).send('Something broke!')
});

//Change Express’ App.js file to call React build assets
const path = require("path");
if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}
