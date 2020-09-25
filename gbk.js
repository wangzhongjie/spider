var http = require('http');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');

function gbk(url, callback) {
	return function onRequest(req, res) {
		var htmlData = [];
		var htmlDataLength = 0;

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

				callback(cheerio.load(decodeHtmlData, {decodeEntities: false}), res);
			});

		});
	}
}

exports.gbk=gbk;