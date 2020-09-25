var cheerio = require('cheerio');
var http = require('http');
var iconv = require('iconv-lite');
var moment = require('moment');
var Promise = require('bluebird');
var meta = require('./meta');

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
    if(obj=='' || obj==null || obj==undefined) return true;
}

var urls=[
    'http://paynews.net/portal.php?mod=list&catid=96',  //中国支付网
    'http://paynews.net/news/zhifu/',
    'http://paynews.net/news/yanlun/',
    'http://paynews.net/news/tuijian/',

    'http://www.zhifuquanzi.com/zixun/', //支付圈
    'http://www.zhifuquanzi.com/dsfzf/',

    'http://corporate.unionpay.com/infoBiz/chanyezx/zonghezx/list_zonghezx.html', //银联
    'http://corporate.unionpay.com/infoBiz/chanyezx/yejiedt/list_yejiedt.html',
    'http://corporate.unionpay.com/infoBiz/chanyezx/guojisx/list_guojisx.html',
    'http://corporate.unionpay.com/infoBiz/yewugonggao/list_yewugonggao.html',
    'http://corporate.unionpay.com/infoBiz/yewugonggao/list_yewugonggao.html',
    'http://corporate.unionpay.com/infonewsCenter/MediaNews/list_MediaNews.html',

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
            // console.log(item.url);
            item.forEach(function (json) {
                console.log(JSON.stringify(json)+',');
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
        case urls[0]:
        case urls[1]:
        case urls[2]:
        case urls[3]:
        case urls[4]:
            tmp=htmlNodeTag1(html, prevPoint, downtime);
            break;
        case urls[5]:
        case urls[6]:
            tmp=htmlNodeTag2(html, prevPoint, downtime);
            break;
        case urls[7]:
        case urls[8]:
        case urls[9]:
        case urls[10]:
        case urls[11]:
        case urls[12]:
            tmp=htmlNodeTag3(html, prevPoint, downtime);
            break;
    }
    return tmp
}

function htmlNodeTag1(html, prevPoint, downtime) {
    var $=html;
    var title='', time='', href='', tmpArr=[], publishTime;
    var news = $('.xld dl');

    for (var i = 0; i < news.length; i++) {
        title= news.eq(i).find('dt a').text();
        href= 'http://paynews.net/'+news.eq(i).find('dt a').attr('href');
        time= news.eq(i).find('dd .xg1').text();

        publishTime=moment(time, 'YYYY-MM-DD HH:mm').format('X');
        if(isNull(title) || isNull(href) || isNull(time) || publishTime<prevPoint) continue;
        tmpArr.push({title:title, href:href, time:publishTime, downtime:downtime});
    }
    return tmpArr
}

function htmlNodeTag2(html, prevPoint, downtime) {
    var $=html;
    var title='', time='', href='', tmpArr=[], publishTime;
    var news = $('.bm_c.xld .top_new.cl');

    for (var i = 0; i < news.length; i++) {
        title= news.eq(i).find('.rig h2 a').text();
        href= 'http://www.zhifuquanzi.com/'+news.eq(i).find('.rig h2 a').attr('href');
        time= news.eq(i).find('.rig .time').text();

        publishTime=moment(time, 'YYYY-MM-DD HH:mm').format('X');
        if(isNull(title) || isNull(href) || isNull(time) || publishTime<prevPoint) continue;
        tmpArr.push({title:title, href:href, time:publishTime, downtime:downtime});
    }
    return tmpArr
}

function htmlNodeTag3(html, prevPoint, downtime) {
    var $=html;
    var title='', time='', href='', tmpArr=[], publishTime;
    var news = $('.TextList li');

    for (var i = 0; i < news.length; i++) {
        title= trim(news.eq(i).find('a').text());
        href= news.eq(i).find('a').attr('href');
        time= news.eq(i).find('td').text();

        publishTime=moment(time, 'YYYY-MM-DD').format('X');
        if(isNull(title) || isNull(href) || isNull(time) || publishTime<prevPoint) continue;
        tmpArr.push({title:title, href:href, time:publishTime, downtime:downtime});
    }
    return tmpArr
}
