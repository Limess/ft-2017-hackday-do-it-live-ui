const Crawler = require("crawler");
const fs = require('fs');
const logger = require('winston');
const path = require('path');
const moment = require('moment');

const BASE_URI = 'https://live.ft.com';

const dataArray = [];

const limit = 10;
let c;
let offset = 0;

const getLiveResultsUrl = (givenOffset) => {
    const query = `Filters%5Bend_date%5D=comingup&Filters%5Bsectors%5D=&Filters%5Bregions%5D=&SearchText=&SearchCriteriumIdentifier=dateasc&Limit=${limit}&Offset=${givenOffset}&FirstEventsLarge=0`
    return `https://live.ft.com/search/results/?${query}`;
};

c = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page
    callback : function (error, {request, $}, done) {
        if (error) {
            console.error(error);
            return done(error);
        }
        const events = $('.ft-event');

        if (events.length > 0) {
            events.each(function() {
                const href = $(this).find('a').attr('href');
                if (/\/events\//i.test(href)) {
                    crawlEvent(`${BASE_URI}${href}`);
                }
            });

            offset += limit;
            c.queue(getLiveResultsUrl(offset));
        }

        done();
    }
});

    
// Queue just one URL, with default callback
c.queue(getLiveResultsUrl(offset));

const itemProp = (attribute) => `[itemprop="${attribute}"]`;


const DEFAULT_TIME = '9:00am';
const getDate = ($) => {
    const date = $(`.ft-event-location ${itemProp('startDate')}`).attr('datetime');
    let startTime;
    try {
        startTime = $('.ft-block-agenda .time').first().text().trim() || DEFAULT_TIME;
    } catch (error) {
        startTime = DEFAULT_TIME;
    }

    return moment(`${date} ${startTime}`, 'DD-MM-YYYY HH:mmA').format();
}

const getCategories = ($banner) => {
    const categoriesText =  $banner.find('.ft-event-category').text().trim().replace(/\s/g, '')
    return categoriesText ? categoriesText.split(',') : [];
}

const hasScript = ($element) => $element.find('script').length > 0; 

const getDescription = ($) => {
    const overview = $('.ft-event-full-overview').text().trim();
    const $articleDescription = $('.article-desc');
    const description = $articleDescription.text().trim();

    return hasScript($articleDescription) ? overview : description;
}


const crawlEvent = (uri) => {
    c.queue([{
        uri, 
        callback(error, {request, $}, done) {
            if (error) {
                console.error(error);
                return done(error);
            }
            try {
                const uri = request.uri.href;

                const date = getDate

                const $banner = $('.ft-event-top');

                const entry = {
                    uri,
                    categories: getCategories($banner)  ,
                    title: $banner.find(itemProp('name')).text().trim(),
                    location: $banner.find(`.ft-event-location ${itemProp('location')}`).text().trim(),
                    date: getDate($),
                    speakers: $('.ft-full-person-details').map(function() {
                        const $person = $(this);
                        return {
                            name: $person.find(itemProp('name')).html().trim(),
                            company: $person.find(itemProp('worksFor')).html().trim(),
                            jobTitle: $person.find(itemProp('jobTitle')).html().trim()
                        };

                    }).get(),
                    description: getDescription($)
                };
                logger.info(entry.date);

                dataArray.push(entry);
                // logger.info(entry);
                done();
            } catch (error) {
                logger.error(`Error for uri: ${uri}`, error);
                done(error);
            }
        }
    }])
}

process.on('uncaughtException', (error) => {
    logger.error(error);
    process.exit(1);
});

process.on('SIGINT', () => {
    logger.info('Got exit signal')
    process.exit();
})

process.on('exit', () => {
    // logger.info(dataArray);
    logger.info(`Scraped ${dataArray.length} items`);   
    fs.writeFileSync(path.join(__dirname, 'output/ft-live.json'), JSON.stringify({pages: dataArray}));
    process.exit();
})