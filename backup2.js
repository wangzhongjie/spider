var http = require("http"),
	url = require("url"),
	superagent = require("superagent"),
	cheerio = require("cheerio"),
	async = require("async"),
	eventproxy = require('eventproxy');

var ep = new eventproxy();

var setting = require('./setting');

var dealTime=setting.dealTime;
var model=setting.model;

var urls = [
	'http://ggjd.cnstock.com/gglist/search/ggkx/0',
	'http://ggjd.cnstock.com/gglist/search/ggkx/1',
	'http://ggjd.cnstock.com/gglist/search/ggkx/2',
	'http://ggjd.cnstock.com/gglist/search/qmtbbdj/0',

	'http://dty.stcn.com/baibaobox/notice.jsp',
	'http://stock.stcn.com/zhuli/1.shtml',
	'http://stock.stcn.com/bankuai/index.shtml',
	'http://company.stcn.com/gsxw/index.shtml',
];

urls.forEach(function(url){
	superagent.get(url)
		.end(function(err,chunk){
			console.log('fetch ' + url + ' successful');
			if (err) console.log(err);

			var $ = cheerio.load(chunk.text);
			var curPageUrls = [];
			switch(url){
				case 'http://ggjd.cnstock.com/gglist/search/ggkx/0':
				case 'http://ggjd.cnstock.com/gglist/search/ggkx/1':
				case 'http://ggjd.cnstock.com/gglist/search/ggkx/2':
				case 'http://ggjd.cnstock.com/gglist/search/qmtbbdj/0':
					curPageUrls = $('.main-wrap .new-list a');
				case 'http://dty.stcn.com/baibaobox/notice.jsp':
					curPageUrls = $('.tishi dt strong');
				case 'http://stock.stcn.com/zhuli/1.shtml':
				case 'http://stock.stcn.com/bankuai/index.shtml':
				case 'http://company.stcn.com/gsxw/index.shtml':
					curPageUrls = $('.mainlist .tit a');
			}

			for(var i = 0 ; i < curPageUrls.length ; i++){
				var title = curPageUrls.eq(i).text();
				console.log(title +'\n');
			}
		})
});
