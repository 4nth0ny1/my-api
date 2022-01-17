const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();

const newspapers = [
    {
        name: 'thetimes', 
        address: 'http://www.thetime.co.uk',
        base: ''
    }
];

//show the scraped data function


app.get('/', (req, res) => {
    res.json('Welcome to my Climate Change News API')
})

app.get('/news', (req, res) => {
    res.json(articles)
})

// scrape the data 


// create the server on port 
