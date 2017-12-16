var superagent =  require('superagent-charset')(require('superagent'));
var cheerio = require('cheerio');
var fs= require('fs');
var path = require('path');
var main_url  = 'http://www.mzitu.com/';
var meiziURL  = 'http://www.mzitu.com/71235';

function catch_list(url,callback) {
    superagent
        .get(url)
        // .set('Connection','close')
        // .set('User-Agent','Paw/2.1 (Macintosh; OS X/10.11.6) GCDHTTPRequest')
        // .set('Host', 'www.mzitu.com')
        // 实测可以不加
        .end(function (err,sres) {
            if(err){
                console.error(err)
            }
            var items = []
            var $ = cheerio.load(sres.text)
            $('#pins').find('li').each(function (idx,element) {
                $element = $(element)
                var url = $element.find('span:nth-child(2) > a').attr('href')
                var title = $element.find('img').attr('alt')
                console.log(title,url)
                items.push({
                    title:title,
                    url:url
                })
            })
            callback(items)
    })
}

function write_to_file_in_JSON(items,dir,filename) {
    console.log('完成'+items.length +'个抓取');
    var fs= require('fs');
    var dirname = dir +filename+'.json';
    var path = require('path');
    fs.writeFile(dirname, JSON.stringify(items));
}

for (var i = 1;i<=10;i++){
    var success = 1
    var data = []
    catch_list(main_url+'page/'+String(i),function (items) {
        console.log(items.length)
        data = data.concat(items)
        success++
        if (success == 2) write_to_file_in_JSON(data,'./data','mm')
    })
}