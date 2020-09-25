/*
 从5442网站上把所有的热门推荐下载下来 async+cheerio+request
 */
const util = require('util');
const request = require('request');
const http = require('http');
const fs = require('fs');
const cheerio = require('cheerio');
const async = require('async');
const mkdirp = require('mkdirp');

function Picture5442() {
    this.host = 'http://www.5442.com/meinv/';
}

Picture5442.prototype = {
    main: function () {
        var self = this;

        async.auto({
            //如果是对象，需要进行绑定，否则this没有
            readIndex: self.readIndex.bind(self),
            downloadHot: ['readIndex', self.downloadHot.bind(self),],
        }, function (err, result) {
            if (err) {
                console.error(err);
            } else {
                //console.log(util.inspect(result, true));
                console.log('所有的任务都完成');
            }
        });
    },

    //从主页读取要下载的内容
    readIndex: function (callback) {
        request(this.host, function (err, res, body) {
            if (!err && res.statusCode == 200) {
                var $ = cheerio.load(body);
                var links = $('div.lists.listNum.listTime.listLine a');
                var linkArr = [];
                links.each(function (i) {
                    linkArr[i] = $(this).attr('href');
                });

                //console.log('links=', util.inspect(linkArr,true));
                linkArr.push('http://www.5442.com/meinv/20140802/11261.html');
                linkArr.push('http://www.5442.com/meinv/20140705/10361.html');
                callback(null, linkArr);
            } else {
                callback(err);
            }
        });
    },

    //下载所有热门
    downloadHot: function (result, callback) {
        var self = this;
        var urls = result.readIndex;
        // if (urls==undefined||urls.length < 1) {
        //     callback('没有有效链接,读取失败', null);
        //     return;
        // }

        async.auto({
            getAllFirstImage: self.getAllFirstImage.bind(self, urls),
            downloadImages: ['getAllFirstImage', self.downloadImages.bind(self)],
        }, function (err, results) {
            console.log('所有的热门图片已经下载完成');
            callback();
        });
    },

    //下载一个影集
    downloadGallery: function (aurl, callback) {
        //使用while循环，直到下载不到正确的结果的时候就退出循环
        if(!aurl){
            callback();
        }

        var nexturl = aurl;
        var parentcb = callback;
        var dirname;
        var m = aurl.match(/^http:\/\/.+\/(.+\/.+\/.+)\/(\d+\.jpg)/);
        if (!m) {
            callback('无效url地址，无法解析:' + aurl, null);
        } else {
            dirname = m[1];
        }

        async.auto(
            {
                init: function (callback) {
                    //创建目录结构
                    if (!fs.existsSync(dirname)) {
                        mkdirp(dirname, function (err) {
                            if (err) {
                                console.error(err);
                                parentcb(err, null);
                                return;
                            } else {
                                console.log('创建目录成功：' + dirname);
                                callback();
                            }
                        });
                    } else {
                        //不需要创建目录
                        callback();
                    }
                },

                work: ['init', function (result, callback) {
                    var flagExit = false;
                    async.during(
                        function (callback) {
                            callback(null, !flagExit);
                        },
                        function (callback) {
                            console.log('开始下载:' + nexturl);
                            //request.get(nexturl).pipe()
                            http.get(nexturl, function (res) {
                                var chunks = [];
                                if (res.statusCode !== 200) {
                                    //退出循环
                                    console.error('下载图片失败，认为已经没有可以下载的图片了:' + nexturl);
                                    flagExit = true;
                                    //直接调用回调函数退出，避免重复回调
                                    callback();
                                    return;
                                }

                                res.on('data', function (data) {
                                    chunks.push(data);
                                });

                                res.on('end', function () {
                                    var buf = Buffer.concat(chunks);
                                    var m = nexturl.match(/^http:\/\/.+\/(.+\/.+\/.+)\/(\d+\.jpg)/);
                                    var filename = m[1] + '/' + m[2];
                                    fs.writeFile(filename, buf, function () {
                                        console.log('保存图片到文件:' + filename);
                                        var m = nexturl.match(/(\d+)\.jpg$/);
                                        var nj;
                                        if (m[1][0] === '0') {
                                            if (m[1][1] < 9) {
                                                nj = '0' + (parseInt(m[1][1]) + 1);
                                            } else {
                                                nj = 10;
                                            }

                                        } else {
                                            nj = parseInt(m[1]) + 1 + '';
                                        }
                                        nj += '.jpg'
                                        //下一张图片的位置
                                        nexturl = nexturl.replace(/\d+\.jpg/, nj);
                                        callback();
                                    });
                                });

                            })
                        },
                        function (err) {
                            console.log('跳出循环：' + aurl);
                            callback();
                        }
                    );
                }],
            },
            function (err, result) {
                if (err) {
                    console.error(err);
                    parentcb(err, aurl);
                } else {
                    console.log('一个影集已经下载完成:' + aurl);
                    parentcb(null, aurl);
                }
            });

    },

    //下载所有的图片
    downloadImages: function (results, callback) {
        if ('getAllFirstImage' in results) {
            //根据第一张图片开始不断的下载
            var urls = results.getAllFirstImage;
            async.mapSeries(urls, this.downloadGallery.bind(this), function (err, results) {
                if (err) {
                    callback(err, null);
                } else {
                    //返回所有成功的结果回去
                    callback(null, results);
                }
            });
        } else {
            //callback('获取不到第一张图片的数据', null);
        }
    },

    //读取页面的第一张图片，剩下的累加操作
    getFirstImage: function (aurl, callback) {
        request(aurl, function (err, res, body) {
            if (!err && res.statusCode == 200) {
                var $ = cheerio.load(body);
                var images = $('#contents img');
                var firstImg = images.first().attr('src');
                var flagIndex = firstImg.lastIndexOf('!');
                if (flagIndex != -1) {
                    firstImg = firstImg.slice(0, flagIndex);
                }
                callback(null, firstImg);
            } else {
                console.error(err);
                callback(err, null);
            }
        });
    },

    //读取所有的第一张图片
    getAllFirstImage: function (urls, callback) {
        async.mapLimit(urls, 4, this.getFirstImage.bind(this), function (err, results) {
            //console.log('已经获取到所有的第一张图片地址');
            console.log('所有的第一张图片地址:' + util.inspect(results, true));
            callback(null, results);
        });
    }
}

var pic = new Picture5442()
pic.main();
