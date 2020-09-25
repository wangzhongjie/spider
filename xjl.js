var cheerio = require('cheerio');
var http = require('http');
var iconv = require('iconv-lite');
var moment = require('moment');
var Promise = require('bluebird');
var meta = require('./meta');

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

let codes=[600519];

codes.forEach((code)=>{
   urls.push('http://quotes.money.163.com/f10/xjllb_'+code+'.html');
});

urls.forEach(function (url) {
	fetchPageUrl.push(getPageAsync(url));
});

Promise
    .all(fetchPageUrl)//针对每个url地址返回的页面HTML源码并发操作进行爬取
    .then(function (pages) {
        var back=[];
        pages.forEach((page) => {
            let arr=setJson(page);
            arr.forEach((e)=>{
                console.log(JSON.stringify(e)+',');
            })
            // back.push(item);
        });

        back.forEach((json)=> {
            console.log(JSON.stringify(json)+',');
        });
    });

function setJson(html){
    let $=html;
    let info = $('.scr_table tr');

    let reasons = info.eq(0).find('th');

    let jyhd1	= info.eq(2).find('td');
    let jyhd2	= info.eq(3).find('td');
    let jyhd3	= info.eq(4).find('td');
    let jyhd4	= info.eq(5).find('td');
    let jyhd5	= info.eq(6).find('td');
    let jyhd6	= info.eq(7).find('td');
    let jyhd7	= info.eq(8).find('td');
    let jyhd8	= info.eq(9).find('td');
    let jyhd9	= info.eq(10).find('td');
    let jyhd10	= info.eq(11).find('td');
    let jyhd11	= info.eq(12).find('td');
    let jyhd12	= info.eq(13).find('td');
    let jyhd13	= info.eq(14).find('td');
    let jyhd14	= info.eq(15).find('td');
    let jyhd15	= info.eq(16).find('td');
    let jyhd16	= info.eq(17).find('td');
    let jyhd17	= info.eq(18).find('td');
    let jyhd18	= info.eq(19).find('td');
    let jyhd19	= info.eq(20).find('td');
    let jyhd20	= info.eq(21).find('td');
    let jyhd21	= info.eq(22).find('td');
    let jyhd22	= info.eq(23).find('td');
    let jyhd23	= info.eq(24).find('td');
    let jyhd24	= info.eq(25).find('td');
    let jyhd25	= info.eq(26).find('td');

    let tzhd1	= info.eq(28).find('td');
    let tzhd2	= info.eq(28).find('td');
    let tzhd3	= info.eq(29).find('td');
    let tzhd4	= info.eq(30).find('td');
    let tzhd5	= info.eq(31).find('td');
    let tzhd6	= info.eq(32).find('td');
    let tzhd7	= info.eq(33).find('td');
    let tzhd8	= info.eq(34).find('td');
    let tzhd9	= info.eq(35).find('td');
    let tzhd10	= info.eq(36).find('td');
    let tzhd11	= info.eq(37).find('td');
    let tzhd12	= info.eq(38).find('td');
    let tzhd13	= info.eq(39).find('td');
    let tzhd14	= info.eq(40).find('td');
    let tzhd15	= info.eq(41).find('td');

    let czhd1	= info.eq(44).find('td');
    let czhd2	= info.eq(45).find('td');
    let czhd3	= info.eq(46).find('td');
    let czhd4	= info.eq(47).find('td');
    let czhd5	= info.eq(48).find('td');
    let czhd6	= info.eq(49).find('td');
    let czhd7	= info.eq(50).find('td');
    let czhd8	= info.eq(51).find('td');
    let czhd9	= info.eq(52).find('td');
    let czhd10	= info.eq(53).find('td');
    let czhd11	= info.eq(54).find('td');
    let czhd12	= info.eq(55).find('td');

    let hlbd1	= info.eq(57).find('td');

    let xjzje1	= info.eq(59).find('td');
    let xjzje2	= info.eq(60).find('td');
    let xjzje3	= info.eq(61).find('td');
    let xjzje4	= info.eq(62).find('td');

    let jlrtj1	= info.eq(64).find('td');
    let jlrtj2	= info.eq(65).find('td');
    let jlrtj3	= info.eq(66).find('td');
    let jlrtj4	= info.eq(67).find('td');
    let jlrtj5	= info.eq(68).find('td');
    let jlrtj6	= info.eq(69).find('td');
    let jlrtj7	= info.eq(70).find('td');
    let jlrtj8	= info.eq(71).find('td');
    let jlrtj9	= info.eq(72).find('td');
    let jlrtj10	= info.eq(73).find('td');
    let jlrtj11	= info.eq(74).find('td');
    let jlrtj12	= info.eq(75).find('td');
    let jlrtj13	= info.eq(76).find('td');
    let jlrtj14	= info.eq(77).find('td');
    let jlrtj15	= info.eq(78).find('td');
    let jlrtj16	= info.eq(79).find('td');
    let jlrtj17	= info.eq(80).find('td');
    let jlrtj18	= info.eq(81).find('td');
    let jlrtj19	= info.eq(82).find('td');
    let jlrtj20	= info.eq(83).find('td');
    let jlrtj21	= info.eq(84).find('td');
    let jlrtj22	= info.eq(85).find('td');
    let jlrtj23	= info.eq(86).find('td');
    let jlrtj24	= info.eq(87).find('td');
    let jlrtj25	= info.eq(88).find('td');

    let bsjxj1	= info.eq(80).find('td');
    let bsjxj2	= info.eq(81).find('td');
    let bsjxj3	= info.eq(82).find('td');

    let xjjbd1	= info.eq(84).find('td');
    let xjjbd2	= info.eq(85).find('td');
    let xjjbd3	= info.eq(86).find('td');
    let xjjbd4	= info.eq(87).find('td');
    let xjjbd5	= info.eq(88).find('td');

    let arr=[];

    for(let i=0; i<reasons.length; i++){
        arr.push({
            reason  : reasons.eq(i).text(),
            jyhd1   : jyhd1.eq(i).text()=='--' ? '--' : jyhd1.eq(i).text(),
            jyhd2	: jyhd2.eq(i).text()=='--' ? '--' : jyhd2.eq(i).text(),
            jyhd3	: jyhd3.eq(i).text()=='--' ? '--' : jyhd3.eq(i).text(),
            jyhd4	: jyhd4.eq(i).text()=='--' ? '--' : jyhd4.eq(i).text(),
            jyhd5	: jyhd5.eq(i).text()=='--' ? '--' : jyhd5.eq(i).text(),
            jyhd6	: jyhd6.eq(i).text()=='--' ? '--' : jyhd6.eq(i).text(),
            jyhd7	: jyhd7.eq(i).text()=='--' ? '--' : jyhd7.eq(i).text(),
            jyhd8	: jyhd8.eq(i).text()=='--' ? '--' : jyhd8.eq(i).text(),
            jyhd9	: jyhd9.eq(i).text()=='--' ? '--' : jyhd9.eq(i).text(),
            jyhd10	: jyhd10.eq(i).text()=='--' ? '--' : jyhd10.eq(i).text(),
            jyhd11	: jyhd11.eq(i).text()=='--' ? '--' : jyhd11.eq(i).text(),
            jyhd12	: jyhd12.eq(i).text()=='--' ? '--' : jyhd12.eq(i).text(),
            jyhd13	: jyhd13.eq(i).text()=='--' ? '--' : jyhd13.eq(i).text(),
            jyhd14	: jyhd14.eq(i).text()=='--' ? '--' : jyhd14.eq(i).text(),
            jyhd15	: jyhd15.eq(i).text()=='--' ? '--' : jyhd15.eq(i).text(),
            jyhd16	: jyhd16.eq(i).text()=='--' ? '--' : jyhd16.eq(i).text(),
            jyhd17	: jyhd17.eq(i).text()=='--' ? '--' : jyhd17.eq(i).text(),
            jyhd18	: jyhd18.eq(i).text()=='--' ? '--' : jyhd18.eq(i).text(),
            jyhd19	: jyhd19.eq(i).text()=='--' ? '--' : jyhd19.eq(i).text(),
            jyhd20	: jyhd20.eq(i).text()=='--' ? '--' : jyhd20.eq(i).text(),
            jyhd21	: jyhd21.eq(i).text()=='--' ? '--' : jyhd21.eq(i).text(),
            jyhd22	: jyhd22.eq(i).text()=='--' ? '--' : jyhd22.eq(i).text(),
            jyhd23	: jyhd23.eq(i).text()=='--' ? '--' : jyhd23.eq(i).text(),
            jyhd24	: jyhd24.eq(i).text()=='--' ? '--' : jyhd24.eq(i).text(),
            jyhd25	: jyhd25.eq(i).text()=='--' ? '--' : jyhd25.eq(i).text(),
            tzhd1	: tzhd1.eq(i).text()=='--' ? '--' : tzhd1.eq(i).text(),
            tzhd2	: tzhd2.eq(i).text()=='--' ? '--' : tzhd2.eq(i).text(),
            tzhd3	: tzhd3.eq(i).text()=='--' ? '--' : tzhd3.eq(i).text(),
            tzhd4	: tzhd4.eq(i).text()=='--' ? '--' : tzhd4.eq(i).text(),
            tzhd5	: tzhd5.eq(i).text()=='--' ? '--' : tzhd5.eq(i).text(),
            tzhd6	: tzhd6.eq(i).text()=='--' ? '--' : tzhd6.eq(i).text(),
            tzhd7	: tzhd7.eq(i).text()=='--' ? '--' : tzhd7.eq(i).text(),
            tzhd8	: tzhd8.eq(i).text()=='--' ? '--' : tzhd8.eq(i).text(),
            tzhd9	: tzhd9.eq(i).text()=='--' ? '--' : tzhd9.eq(i).text(),
            tzhd10	: tzhd10.eq(i).text()=='--' ? '--' : tzhd10.eq(i).text(),
            tzhd11	: tzhd11.eq(i).text()=='--' ? '--' : tzhd11.eq(i).text(),
            tzhd12	: tzhd12.eq(i).text()=='--' ? '--' : tzhd12.eq(i).text(),
            tzhd13	: tzhd13.eq(i).text()=='--' ? '--' : tzhd13.eq(i).text(),
            tzhd14	: tzhd14.eq(i).text()=='--' ? '--' : tzhd14.eq(i).text(),
            tzhd15	: tzhd15.eq(i).text()=='--' ? '--' : tzhd15.eq(i).text(),
            czhd1	: czhd1.eq(i).text()=='--' ? '--' : czhd1.eq(i).text(),
            czhd2	: czhd2.eq(i).text()=='--' ? '--' : czhd2.eq(i).text(),
            czhd3	: czhd3.eq(i).text()=='--' ? '--' : czhd3.eq(i).text(),
            czhd4	: czhd4.eq(i).text()=='--' ? '--' : czhd4.eq(i).text(),
            czhd5	: czhd5.eq(i).text()=='--' ? '--' : czhd5.eq(i).text(),
            czhd6	: czhd6.eq(i).text()=='--' ? '--' : czhd6.eq(i).text(),
            czhd7	: czhd7.eq(i).text()=='--' ? '--' : czhd7.eq(i).text(),
            czhd8	: czhd8.eq(i).text()=='--' ? '--' : czhd8.eq(i).text(),
            czhd9	: czhd9.eq(i).text()=='--' ? '--' : czhd9.eq(i).text(),
            czhd10	: czhd10.eq(i).text()=='--' ? '--' : czhd10.eq(i).text(),
            czhd11	: czhd11.eq(i).text()=='--' ? '--' : czhd11.eq(i).text(),
            czhd12	: czhd12.eq(i).text()=='--' ? '--' : czhd12.eq(i).text(),
            hlbd1	: hlbd1.eq(i).text()=='--' ? '--' : hlbd1.eq(i).text(),
            xjzje1	: xjzje1.eq(i).text()=='--' ? '--' : xjzje1.eq(i).text(),
            xjzje2	: xjzje2.eq(i).text()=='--' ? '--' : xjzje2.eq(i).text(),
            xjzje3	: xjzje3.eq(i).text()=='--' ? '--' : xjzje3.eq(i).text(),
            xjzje4	: xjzje4.eq(i).text()=='--' ? '--' : xjzje4.eq(i).text(),
            jlrtj1	: jlrtj1.eq(i).text()=='--' ? '--' : jlrtj1.eq(i).text(),
            jlrtj2	: jlrtj2.eq(i).text()=='--' ? '--' : jlrtj2.eq(i).text(),
            jlrtj3	: jlrtj3.eq(i).text()=='--' ? '--' : jlrtj3.eq(i).text(),
            jlrtj4	: jlrtj4.eq(i).text()=='--' ? '--' : jlrtj4.eq(i).text(),
            jlrtj5	: jlrtj5.eq(i).text()=='--' ? '--' : jlrtj5.eq(i).text(),
            jlrtj6	: jlrtj6.eq(i).text()=='--' ? '--' : jlrtj6.eq(i).text(),
            jlrtj7	: jlrtj7.eq(i).text()=='--' ? '--' : jlrtj7.eq(i).text(),
            jlrtj8	: jlrtj8.eq(i).text()=='--' ? '--' : jlrtj8.eq(i).text(),
            jlrtj9	: jlrtj9.eq(i).text()=='--' ? '--' : jlrtj9.eq(i).text(),
            jlrtj10	: jlrtj10.eq(i).text()=='--' ? '--' : jlrtj10.eq(i).text(),
            jlrtj11	: jlrtj11.eq(i).text()=='--' ? '--' : jlrtj11.eq(i).text(),
            jlrtj12	: jlrtj12.eq(i).text()=='--' ? '--' : jlrtj12.eq(i).text(),
            jlrtj13	: jlrtj13.eq(i).text()=='--' ? '--' : jlrtj13.eq(i).text(),
            jlrtj14	: jlrtj14.eq(i).text()=='--' ? '--' : jlrtj14.eq(i).text(),
            jlrtj15	: jlrtj15.eq(i).text()=='--' ? '--' : jlrtj15.eq(i).text(),
            jlrtj16	: jlrtj16.eq(i).text()=='--' ? '--' : jlrtj16.eq(i).text(),
            jlrtj17	: jlrtj17.eq(i).text()=='--' ? '--' : jlrtj17.eq(i).text(),
            jlrtj18	: jlrtj18.eq(i).text()=='--' ? '--' : jlrtj18.eq(i).text(),
            jlrtj19	: jlrtj19.eq(i).text()=='--' ? '--' : jlrtj19.eq(i).text(),
            jlrtj20	: jlrtj20.eq(i).text()=='--' ? '--' : jlrtj20.eq(i).text(),
            jlrtj21	: jlrtj21.eq(i).text()=='--' ? '--' : jlrtj21.eq(i).text(),
            jlrtj22	: jlrtj22.eq(i).text()=='--' ? '--' : jlrtj22.eq(i).text(),
            jlrtj23	: jlrtj23.eq(i).text()=='--' ? '--' : jlrtj23.eq(i).text(),
            jlrtj24	: jlrtj24.eq(i).text()=='--' ? '--' : jlrtj24.eq(i).text(),
            jlrtj25	: jlrtj25.eq(i).text()=='--' ? '--' : jlrtj25.eq(i).text(),
            bsjxj1	: bsjxj1.eq(i).text()=='--' ? '--' : bsjxj1.eq(i).text(),
            bsjxj2	: bsjxj2.eq(i).text()=='--' ? '--' : bsjxj2.eq(i).text(),
            bsjxj3	: bsjxj3.eq(i).text()=='--' ? '--' : bsjxj3.eq(i).text(),
            xjjbd1	: xjjbd1.eq(i).text()=='--' ? '--' : xjjbd1.eq(i).text(),
            xjjbd2	: xjjbd2.eq(i).text()=='--' ? '--' : xjjbd2.eq(i).text(),
            xjjbd3	: xjjbd3.eq(i).text()=='--' ? '--' : xjjbd3.eq(i).text(),
            xjjbd4	: xjjbd4.eq(i).text()=='--' ? '--' : xjjbd4.eq(i).text(),
            xjjbd5	: xjjbd5.eq(i).text()=='--' ? '--' : xjjbd5.eq(i).text(),
        })
    }

    return arr;
}