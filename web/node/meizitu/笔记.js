'依赖的包'
'cnpm install cheerio request superagent-charset superagent --save'
`ww.js是用superagent 抓取的是内容
 www.js是用request 抓取的是文件`

'这里会一部分一部分抓取网页html，直到抓取完毕'
res.on('data', function (chunk) {
    html += chunk;
});

'开始处理抓取过来的数据'
res.on('end',function(){
    '可以视为把html内容用cheerio加载,之后就可以通过$去操作html，如同jquery'
    var $ = cheerio.load(html);

    '写入到文件中'
    $(".entry p").each(function(index,item) {
        var x = $(this).text();

        x = x + "\n";

        fs.appendFile("./data/" + title + ".txt", x, "utf-8", function (err) {
            if (err) {
                console.log(err);
            }
        });
    });


    '可以通过递归函数反复执行抓取操作'
    if(i <= 500){
        fetchPage(str);
    }

    
})