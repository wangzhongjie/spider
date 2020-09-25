var cheerio = require('cheerio');
var http = require('http');
var iconv = require('iconv-lite');
var moment = require('moment');
var Promise = require('bluebird');
var meta = require('./meta');

var meta_blockall=meta.meta_industry_concept_limite;
var meta_stock=meta.meta_stock;
var workday=meta.workday;

var fetchPageUrl = [];
var htmlDataLength = 0;

function getPageAsync(url){  //使用Promise对象来包装获取到页面的html的方法
	return new Promise(function (resolve, reject) {
		http.get(url, function (res) {
            var htmlData=[]; //清空上个页面数据
			res.on('data', function (data) {

				htmlData.push(data);
				htmlDataLength += data.length;
			});

			res.on('end', function () {

				var bufferHtmlData = Buffer.concat(htmlData, htmlDataLength);
				var charset = '';
				var decodeHtmlData;
				var htmlHeadCharset = '';
				var htmlHeadContent = '';
				var index = 0;

				var $ = cheerio.load(bufferHtmlData, {decodeEntities: false});

				$('meta', 'head').each(function (i, e) {

					htmlHeadCharset = $(e).attr('charset');
					htmlHeadContent = $(e).attr('content');

					if (typeof(htmlHeadCharset) != 'undefined') {

						charset = htmlHeadCharset;
					}

					if (typeof(htmlHeadContent) != 'undefined') {

						if (htmlHeadContent.match(/charset=/ig)) {

							index = htmlHeadContent.indexOf('=');
							charset = htmlHeadContent.substring(index + 1);
						}
					}
				});

				//此处为什么需要对整个网页进行转吗，是因为cheerio这个组件不能够返回buffer,iconv则无法转换之
				if (charset.match(/gb/ig)) {
					decodeHtmlData = iconv.decode(bufferHtmlData, 'gbk');
				}
				else {//因为有可能返回的网页中不存在charset字段，因此默认都是按照utf8进行处理
					decodeHtmlData = iconv.decode(bufferHtmlData, 'utf8');
				}

				// console.log(charset);
                // console.log('正在爬取 ' + url + '\n');

				var html=cheerio.load(decodeHtmlData, {decodeEntities: false});
                // var html=cheerio.load(htmlData);
				resolve({html:html, url:url});   //把当前的获取到页面的html返回回去（传递下去）

			});

		}).on('error', function (e) {
			reject(e);
			console.log('爬取页面失败');
		});
	})
}


//去左右空格;
function trim(s){
    return s.replace(/(^\s*)|(\s*$)/g, "");
}
function isNull(obj){
    if(obj=='' || obj==null || obj==undefined) return true
}

var urls=[
    'http://www.gov.cn/pushinfo/v150203/', //国务院信息
];

urls.forEach(function (url) {
	fetchPageUrl.push(getPageAsync(url));
});

Promise
    .all(fetchPageUrl)//针对每个url地址返回的页面HTML源码并发操作进行爬取
    .then(function (pages) {
        var back=[];
        pages.forEach(function (future) {
            var item=setJson(future.html, future.url);
            back.push(item);
        });

        back.forEach(function (arr) {  //不能在pages.forEash里输出，否则会多次加载，原因未知
            // console.log(item.url);
            arr.forEach(function (json) {
                console.log(JSON.stringify(json)+',');
                // console.log(json.time+': '+json.title+' ： '+json.href);
            });
        });
    });

function setJson(html, url){
    var tmp=[];

    var now=moment(new Date()).format('YYYY-MM-DD');
    var todayIndex=workday.indexOf(now);

    var pointTime=workday[todayIndex-1]+' 09:00:00';
    var prevPoint=moment(pointTime, 'YYYY-MM-DD HH:mm:ss').format('X');
    var downtime=moment().format('X');

    switch (url){
        case 'http://www.csrc.gov.cn/pub/newsite/zjhxwfb/xwdd/':
            tmp=htmlNodeTag1(html, prevPoint, downtime);
            break;

        case 'http://www.gov.cn/pushinfo/v150203/':
            tmp=htmlNodeTag2(html, prevPoint, downtime);
            break;

        case 'http://www.wuliangye.com.cn/zh/main/main.html#/g=NEWS&id=34':
            tmp=htmlNodeTag3(html, prevPoint, downtime);
            break;
    }
    return tmp;
}


function htmlNodeTag1(html, prevPoint, downtime) {
    var $=html;
    var title='', time='', href='', tmpArr=[], publishTime;
    var news = $('#myul li');

    for (var i = 0; i < news.length; i++) {
        title= news.eq(i).find('a').attr('title');
        href= news.eq(i).find('a').attr('href');
        time= news.eq(i).find('span').text();
        time= time+' 00:00:00';

        publishTime=moment(time, 'YYYY-MM-DD HH:mm:ss').format('X');
        if(isNull(title) || isNull(href) || isNull(time) || publishTime<prevPoint) continue;

        tmpArr.push({title:title, href:href, time:publishTime, downtime:downtime});
    }
    return tmpArr;
}


function htmlNodeTag2(html, prevPoint, downtime) {
    var $=html;
    var title='', time='', href='', tmpArr=[], publishTime;
    var news = $('.news_box li');

    for (var i = 0; i < news.length; i++) {
        title= news.eq(i).find('h4 a').text();
        href= 'http://www.gov.cn'+news.eq(i).find('h4 a').attr('href');
        time= trim(news.eq(i).find('h4 span').text());
        time= time+' 00:00:00';

        publishTime=moment(time, 'YYYY-MM-DD HH:mm:ss').format('X');
        if(isNull(title) || isNull(href) || isNull(time) || publishTime<prevPoint) continue;

        tmpArr.push({title:title, href:href, time:publishTime, downtime:downtime});
    }
    return tmpArr;
}

function htmlNodeTag3(html, prevPoint, downtime) {
    var $=html;
    var title='', time='', href='', tmpArr=[], publishTime;
    var news = $('.news-list-list-tbody tr');

    for (var i = 0; i < news.length; i++) {
        title= news.eq(i).find('a').text();
        href= 'http://www.wuliangye.com.cn/zh/main/main.html#/g=NEWS&id=34&dId='+news.eq(i).find('a').attr('key');
        time= news.eq(i).find('td')[1].text();
        time= time+' 00:00:00';

        publishTime=moment(time, 'YYYY-MM-DD HH:mm:ss').format('X');
        if(isNull(title) || isNull(href) || isNull(time) || publishTime<prevPoint) continue;

        tmpArr.push({title:title, href:href, time:publishTime, downtime:downtime});
    }
    return tmpArr;
}