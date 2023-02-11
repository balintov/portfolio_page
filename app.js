var express = require('express');
var data = require('./data');
const mongoose = require('mongoose');
var app = express();
const News = require('./models/News.js');
const CurriculumYears = require('./models/CurriculumYears.js');
const Interests = require('./models/Interests.js');
const Pictures = require('./models/Pictures.js');
const CurrentWorkplace = require('./models/CurrentWorkplace.js');
const PreviousWorkplaces = require('./models/PreviousWorkplaces.js');


const fetch = (...args) => import('node-fetch').then(({
    default: fetch
}) => fetch(...args));

require('dotenv').config({
    path: 'variables.env'
});


async function connect() {
    try {
        await console.log(mongoose.connect(process.env.DATABASE));
        console.log("connnected");
        console.log(mongoose.connections.s);
    } catch (error) {
        console.log('WE HAVE A HUGE ERROR HOUSTON!!!' + error);
    }
}
 

connect();

app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

app.get('/', async function(req, res) {
    var tags = data.metaTags;
    // Get the Url in order to put into metatags
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

    var interestPromise = Interests
        .find();
	
	var currentWorkplacePromise = CurrentWorkplace
		.find();
	
	var previousWorkplacesPromise = PreviousWorkplaces
		.find();

    const postpromise = fetch('https://m2.mtmt.hu/api/publication?&cond=authors%3Beq%3B10061859&ty_on=1&ty_on_check=1&st_on=1&st_on_check=1&url_on=1&url_on_check=1&cite_type=2&sort=publishedYear%2Cdesc&size=10&page=1&format=json');

    const [interests, mtmtData, currentWorkplace, previousWorkplaces] = await Promise.all([interestPromise, postpromise, currentWorkplacePromise, previousWorkplacesPromise]);
    postpromise
        .then(dataFromMtmtm => dataFromMtmtm.json())
        .then(dataFromMtmtm => {
            res.render('./index', {
                interests: interests,
                tags: tags.indexPage,
                mtmtData: dataFromMtmtm.paging.numberOfElements,
                fullUrl: fullUrl,
                currentWorkPlace: currentWorkplace[0].name
            });
        })
        .catch((err) => {
             console.log(err);
            res.render('./not-found-data', {
        tags: tags.notFoundPage,
        fullUrl: fullUrl
        });
        })

});

app.get('/curriculum', async function(req, res) {
    // Get the Url in order to put into metatags
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    var tags = data.metaTags;

    //Get the curriculum data from MongoDB
    var curriculumPromise = CurriculumYears
        .find()
        .sort({
            year: 'asc'
        }); //sorting each happenennings reverse
	
	var currentWorkplacePromise = CurrentWorkplace
		.find();
	
	var previousWorkplacesPromise = PreviousWorkplaces
		.find();
	
	 var interestPromise = Interests
        .find();

    const postpromise = fetch('https://m2.mtmt.hu/api/publication?&cond=authors%3Beq%3B10061859&ty_on=1&ty_on_check=1&st_on=1&st_on_check=1&url_on=1&url_on_check=1&cite_type=2&sort=publishedYear%2Cdesc&size=10&page=1&format=json');

    const [cv, mtmtData, currentWorkplace, previousWorkplaces, interests] = await Promise.all([curriculumPromise, postpromise, currentWorkplacePromise, previousWorkplacesPromise, interestPromise]);
	 // Calculate the number of years of which I am working
    var year = new Date().getFullYear();
    var workingYears = year - 2017;
    var numberOfWorkplaces = Object.keys(previousWorkplaces).length + 1; // MÓDOSÍTANI KELL!!!!

	
    postpromise
        .then(dataFromMtmtm => dataFromMtmtm.json())
        .then(dataFromMtmtm => {
            res.render('./curriculum', {
                cv: cv,
                tags: tags.curriculumPage,
                fullUrl: fullUrl,
                workingYears: workingYears,
                numberOfWorkplaces: numberOfWorkplaces,
                mtmtData: dataFromMtmtm.paging.numberOfElements,
				interests: interests
            });
        })
        .catch((err) => {
            console.log(err);
            res.render('./not-found-data', {
        tags: tags.notFoundPage,
        fullUrl: fullUrl
        });
	});
});

app.get('/works', async function(req, res) {
    var publications = data.mtmtPublications;
    var translateFunction = data.translate;
    var flagDictionary = data.flagDictionary;
    var tags = data.metaTags;
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

    //Get the insterests list data from MongoDB
    var interestPromise = Interests
        .find();

    const postpromise = fetch('https://m2.mtmt.hu/api/publication?&cond=authors%3Beq%3B10061859&ty_on=1&ty_on_check=1&st_on=1&st_on_check=1&url_on=1&url_on_check=1&cite_type=2&sort=publishedYear%2Cdesc&size=10&page=1&format=json');
    const [interests, mtmtData] = await Promise.all([interestPromise, postpromise]);
    postpromise
        .then(dataFromMtmtm => dataFromMtmtm.json())
        .then(dataFromMtmtm => {
            res.render('./works', {
                publications: dataFromMtmtm,
                translateFunction: translateFunction,
                flagDictionary: flagDictionary,
                tags: tags.worksPage,
                interests: interests,
                fullUrl: fullUrl
            });
        })
        .catch((err) => {
		console.log(err);
            res.render('./not-found-data', {
        tags: tags.notFoundPage,
        fullUrl: fullUrl
    });
        })
});

app.get('/news', async function(req, res) {
    var tags = data.metaTags.newsPage;
    var newsIdMaker = data.newsIdMaker;
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    var regexPattern = /[^A-Za-z0-9]/g;

    //Getting the news data from MongoDB
    var newsPromise = News
        .find()
		.sort({
			date: -1
        });

    //Get the insterests list data from MongoDB
    var interestPromise = Interests
        .find();

    const [news, interests] = await Promise.all([newsPromise, interestPromise]);


    res.render('./news-list', {
        news: news,
        interests: interests,
        newsIdMaker: newsIdMaker,
        tags: tags,
        fullUrl: fullUrl,
        regexPattern: regexPattern,
        dateMaker: data.dateMaker
    });

});

app.get('/news/:newsId', async function(req, res) {
    var newsId = req.params.newsId;
	var notFoundTags = data.metaTags.notFoundPage;

    var key = "";
    var protocol = req.protocol;
    var get = req.get('host');
    var originalUrl = req.originalUrl;
    var newsIdMaker = data.newsIdMaker;
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

    //Getting the news data from MongoDB
    var newsPromise = News
        .find();

    //Get the insterests list data from MongoDB
    var interestPromise = Interests
        .find();

    const [news, interests] = await Promise.all([newsPromise, interestPromise]);

    //In order to know which news should be displayed, the same function is ran with which the newsId has been made
    for (var prop in news) {

        if (newsId == newsIdMaker.newsIdMakerFunction(news[prop].title, news[prop].subtitle)) {

            key = prop;
        } else {
			/*
            res.render('./notfoundpage', {
        interests: interests,
        tags: notFoundTags,
        fullUrl: fullUrl
		
    });
	*/
        }
    }

    res.render('./news-item', {
        news: news[key],
        allNews: news,
        protocol: protocol,
        get: get,
        originalUrl: originalUrl,
        fullUrl: fullUrl,
        newsIdMaker: newsIdMaker,
        dateMaker: data.dateMaker
    });
});

app.get('/pictures', async function(req, res) {
    
	var tags = data.metaTags.picturesPage;
    //Get the insterests list data from MongoDB
    var interestPromise = Interests
        .find();

    var picturesPromise = Pictures
        .find();

    const [interests, pictures] = await Promise.all([interestPromise, picturesPromise]);

    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    res.render('./pictures', {
        pictures: pictures,
        interests: interests,
        tags: tags,
        fullUrl: fullUrl
    });

});

app.use(function(req, res, next) {
    
	var tags = data.metaTags.notFoundPage;
    //Get the insterests list data from MongoDB
   
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    res.status(400).render('./notfoundpage', {
        tags: tags,
        fullUrl: fullUrl
    });
	


});


app.listen(3000);