const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const app = express()

const newspapers = [
    {
        name: 'techcrunch',
        address: 'https://techcrunch.com/',
        base: ''
    },
    {
        name: 'thetimes',
        address: 'https://www.thetimes.co.uk',
        base: ''
    },
    {
        name: 'guardian',
        address: 'https://www.theguardian.com/us/technology',
        base: '',
    },
    {
        name: 'telegraph',
        address: 'https://www.telegraph.co.uk',
        base: 'https://www.telegraph.co.uk',
    },
    {
        name: 'nyt',
        address: 'https://www.nytimes.com',
        base: '',
    },
    {
        name: 'electrek',
        address: 'https://electrek.co/',
        base: '',
    },
    {
        name: 'wired',
        address: 'https://www.wired.com/',
        base: 'https://www.wired.com/',
    },
    {
        name: 'un',
        address: 'https://www.un.org',
        base: '',
    },
    {
        name: 'bbc',
        address: 'https://www.bbc.co.uk',
        base: 'https://www.bbc.co.uk',
    },
    {
        name: 'es',
        address: 'https://www.standard.co.uk',
        base: 'https://www.standard.co.uk'
    },
    {
        name: 'sun',
        address: 'https://www.thesun.co.uk',
        base: ''
    },
    {
        name: 'dm',
        address: 'https://www.dailymail.co.uk',
        base: ''
    },
    {
        name: 'nyp',
        address: 'https://nypost.com',
        base: ''
    }
]

const articles = []

newspapers.forEach(newspaper => {
    axios.get(newspaper.address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)

            $('a:contains("Self-Driving")', html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')

                articles.push({
                    title,
                    url: newspaper.base + url,
                    source: newspaper.name
                })
            })

        })
})

app.get('/', (req, res) => {
    res.json('Welcome to my Self-Driving News API')
})

app.get('/news', (req, res) => {
    res.json(articles)
})

app.get('/news/:newspaperId', (req, res) => {
    const newspaperId = req.params.newspaperId

    const newspaperAddress = newspapers.filter(newspaper => newspaper.name == newspaperId)[0].address
    const newspaperBase = newspapers.filter(newspaper => newspaper.name == newspaperId)[0].base


    axios.get(newspaperAddress)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const specificArticles = []

            $('a:contains("Self-Driving")', html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')
                specificArticles.push({
                    title,
                    url: newspaperBase + url,
                    source: newspaperId
                })
            })
            res.json(specificArticles)
        }).catch(err => console.log(err))
})

// express server
app.listen(3001, ()=> {
    console.log('your server is running on 3001')
});