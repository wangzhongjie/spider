var cheerio = require('cheerio');
var http = require('http');
var iconv = require('iconv-lite');
var moment = require('moment');
var Promise = require('bluebird');
var meta = require('./meta');

var meta_blockall=meta.meta_industry_concept_limite;
var meta_stock=meta.meta_stock;
var workday=meta.workday;

var model=1;  //1 am  0 pm

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

function setAttr(title, arr) { //字符串轮询数组
    var tmp=[];
    arr.forEach(function (e, i) {
        if(title.indexOf(e)!=-1) tmp.push(e);
    });
    return tmp.join(',');
}


var urls=[
    'http://ggjd.cnstock.com/gglist/search/ggkx/0', //中国证券网 公告快讯
    'http://ggjd.cnstock.com/gglist/search/ggkx/1',
    'http://ggjd.cnstock.com/gglist/search/ggkx/2',
    'http://ggjd.cnstock.com/gglist/search/qmtbbdj/0',  //本网独家
    'http://ggjd.cnstock.com/gglist/search/qmtbbdj/1',

    'http://stock.stcn.com/zhuli/1.shtml',  //证券时报网 主力
    'http://stock.stcn.com/zhuli/2.shtml',
    'http://stock.stcn.com/bankuai/index.shtml', //板块
    'http://stock.stcn.com/bankuai/2.shtml',
    'http://company.stcn.com/gsxw/index.shtml', //公司新闻
    'http://company.stcn.com/gsxw/2.shtml',

    'http://www.p5w.net/stock/news/zonghe/index.htm', //全景网 股票频道
    'http://www.p5w.net/stock/news/zonghe/index_1.htm',
    'http://www.p5w.net/stock/news/zonghe/index_2.htm',
    'http://www.p5w.net/news/gncj/index.htm', //财经频道
    'http://www.p5w.net/news/gncj/index_1.htm',
    'http://www.p5w.net/news/gncj/index_2.htm',

    'http://stock.stockstar.com/list/opportunity.htm',	//证券之星 机会挖掘
    'http://stock.stockstar.com/list/headlines.htm',	//证券要闻
    'http://stock.stockstar.com/list/2_2.htm',
    'http://stock.stockstar.com/list/10_1.shtml',		//公司新闻
    'http://stock.stockstar.com/list/10_2.shtml',
    'http://stock.stockstar.com/list/10_3.shtml',
    'http://stock.stockstar.com/list/main.htm',		//主力研究
    
    // 'http://stock.stockstar.com/list/76_1.shtml',  //公司公告
    // 'http://stock.stockstar.com/list/76_2.shtml',
    // 'http://stock.stockstar.com/list/76_3.shtml',
    // 'http://stock.stockstar.com/list/76_4.shtml',
    // 'http://stock.stockstar.com/list/76_5.shtml',
    // 'http://stock.stockstar.com/list/76_6.shtml',
    // 'http://stock.stockstar.com/list/76_7.shtml',
    // 'http://stock.stockstar.com/list/76_8.shtml',
    // 'http://stock.stockstar.com/list/76_9.shtml',
    // 'http://stock.stockstar.com/list/76_10.shtml',

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
    var tmp=[],
        pointTime='',
        prevPoint=null;

    var now=moment(new Date()).format('YYYY-MM-DD');
    var todayIndex=workday.indexOf(now);
    var downtime=moment().format('X');

    if(model){ //盘前
        pointTime=workday[todayIndex-1]+' 9:00:00';
        prevPoint=moment(pointTime, 'YYYY-MM-DD HH:mm:ss').format('X');
    }else{ //盘中
        pointTime=now+' 09:00:00';   //20171014 09:30:00
        prevPoint=moment(pointTime, 'YYYY-MM-DD HH:mm:ss').format('X');
    }

    switch (url){
        case 'http://ggjd.cnstock.com/gglist/search/ggkx/0':
        case 'http://ggjd.cnstock.com/gglist/search/ggkx/1':
        case 'http://ggjd.cnstock.com/gglist/search/qmtbbdj/0':
            tmp=htmlNodeTag1(html, prevPoint, downtime);
            break;
        case 'http://stock.stcn.com/zhuli/1.shtml':
        case 'http://stock.stcn.com/bankuai/index.shtml':
        case 'http://company.stcn.com/gsxw/index.shtml':
            tmp=htmlNodeTag2(html, prevPoint, downtime);
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
            tmp=htmlNodeTag3(html, prevPoint, downtime);
            break;
        case 'http://stock.stockstar.com/list/live.htm':
            tmp=htmlNodeTag4(html, prevPoint, downtime);
            break;
        case 'http://www.p5w.net/stock/news/zonghe/index.htm':
        case 'http://www.p5w.net/stock/news/zonghe/index_1.htm':
        case 'http://www.p5w.net/news/gncj/index.htm':
        case 'http://www.p5w.net/news/gncj/index_1.htm':
            tmp=htmlNodeTag5(html, prevPoint, downtime);
            break;
    }
    return tmp;
}


function htmlNodeTag1(html, prevPoint, downtime) {
    var $=html;
    var title='', time='', href='', tmpArr=[], publishTime;
    var news = $('.main-list .new-list li');

    for (var i = 0; i < news.length; i++) {
        title= news.eq(i).find('a').attr('title');
        href= news.eq(i).find('a').attr('href');
        time= news.eq(i).find('span').text();
        time= '2017-'+time+':00';

        publishTime=moment(time, 'YYYY-MM-DD HH:mm:ss').format('X');
        if(isNull(title) || isNull(href) || isNull(time) || publishTime<prevPoint) continue;

        tmpArr.push({title:title, time:publishTime, downtime:downtime, ref_stock:setAttr(title, meta_stock), ref_blockall:setAttr(title, meta_blockall), href:href});
    }
    return tmpArr;
}


function htmlNodeTag2(html, prevPoint, downtime) {
    var $=html;
    var title='', time='', href='', tmpArr=[], publishTime;
    var news = $('.mainlist li');

    for (var i = 0; i < news.length; i++) {
        title= news.eq(i).find('a').attr('title');
        href= news.eq(i).find('a').attr('href');
        time= news.eq(i).find('span').text().replace(/\[/, '').replace(/\]/, '');
        time= time+':00';

        publishTime=moment(time, 'YYYY-MM-DD HH:mm:ss').format('X');
        if(isNull(title) || isNull(href) || isNull(time) || publishTime<prevPoint) continue;

        tmpArr.push({title:title, time:publishTime, downtime:downtime, ref_stock:setAttr(title, meta_stock), ref_blockall:setAttr(title, meta_blockall), href:href});
    }
    return tmpArr;
}


function htmlNodeTag3(html, prevPoint, downtime) {
    var $=html;
    var title='', time='', href='', tmpArr=[], publishTime;
    var news = $('.listnews li');

    for (var i = 0; i < news.length; i++) {
        title= news.eq(i).find('a').text();
        href= news.eq(i).find('a').attr('href');
        time= news.eq(i).find('span').text();

        publishTime=moment(time, 'YYYY-MM-DD HH:mm:ss').format('X');
        if(isNull(title) || isNull(href) || isNull(time) || publishTime<prevPoint) continue;

        tmpArr.push({title:title, time:publishTime, downtime:downtime, ref_stock:setAttr(title, meta_stock), ref_blockall:setAttr(title, meta_blockall), href:href});
    }
    return tmpArr;
}

function htmlNodeTag4(html, prevPoint, downtime) {
    var $=html;
    var title='', time='', href='', tmpArr=[], publishTime;
    var news = $('.listnews li');

    for (var i = 0; i < news.length; i++) {
        title= news.eq(i).find('a').text();
        href= news.eq(i).find('a').eq(1).attr('href');
        time= news.eq(i).find('span').text();

        publishTime=moment(time, 'YYYY-MM-DD HH:mm:ss').format('X');
        if(isNull(title) || isNull(href) || isNull(time) || publishTime<prevPoint) continue;

        tmpArr.push({title:title, time:publishTime, downtime:downtime, ref_stock:setAttr(title, meta_stock), ref_blockall:setAttr(title, meta_blockall), href:href});
    }
    return tmpArr;
}

function htmlNodeTag5(html, prevPoint, downtime) {
    var $=html;
    var title='', time='', href='', tmpArr=[], publishTime;
    var news = $('.manlist3 li');

    for (var i = 0; i < news.length; i++) {
        title= news.eq(i).find('a').text();
        href= news.eq(i).find('a').attr('href');
        time= news.eq(i).find('div').text();
        time= '2017年'+time+':00';

        publishTime=moment(time, 'YYYY年MM月DD日 HH:mm:ss').format('X');
        if(isNull(title) || isNull(href) || isNull(time) || publishTime<prevPoint) continue;

        tmpArr.push({title:title, time:publishTime, downtime:downtime, ref_stock:setAttr(title, meta_stock), ref_blockall:setAttr(title, meta_blockall), href:href});
    }
    return tmpArr;
}