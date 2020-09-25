var cheerio = require('cheerio');
var http = require('http');
var iconv = require('iconv-lite');
var moment = require('moment');

var htmlData = [];
var htmlDataLength = 0;


var dealTime=[20171012,20171013,20171014,20171016,20171017,20171018,20171019,20171020];

// var url='http://www.p5w.net/stock/news/zonghe/';
// var url='http://stock.stockstar.com/list/76.shtml';
// var url='http://stock.stockstar.com/list/main.htm';
// var url='http://stock.stockstar.com/list/10.shtml';
// var url='http://stock.stockstar.com/list/headlines.htm';
// var url='http://stock.stockstar.com/list/live.htm';
// var url='http://stock.stockstar.com/list/strategy.htm';
var url='http://stock.stockstar.com/list/opportunity.htm';

function onRequest(req, res) {

	res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
	http.globalAgent = 'Mozilla/5.0 (Windows NT 6.1; rv:2.0.1) Gecko/20100101 Firefox/4.0.1';

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

			console.log(charset);

			callback(cheerio.load(decodeHtmlData, {decodeEntities: false}));
		});

	});



	function callback(data) {
		var $=data,
			title='',
			time='',
			href='';
		var str='', publishTime, now=moment(new Date()).format('YYYYMMDD');
		var todayIndex=dealTime.indexOf(Number(now));

		var pointTime=dealTime[todayIndex-1]+' 09:30:00';   //20171013 09:30:00
		var prevPoint=moment(pointTime, 'YYYYMMDD HH:mm:ss').format('X');

		var news = $('.listnews li').not('.space');

		for (var i = 0; i < news.length; i++) {
			time= news.find('span').eq(i).text();
			publishTime=moment(time).format('X');
			if(publishTime<prevPoint) continue;

			title= news.find('a').eq(i).text();
			href= news.find('a').eq(i).attr('href');

			str='<i>'+time+'</i> '+'<a target="_blank" href="'+href+'">'+title+'</a>';
			res.write(str);
			res.write('<br/>');
		}

	}
}

http.createServer(onRequest).listen(3001);
