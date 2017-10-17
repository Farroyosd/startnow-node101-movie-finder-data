const express = require('express');
const morgan = require('morgan');
const axios = require('axios')

 var cache = {};


const app = express();
app.use(morgan('dev'));

app.get('/', function (req, res) {
    var search = req.query;
    var key = Object.keys(search);
    var movie = Object.values(search);

 

    if(cache.hasOwnProperty(movie)){
        res.json(cache[movie]);
    } else{

    axios.get('http://www.omdbapi.com/?apikey=8730e0e&' + key + '=' + encodeURI(movie))
        .then(function (response) {
            cache[movie]= response.data;
            res.send(response.data);
        })
        .catch(function (error) {
            console.log(error);
            res.send("error")
        })

    }

});





// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter

module.exports = app;