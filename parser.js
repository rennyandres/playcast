// parser.js
/*---------------------------------- IMPORTS ---------------------------------*/

/*---------------------------------- EXPORTS ---------------------------------*/
module.exports = {
  podcastDetails: function(xmlObj, podId) {
    let episodes = [];
    let coverImageHolder = 
      xmlObj['rss']['channel']['itunes:image']['attr']['@_href']
    ;
    
    xmlObj['rss']['channel']['item'].forEach((item, index) => {
      // If no file, dont include the episode   
      if(typeof item['enclosure'] === 'object' && item['enclosure'].hasOwnProperty('attr')){   
        episodes.push({
          podcastTitle: xmlObj['rss']['channel']['title'], 
          coverImage: coverImageHolder,
          title: item['title'],
          description: (item.hasOwnProperty('itunes:subtitle')
            && item['itunes:subtitle'].length > 0)
            ? item['itunes:subtitle']
            : item['itunes:summary']
          ,
          file:
            (typeof item['enclosure'] === 'object' 
              && item['enclosure'].hasOwnProperty('attr')) 
            ? item['enclosure']['attr']['@_url']
            : null
          ,
          duration: (item['itunes:duration']) ? secondsToMinutes(item['itunes:duration']) : null,
          released: new Date(item['pubDate']).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' }
          )
        });
      } else {
        return;
      }
    });

    coverImageHolder = xmlObj['rss']['channel']['itunes:image']['attr']['@_href'];

    return {
      coverImage: coverImageHolder,
      title: xmlObj['rss']['channel']['title'],
      link: xmlObj['rss']['channel']['link'],
      description: xmlObj['rss']['channel']['itunes:summary'],
      author: xmlObj['rss']['channel']['itunes:author'],
      podcastID: podId,
      episodeCount: episodes.length,      
      episodes: episodes,
    }
  },
  searchResults: function(results) {
    results.results.forEach((result, index, fullArray) => {
      fullArray[index] = {
        id: result['trackId'],
        coverImage: result['artworkUrl100'],
        title: result['trackName'],
        author: result['artistName'],
        latestRelease: {
          date: new Date(result['releaseDate']).toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' }
          ),
          time: new Date(result['releaseDate']).toLocaleTimeString('en-US')
        },
        episodeCount: result['trackCount'],
        rssFeed: result['feedUrl']
      }
    });

    return results;
  },
  dividePagination: function(arr, itemsPerPage) {
    let result = [];
    if(arr.length > itemsPerPage) {
      let i;
      for(i = 0; i+itemsPerPage < arr.length; i+=itemsPerPage) {
        result.push(arr.slice(i, i+itemsPerPage));
      }
      result.push(arr.slice(i));
      return result;
    } else {
      return arr;
    }
  }  
}

/*-------------------------------- LOCAL USAGE -------------------------------*/
function secondsToMinutes(fullSeconds) {
  
  var timeFormatRegex = RegExp('([0-9][0-9]:)+[0-9][0-9]');

  if(fullSeconds.match(timeFormatRegex) ) {
    return fullSeconds;
  }
  else {
    let hours = Math.floor(fullSeconds / 3600);
    let minutes = Math.floor(fullSeconds / 60 - (hours * 60));
    let seconds = Math.floor(fullSeconds - (hours * 3600) - (minutes * 60));
    
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    if(hours === 0) {
      return minutes + ':' + seconds;
    }
    else {
      return hours + ':' + minutes + ':' + seconds;
    }
  }
}

