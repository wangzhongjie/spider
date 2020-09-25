var cheerio = require('cheerio');
var http = require('http');
var iconv = require('iconv-lite');
var moment = require('moment');
var setting = require('./setting');

var dealTime=setting.dealTime;
var model=setting.model;

var urls=[
	'http://stock.stcn.com/zhuli/1.shtml',
	'http://stock.stcn.com/bankuai/index.shtml',
	'http://company.stcn.com/gsxw/index.shtml',
];
var fetchPageUrl = [];
var curData=[];

var htmlData = [];
var htmlDataLength = 0;

function getPageAsync(url){  //使用Promise对象来包装获取到页面的html的方法
	return new Promise(function (resolve, reject) {
		// console.log('正在爬取 ' + url + '\n');

		http.get(url, function (res) {

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

				var html=cheerio.load(decodeHtmlData, {decodeEntities: false});

				resolve(html);   //把当前的获取到页面的html返回回去（传递下去）

			});

		}).on('error', function (e) {
			reject(e);
			console.log('爬取页面失败');
		});
	})
}


function setHtml(html){
	var $=html;
	var title='',
		time='',
		href='',
		tmpArr=[];
	var str='', publishTime, now=moment(new Date()).format('YYYYMMDD');
	var todayIndex=dealTime.indexOf(Number(now));
	var pointTime='', prevPoint=null;


	if(model){ //盘前
		pointTime=dealTime[todayIndex-1]+' 13:00:00';   //20171013 13:00:00
		prevPoint=moment(pointTime, 'YYYYMMDD HH:mm:ss').format('X');
	}else{
		pointTime=now+' 09:30:00';   //20171014 09:30:00
		prevPoint=moment(pointTime, 'YYYYMMDD HH:mm:ss').format('X');
	}

	var news = $('.mainlist li');

	for (var i = 0; i < news.length; i++) {
		title= news.find('a').eq(i).attr('title');
		href= news.find('a').eq(i).attr('href');
		time= news.find('span').eq(i).text().replace(/\[|\]/, '');

		publishTime=moment(time, 'YYYY-MM-DD HH:mm').format('X');
		if(time=='' || time==null || time==undefined || title=='' || title==undefined || title==null || publishTime<prevPoint) continue;

		str='<i>'+time+'</i> '+'<a target="_blank" href="'+href+'">'+title+'</a>';
		tmpArr.push(str);
	}
	return tmpArr;
}

urls.forEach(function (item) {
	fetchPageUrl.push(getPageAsync(item));
});

Promise
	.all(fetchPageUrl)//针对每个url地址返回的页面HTML源码并发操作进行爬取
	.then(function (pages) {
		pages.forEach(function (html) {
			curData=setHtml(html);
		});

		curData.forEach(function (item) {  //不能在pages.forEash里输出，否则会多次加载，原因未知
			console.log(item);
		})
	});

