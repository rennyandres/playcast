/* 
This is a test that finds the attributes shared by the xml file each 
podcast rss feed.
*/


const request      = require('request');
const parser       = require('fast-xml-parser');
const he           = require('he');
const fs           = require('fs');

let   Limit        = 1;
let   itunesSearch = `https://itunes.apple.com/search?media=podcast&term=a&limit=${Limit}`;

let options = {
  attributeNamePrefix : "@_",
  attrNodeName: "attr", //default is 'false'
  textNodeName : "#text",
  ignoreAttributes : false,
  ignoreNameSpace : false,
  allowBooleanAttributes : false,
  parseNodeValue : true,
  parseAttributeValue : false,
  trimValues: true,
  cdataTagName: "__cdata", //default is 'false'
  cdataPositionChar: "\\c",
  localeRange: "",
  parseTrueNumberOnly: false,
  attrValueProcessor: a => he.decode(a, {isAttributeValue: true}),
  tagValueProcessor : a => he.decode(a) //default is a=>a
};

/*------------------------------ DATA GATHERING -----------------------------*/
let inputArr = [];

function getUrlFeeds (storageArr) {
  return new Promise(function (resolve, reject) {
    
    request(itunesSearch, (err, response, body) => {
      if(err) throw err;
      else if(response.statusCode === 200) {
        
        JSON.parse(body).results
          .forEach(feed => storageArr.push(feed.feedUrl));
  
        resolve(storageArr);
      }
    })

  });
}

function getRssFeeds (storageArr) {
  return new Promise(function (resolve, reject) {
    let arrayOfRssFeeds = [];
    let complete = storageArr.length;
    
    storageArr.forEach((xmlSrc, index, fullStorageArr) => {
      request(xmlSrc, (err, response, body) => {
        if(err) throw err;
        else if(response.statusCode === 200) {
          arrayOfRssFeeds.push(parser.parse(body, options));
          
          if(arrayOfRssFeeds.length === complete) resolve(arrayOfRssFeeds);
        }
      })
    });
  })
}

/*
sudo code

grab the first item on the array as a model and save it to a variable
for each item, test to see if that property exist, if not deleted from the model
var arrayOfArrays = [
  ['perro', 'limit', 'gato', 'lombarto'], 
  ['jhonny', 'perro', 'gato', 'james'],
  ['perro', 'limit', 'gato', 'destruction'],
  ['astro', 'junior', 'gato', 'lombarto'],
  ['perro', 'limit', 'gato', 'key'],
  ['perro', 'limit', 'gato', 'lombarto']
];

function itemsInCommon (arr1, arr2) {
  return arr1.filter(item => {
  	return arr2.indexOf(item) >= 0;
  });
}

function reduceToJsutCommonKeys(array) {
  
  let lastIndex = array.length - 1;
  let counter = 0;
  
	do {
    if(counter + 1 > lastIndex) { 
      array = array.slice(lastIndex, array.length);
      counter = 0;
      lastIndex array.length - 1;
    };
    else {
      array.push(itemsInCommon (array[counter], array[counter + 1]));
    	counter++;
    }
  } while (counter < lastIndex);

  return array;
}

console.log(reduceToJsutCommonKeys(arrayOfArrays));
*/
function itemsInCommon (arr1, arr2) {
  return arr1.filter(item => {
  	return arr2.indexOf(item) >= 0;
  });
}




/*---------------------------------- OUTPUT ---------------------------------*/

getUrlFeeds(inputArr).then(urlFeedsArr => {
  getRssFeeds(urlFeedsArr).then(rssFeedsArr => {
    fs.writeFile(
      'tests/common-properties_test.json', 
      JSON.stringify(rssFeedsArr, null, 2),
      err => {
        if(err) throw err;
        else console.log('ready');
      }
      );
  });
});