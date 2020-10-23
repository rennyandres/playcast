// routes.js

/*----------------------------- GLOBAL VARIABLES ----------------------------*/ 
const express    = require('express');
const app        = express();
const router     = express.Router();

const path       = require('path');
const request    = require('request');
const xmlParser  = require('fast-xml-parser');
const he         = require('he');

const parser     = require('./parser');

let   itunesSearchEndpoint = 'https://itunes.apple.com/search?media=podcast&term='; 
let   itunesLookupEndpoint = 'https://itunes.apple.com/lookup?id=';


/*---------------------------------- CONFIG ---------------------------------*/
let options = {
    attributeNamePrefix : "@_",
    attrNodeName: "attr", //default is 'false'
    textNodeName : false,
    ignoreAttributes : false,
    ignoreNameSpace : false,
    allowBooleanAttributes : false,
    parseNodeValue : false,
    parseAttributeValue : false,
    trimValues: true,
    cdataTagName: false, //default is 'false'
    cdataPositionChar: "\\c",
    localeRange: "",
    parseTrueNumberOnly: false,
    attrValueProcessor: a => he.decode(a, {isAttributeValue: true}),
    tagValueProcessor : a => he.decode(a) //default is a=>a
};


/*----------------------------------- BODY ---------------------------------*/
router.use('/', express.static(__dirname + '/playcast-ui/build'));

router.get('/api/podcast/search', (req, res) => {
    request(
        itunesSearchEndpoint + req.query.term, (err, response, body) => {
        if(err) throw err;
        else if(response.statusCode === 200) {
            res.send(parser.searchResults(JSON.parse(body)));
            //res.send(JSON.parse(body));
        }
        else res.send(response.statusCode);
    });
});

router.get('/api/podcast/:trackId', (req, res) => {
    request(itunesLookupEndpoint + req.params.trackId, (err, response, body) => {
       if(err) throw err;
       if(response.statusCode === 200) {
           body = JSON.parse(body);
           request(body.results[0].feedUrl, (err, response, body) => {
               if(err) throw err;
               if(response.statusCode === 200) {
                   res.send(parser.podcastDetails(xmlParser.parse(body, options), req.params.trackId));
                   //res.send(xmlParser.parse(body, options));
                   //res.send(body);
               }
               else res.send(response.statusCode);
           });           
       }
       else res.send(response.statusCode);
    });
});

/*
router.use((req, res) => {
    console.log('redirect');
    res.redirect('/');
});
*/

router.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/playcast-ui/build/index.html'), function(err) {
        if (err) {
          res.status(500).send(err)
        }
      })    
})

/*---------------------------------- FOOTER ---------------------------------*/
module.exports = router;