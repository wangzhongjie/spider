var cheerio = require('cheerio');
var http = require('http');
var iconv = require('iconv-lite');
var moment = require('moment');
var Promise = require('bluebird');
var meta = require('./meta');

let code_industry=[881121, 881133, 881122, 881134, 881104, 881107, 881123, 881130, 881102, 881161, 881150, 881128, 881119, 881132, 881101, 881138, 881151, 881166, 881136, 881149, 881160, 881154, 881142, 881110, 881106, 881159, 881145, 881111, 881135, 881103, 881127, 881124, 881146, 881140, 881143, 881125, 881139, 881114, 881129, 881155, 881152, 881108, 881158, 881141, 881137, 881131, 881148, 881164, 881118, 881144, 881156, 881105, 881117, 881147, 881165, 881115, 881157, 881112, 881162, 881163, 881126, 881109, 881120, 881116, 881153, 881113];

let code_concept=[885675, 885756, 885454, 885490, 885376, 885503, 885738, 885525, 885402, 885761, 885312, 885462, 885537, 885433, 885539, 885651, 885461, 885605, 885574, 885425, 885748, 885752, 885624, 885481, 885754, 885682, 885554, 885759, 885459, 885735, 885697, 885406, 885733, 885701, 885703, 885668, 885652, 885633, 885747, 885753, 885426, 885540, 885496, 885706, 885617, 885760, 885304, 885505, 885591, 885640, 885559, 885734, 885487, 885689, 885573, 885647, 885372, 885551, 885746, 885502, 885509, 885522, 885737, 885423, 885705, 885639, 885545, 885508, 885428, 885658, 885650, 885570, 885500, 885419, 885566, 885662, 885586, 885736, 885378, 885749, 885564, 885497, 885661, 885398, 885588, 885345, 885693, 885704, 885568, 885439, 885629, 885750, 885386, 885742, 885641, 885555, 885572, 885757, 885743, 885362, 885430, 885648, 885642, 885395, 885578, 885615, 885516, 885311, 885480, 885527, 885521, 885333, 885730, 885692, 885403, 885751, 885413, 885687, 885616, 885410, 885567, 885657, 885700, 885740, 885543, 885343, 885561, 885517, 885562, 885457, 885556, 885571, 885580, 885758, 885355, 885478, 885427, 885472, 885354, 885418, 885619, 885728, 885412, 885493, 885623, 885544, 885452, 885732, 885381, 885482, 885531, 885603, 885514, 885709, 885530, 885611, 885739, 885587, 885620, 885284, 885467, 885741, 885552, 885563, 885729, 885420, 885456, 885431, 885744, 885494, 885690, 885724, 885710, 885598, 885595, 885663, 885520, 885694, 885338, 885391];

let codes=code_industry.concat(code_concept);


var fetchPageUrl = [], urls=[];
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
				resolve(html);   //把当前的获取到页面的html返回回去（传递下去）

			});

		}).on('error', function (e) {
			reject(e);
			console.log('爬取页面失败');
		});
	})
}

code_industry.forEach((url)=>{
   urls.push('http://q.10jqka.com.cn/thshy/detail/code/'+ url);
});

urls.forEach(function (url) {
	fetchPageUrl.push(getPageAsync(url));
});

Promise
    .all(fetchPageUrl)//针对每个url地址返回的页面HTML源码并发操作进行爬取
    .then(function (pages) {
        var back=[];
        pages.forEach(function (page) {
            var item=setJson(page);
            back.push(item);
        });

        back.forEach(function (json) {
            console.log(JSON.stringify(json)+',');
        });
    });

function setJson(html){
    var $=html;
    var info = $('.heading');
    let detail=info.find('.board-infos dl');

    let title=info.find('.board-hq h3').text().replace(/\d+/, '');
    let code=info.find('.board-hq h3 span').text();
    let close=Number(info.find('.board-hq>span').text());

    let open=Number(detail.eq(0).find('dd').text());
    let yestclose=Number(detail.eq(1).find('dd').text());
    let low=Number(detail.eq(2).find('dd').text());
    let top=Number(detail.eq(3).find('dd').text());
    let volume=parseFloat(detail.eq(4).find('dd').text())*10000;
    let range=Number(detail.eq(5).find('dd').text().replace('%',''));
    let rank=Number(detail.eq(6).find('dd').text().split('/')[0]);
    let rise=Number(detail.eq(7).find('dd .arr-rise-s').text());
    let fall=Number(detail.eq(7).find('dd .arr-fall-s').text());
    let bbd=parseFloat(detail.eq(8).find('dd').text())*100000000;
    let turnover=parseFloat(detail.eq(9).find('dd').text())*100000000;

    return {title:title, code:code, close:close, open:open, yestclose:yestclose, low:low, top:top, volume:volume, range:range, rank:rank, rise:rise, fall:fall, bbd:bbd, turnover};
}