const fs = require('fs');
const path = require('path');
const currentTime = new Date();
const logsFileName = `${currentTime.getDate()}-${currentTime.getMonth()}-${currentTime.getFullYear()}.json`;
const logsDirName = `coinnewshistory`;
const projectDirPath = process.cwd();
const logsDirPath = (projectDirPath + '/' + logsDirName + '/').split('\\').join('/');
const currentLogPath = logsDirPath + logsFileName;

fs.lstat(logsDirPath, (err, stats) => {
    if (err) {
        fs.mkdir(logsDirPath);
        fs.writeFile(currentLogPath, '', (err) => {
            if (err) {
                console.warn(err.message);
            }
        });
    } else {
        if (stats.isDirectory()) {
            fs.lstat(currentLogPath, (err, stats) => {
                if (err) {
                    fs.writeFile(currentLogPath, '', (err) => {
                        if (err) {
                            console.warn(err.message);
                        }
                    });
                } else {
                    if (stats.isFile()) {
                        fs.readFile(currentLogPath, 'utf8', (err,data) => {
                            if (err) {
                                return console.log(err);
                            }
                            startWatching(JSON.parse(data));
                        });
                    }
                }
            });
        } else {
            fs.mkdir(logsDirPath);
            fs.writeFile(currentLogPath, '', function (err) {
                if (err) {
                    console.warn(err.message);
                }
            });
        }
    }
});

const startWatching = (history = {}) => {
    let html = '';
    history.forEach(article => {
        html += '<div><div>';
        html += article.title;
        html += '</div><div>';
            article.coinPrices.forEach(coin => {
                html += '<span>';
                html += coin.name + '-' + coin.price_usd;
                html += '</span>';

            });
        html += '</div></div>';
    });
    document.getElementById('data').innerHTML = html;
};

const currentData = {"language": "en","theme": "dark", "region": "ua"};

var newsurl = 'https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=cf2c9a25b09a49d9ad67f99f6057bcd6';

var coinsurl = 'https://api.coinmarketcap.com/v1/ticker/';

var newsReq = new Request(newsurl);

var coinsReq = new Request(coinsurl);

fetch(newsReq).then(function(response) {
    return response.json()
}).then(function(news) {
    fetch(coinsReq).then(function(response) {
        return response.json()
    }).then(function(coins) {
        console.log(coins, news.articles);
    });
});