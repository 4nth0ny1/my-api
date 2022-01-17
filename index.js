const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();

const newspapers = [
    {
        name: 'thetimes', 
        address: 'http://www.thetimes.co.uk',
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
app.get('/news/:newspaperId', (req, res) => {
    const newspaperId = req.params.newspaperId;

    const newspaperAddress = newspapers.filter(newspaper => newspaper.name == newspaperId)[0].address;
    const newspaperBase = newspapers.filter(newspaper => newspaper.name == newspaperId)[0].base;

    
})

// express server
app.listen(3001, ()=> {
    console.log('your server is running on 3001')
});