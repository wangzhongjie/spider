var cheerio = require('cheerio');
var http = require('http');
var iconv = require('iconv-lite');
var moment = require('moment');
var Promise = require('bluebird');

var dealTime=[20171012,20171013,20171015,20171016,20171017,20171018,20171019,20171020];
var model=1;

var baseUrl='http://www.kaipanla.com/Home/a/0/';

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

function isNull(obj){
    if(obj=='' || obj==null || obj==undefined) return false
}
//去左右空格;
function trim(s){
    return s.replace(/(^\s*)|(\s*$)/g, "");
}



var urls=[
    'http://ggjd.cnstock.com/gglist/search/ggkx/0', //中国证券网
    'http://ggjd.cnstock.com/gglist/search/ggkx/1',
    'http://ggjd.cnstock.com/gglist/search/qmtbbdj/0',

    'http://stock.stcn.com/zhuli/1.shtml',  //证券时报网
    'http://stock.stcn.com/bankuai/index.shtml',
    'http://company.stcn.com/gsxw/index.shtml',

    'http://stock.stockstar.com/list/strategy.htm',		//证券之星 趋势策略
    'http://stock.stockstar.com/list/opportunity.htm',	//机会挖掘
    'http://stock.stockstar.com/list/headlines.htm',	//证券要闻
    'http://stock.stockstar.com/list/10_1.shtml',		//公司新闻
    'http://stock.stockstar.com/list/10_2.shtml',
    'http://stock.stockstar.com/list/main.htm',		//主力研究
    'http://stock.stockstar.com/list/76_1.shtml',  //公司公告
    'http://stock.stockstar.com/list/76_2.shtml',
    'http://stock.stockstar.com/list/76_3.shtml',
    'http://stock.stockstar.com/list/76_4.shtml',
    'http://stock.stockstar.com/list/76_5.shtml',
    'http://stock.stockstar.com/list/76_6.shtml',
    'http://stock.stockstar.com/list/76_7.shtml',
    'http://stock.stockstar.com/list/76_8.shtml',
    'http://stock.stockstar.com/list/76_9.shtml',
    'http://stock.stockstar.com/list/76_10.shtml',

    'http://stock.stockstar.com/list/live.htm',			//股市直击

    'http://www.p5w.net/stock/news/zonghe/index.htm', //全景网 股票频道
    'http://www.p5w.net/stock/news/zonghe/index_1.htm',
    'http://www.p5w.net/news/gncj/index.htm',
    'http://www.p5w.net/news/gncj/index_1.htm',

    'http://www.csrc.gov.cn/pub/newsite/zjhxwfb/xwdd/',  //证监会要闻

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

        back.forEach(function (item) {  //不能在pages.forEash里输出，否则会多次加载，原因未知
            console.log('\n 当前页面==='+ item.url +'==='+ trim(item.pageTitle));
            item.arr.forEach(function (json) {
                console.log(json.time+': '+json.title);
                // console.log(json.time+': '+json.title+' ： '+json.href);
            });
        });
    });

function setJson(html, url){
    var tmp=[],
        pointTime='',
        prevPoint=null;

    var now=moment(new Date()).format('YYYYMMDD');
    var todayIndex=dealTime.indexOf(Number(now));

    if(model){ //盘前
        pointTime=dealTime[todayIndex-1]+' 13:00:00';   //20171013 13:00:00
        prevPoint=moment(pointTime, 'YYYYMMDD HH:mm:ss').format('X');
    }else{ //盘中
        pointTime=now+' 09:30:00';   //20171014 09:30:00
        prevPoint=moment(pointTime, 'YYYYMMDD HH:mm:ss').format('X');
    }

    switch (url){
        case 'http://ggjd.cnstock.com/gglist/search/ggkx/0':
        case 'http://ggjd.cnstock.com/gglist/search/ggkx/1':
        case 'http://ggjd.cnstock.com/gglist/search/qmtbbdj/0':
            tmp=htmlNodeTag1(html, prevPoint);
            break;
        case 'http://stock.stcn.com/zhuli/1.shtml':
        case 'http://stock.stcn.com/bankuai/index.shtml':
        case 'http://company.stcn.com/gsxw/index.shtml':
            tmp=htmlNodeTag2(html, prevPoint);
            break;
        case 'http://stock.stockstar.com/list/strategy.htm':
        case 'http://stock.stockstar.com/list/opportunity.htm':
        case 'http://stock.stockstar.com/list/headlines.htm':
        case 'http://stock.stockstar.com/list/10_1.shtml':
        case 'http://stock.stockstar.com/list/10_2.shtml':
        case 'http://stock.stockstar.com/list/main.htm':
        case 'http://stock.stockstar.com/list/76_1.shtml':
        case 'http://stock.stockstar.com/list/76_2.shtml':
        case 'http://stock.stockstar.com/list/76_3.shtml':
        case 'http://stock.stockstar.com/list/76_4.shtml':
        case 'http://stock.stockstar.com/list/76_5.shtml':
        case 'http://stock.stockstar.com/list/76_6.shtml':
        case 'http://stock.stockstar.com/list/76_7.shtml':
        case 'http://stock.stockstar.com/list/76_8.shtml':
        case 'http://stock.stockstar.com/list/76_9.shtml':
        case 'http://stock.stockstar.com/list/76_10.shtml':
            tmp=htmlNodeTag3(html, prevPoint);
            break;
        case 'http://stock.stockstar.com/list/live.htm':
            tmp=htmlNodeTag4(html, prevPoint);
            break;
        case 'http://www.p5w.net/stock/news/zonghe/index.htm':
        case 'http://www.p5w.net/stock/news/zonghe/index_1.htm':
        case 'http://www.p5w.net/news/gncj/index.htm':
        case 'http://www.p5w.net/news/gncj/index_1.htm':
            tmp=htmlNodeTag5(html, prevPoint);
            break;

        case 'http://www.csrc.gov.cn/pub/newsite/zjhxwfb/xwdd/':
            tmp=htmlNodeTag6(html, prevPoint);
            break;

        case 'http://www.gov.cn/pushinfo/v150203/':
            tmp=htmlNodeTag7(html, prevPoint);
            break;
    }
    return {arr:tmp.arr, url:url, pageTitle:tmp.pageTitle};
}

function htmlNodeTag1(html, prevPoint) {
    var $=html;
    var title='', time='', href='', tmpArr=[], publishTime;
    var pageTitle = $('head title').text();
    var news = $('.main-list .new-list li');

    for (var i = 0; i < news.length; i++) {
        title= news.eq(i).find('a').attr('title');
        href= news.eq(i).find('a').attr('href');
        time= news.eq(i).find('span').text();

        publishTime=moment(time, 'MM-DD HH:mm').format('X');
        if(isNull(title) || isNull(href) || publishTime<prevPoint) continue;
        // var str='<i>'+time+'</i> '+'<a target="_blank" href="'+href+'">'+title+'</a>';
        tmpArr.push({title:title, time:time, href:href});
    }
    return {arr:tmpArr, pageTitle:pageTitle};
}


function htmlNodeTag2(html, prevPoint) {
    var $=html;
    var title='', time='', href='', tmpArr=[], publishTime;
    var pageTitle = $('head title').text();
    var news = $('.mainlist li');

    for (var i = 0; i < news.length; i++) {
        title= news.eq(i).find('a').attr('title');
        href= news.eq(i).find('a').attr('href');
        time= news.eq(i).find('span').text().replace(/\[|\]/, '');

        publishTime=moment(time, 'YYYY-MM-DD HH:mm').format('X');
        if(isNull(title) || isNull(href) || publishTime<prevPoint) continue;
        tmpArr.push({title:title, time:time, href:href});
    }
    return {arr:tmpArr, pageTitle:pageTitle};
}


function htmlNodeTag3(html, prevPoint) {
    var $=html;
    var title='', time='', href='', tmpArr=[], publishTime;
    var pageTitle = $('head title').text();
    var news = $('.listnews li');

    for (var i = 0; i < news.length; i++) {
        title= news.eq(i).find('a').text();
        href= news.eq(i).find('a').attr('href');
        time= news.eq(i).find('span').text();

        publishTime=moment(time, 'YYYY-MM-DD HH:mm:ss').format('X');
        if(isNull(title) || isNull(href) || publishTime<prevPoint) continue;
        tmpArr.push({title:title, time:time, href:href});
    }
    return {arr:tmpArr, pageTitle:pageTitle};
}

function htmlNodeTag4(html, prevPoint) {
    var $=html;
    var title='', time='', href='', tmpArr=[], publishTime;
    var pageTitle = $('head title').text();
    var news = $('.listnews li');

    for (var i = 0; i < news.length; i++) {
        title= news.eq(i).find('a').text();
        href= news.eq(i).find('a').eq(1).attr('href');
        time= news.eq(i).find('span').text();

        publishTime=moment(time, 'YYYY-MM-DD HH:mm:ss').format('X');
        if(isNull(title) || isNull(href) || publishTime<prevPoint) continue;
        tmpArr.push({title:title, time:time, href:href});
    }
    return {arr:tmpArr, pageTitle:pageTitle};
}

function htmlNodeTag5(html, prevPoint) {
    var $=html;
    var title='', time='', href='', tmpArr=[], publishTime;
    var pageTitle = $('head title').text();
    var news = $('.manlist3 li');

    for (var i = 0; i < news.length; i++) {
        title= news.eq(i).find('a').text();
        href= news.eq(i).find('a').attr('href');
        time= news.eq(i).find('div').text();

        publishTime=moment(time, 'MM月DD日 HH:mm').format('X');
        if(isNull(title) || isNull(href) || publishTime<prevPoint) continue;
        tmpArr.push({title:title, time:time, href:href});
    }
    return {arr:tmpArr, pageTitle:pageTitle};
}

function htmlNodeTag6(html, prevPoint) {
    var $=html;
    var title='', time='', href='', tmpArr=[], publishTime;
    var pageTitle = $('head title').text();
    var news = $('#myul li');

    for (var i = 0; i < news.length; i++) {
        title= news.eq(i).find('a').attr('title');
        href= news.eq(i).find('a').attr('href');
        time= news.eq(i).find('span').text();

        publishTime=moment(time+'13:30:00', 'YYYY-MM-DD HH:mm:ss').format('X');
        if(isNull(title) || isNull(href) || publishTime<prevPoint) continue;
        tmpArr.push({title:title, time:time, href:href});
    }
    return {arr:tmpArr, pageTitle:pageTitle};
}


function htmlNodeTag7(html, prevPoint) {
    var $=html;
    var title='', time='', href='', tmpArr=[], publishTime;
    var pageTitle = $('head title').text().split('_')[0];
    var news = $('.news_box li');

    for (var i = 0; i < news.length; i++) {
        title= news.eq(i).find('h4 a').text();
        href= news.eq(i).find('h4 a').attr('href');
        time= trim(news.eq(i).find('h4 span').text());

        publishTime=moment(time+'13:30:00', 'YYYY-MM-DD HH:mm:ss').format('X');
        if(isNull(title) || isNull(href) || publishTime<prevPoint) continue;
        tmpArr.push({title:title, time:time, href:href});
    }
    return {arr:tmpArr, pageTitle:pageTitle};
}