//行业板块
var meta_industry=['电气设备','化学制品','计算机应用','通用设备','专用设备','建筑装饰','汽车零部件','传媒','通信设备','化学制药','房地产开发','半导体及元件','有色冶炼加工','家用轻工','化工合成材料','零售','中药','建筑材料','服装家纺','光学光电子','医疗器械服务','食品加工制造','电子制造','其他电子','电力','生物制品','白色家电','计算机设备','通信服务','纺织制造','国防军工','物流','环保工程','包装印刷','基础化学','农产品加工','饮料制造','煤炭开采','燃气水务','证券','新材料','仪器仪表','港口航运','银行','钢铁','养殖业','贸易','景点及旅游','造纸','综合','公路铁路运输','医药商业','种植业与林业','采掘服务','非汽车交运','化工新材料','保险及其他','汽车整车','园区开发','机场航运','农业服务','视听器材','交运设备服务','公交','石油矿业开采','酒店及餐饮'];

//概念板块
var meta_concept=['融资融券','转融券标的','深港通','沪港通概念','新股与次新股','证金持股','央企国资改革','MSCI概念','互联网+','军工','电子商务','举牌','锂电池','工业4.0','新能源汽车','新能源','机器人概念','股权转让','参股新三板','新材料概念','节能环保','雄安新区','一带一路','文化传媒','电子信息','PPP概念','互联网金融','O2O概念','参股券商','光伏概念','大数据','虚拟现实','智能电网','军民融合','特斯拉','智慧城市','移动互联网','参股保险','高端装备','物联网','核电','智能穿戴','阿里巴巴概念','云计算','金改','参股民营银行','4G5G','生物医药','节能照明','污水处理','OLED','健康中国','振兴东北','手机游戏','小金属','白马股','风电','上海国资改革','充电桩','智能家居','安防','太阳能','医疗器械','人工智能','苹果概念','移动支付','汽车电子','医疗改革','在线教育','天然气','智能医疗','稀缺资源','网络游戏','车联网','迪士尼','高铁','家用电器','二胎概念','煤化工','新三板','稀土永磁','职业教育','3D打印','无人驾驶','集成电路','卫星导航','无人机','上海自贸区','网络安全','美丽中国','京津冀一体化','创投','中字头股票','风能','大飞机','黄金','土地流转','摘帽','电力改革','国产软件','债转股','电子竞技','基因测序','蓝宝石','页岩气','体育产业','固废处理','石墨烯','能源互联网','跨境电商','养老概念','芯片替代','供应链金融','期货概念','白酒','粤港澳概念','民营医院','建筑节能','新疆振兴','区块链','医药电商','P2P概念','万达私有化','马云概念','生态农业','通用航空','油品改革','农村电商','猪肉','特高压','人脸识别','足球概念','PM2.5','乳业','宽带中国','水利','金融IC','特钢','海工装备','蚂蚁金服概念','农业现代化','深圳国资改革','高校','禽流感','脱硫脱硝','食品安全','量子通信','地下管网','微信小程序','王者荣耀','物流电商平台','高送转','尾气治理','冷链物流','生物质能','租售同权','网约车','共享单车','东盟自贸区','互联网彩票','消费金融','农机','油品升级','分散染料','中韩自贸区','超导','氟化工','天津自贸区','特色小镇','航运','碳纤维','二维码识别','广东自贸区','钛白粉','两桶油改革','草甘膦','在线旅游','可燃冰','杭州亚运会','西安自贸区','福建自贸区','电子发票'];

//涨停板块
//    '新股','次新股','超跌反弹','低位反弹',
var meta_limite=['净利增','业绩增','净利降','业绩降','预盈','预增','盈利','盈利降','季增','季降','转让','质押','解除质押','减持','雄安','三季度','看好','回购','预亏','自由贸易港','芯片','5G','资金流入','收购','业绩预增','人工智能','充电桩','稀土永磁','抗癌新药','可燃冰','业绩增长','中标','股权转让','钢铁','增持计划','业绩大增','军民融合','借壳','苹果概念','新零售','白酒','煤炭','无人驾驶','战略合作协议','钴涨价','钛白粉','租售同权','煤炭板块','出售资产','军工','区块链','电解铝','重组获通过','央企改革','分散染料','央企国资改革','医药','OLED','集成电路','核电','并购重组','石墨烯','TDI涨价','复牌补涨','举牌','特斯拉','人脸识别','券商板块','影视传媒','小金属钴','实控人变更','纯碱涨价','针状焦','ST板块','混改','机器人','证金持股','退市风险解除','证金增持','央企重组','金属锌','净利预增','钢铁限产','有色板块','央企混改','业绩扭亏为盈','装配式建筑','业绩扭亏','上海国资改革','沪港通概念','互联网金融','联通混改','养老金持股','增强现实','保险板块','周期股','无人零售','化工产品涨价','创业板指标','传媒板块','氨纶','乙二醇','实近人变更','共有产权住房','中标联通项目','买入评级','土壤修复','流感','机构调研','ADC发泡剂','猪肉涨价','业绩转好','维生素涨价','铁矿石','废钢业务','碳酸锂','更名','耐火材料','游戏产业','大阅兵','一带一路','草甘膦','钒涨价','萤石','银行板块','央企合并预期','体育概念','业绩暴增','环保','上海国企改革','房屋租赁','碳酸二甲脂','移动支付','业绩向好','养老金','水泥涨价','证券','配股','高送转填权','涨价','环保装备制造','有色金属','硅晶圆','PVC','产品涨价','锂辉石涨价','通信设备','旅游','创投','要约收购','改名','实控人变更预期','央企合并','天津国资改革','新材料','雄安地热','稀土','挖掘机','金属镁','设立投资基金','乳业','液氧','新疆基建','硅锰','磁悬浮技术','云服务','创业板指标股','抗艾滋','新能源电动车','物联网','老庄股','逆势上涨','增持','小金属','语音控制','利空出尽','文化传媒','高送转预期','合同中标','重组调整','化学制品','机构买入','多晶硅','地方国企改革','智能交通','牛散进入','二孩概念','并购重组预期','环氧丙烷','LED','实控人重组','信息安全','疑似国家队持股','汇金持股','股份回购','期货概念','半导体','金砖会议','风电','蹭雄安新区','中科系','增持评级','底部放量','终止重组','收购公司','万达私有化','钢铁板块','农村电商','资产重组','签订合同','计算机应用','网络游戏','国企混改','创业板反弹','预焙阳极','医疗器械','硅铁价格上涨','低市盈率','订单回升','氢燃料电池','股东增持','磷矿','烧碱','厦门自贸区','庄股反弹','建军','深圳本地股','硫酸镍','钡涨价','钨涨价','资金控盘','与联通合作','基因测序','疑似庄股','雄安装配式建筑','老妖股','宫颈癌疫苗','芯片概念','股份联动','工业互联网','车联网','燃料乙醇','房地产开发'];
// var meta_limite=['环保'];




//股票 更新日期 2017-10-17  '浦发银行','东方财富','国泰君安',
var meta_stock=['华讯方舟','国旅联合','大千生态','克明面业','顺灏股份','立霸股份','南洋股份','北新建材','三维工程','海达股份','齐心集团','飞凯材料','东山精密','北讯集团','劲拓股份','天音控股','智慧松德','长川科技','济川药业','纳思达','三一重工','新雷能','明泰铝业','沙隆达Ａ','博创科技','世联行','钱江摩托','美芝股份','安凯客车','立讯精密','宁夏建材','长缆科技','*ST三维','众生药业','科蓝软件','赛福天','超图软件','广汇汽车','利亚德','森霸股份','数字认证','泰禾光电','高新兴','华统股','份新华','汇鸿集团','隆基股份','众业达','科达股份','*ST中基','丰元股份','双杰电气','江丰电子','中材科技','东方银星','中国巨石','塞力斯','索菲亚','盛路通信','精华制药','常青股份','开尔新材','鸿特精密','嘉澳环保','家家悦','祁连山','东旭蓝天','老板电器','正泰电器','德创环保','中广核技','数据港','中洲控股','东方中科','杰赛科技','东方通信','圆通速递','崇达技术','绝味食品','云意电气','罗普斯','金粤传','蓝英装备','中通国脉','雅本化学','北部湾港','康跃科技','维力医疗','三利谱','盛洋科技','天银机电','哈投股份','华数传媒','九洲电气','至纯科技','青岛海尔','安信信托','申通快递','集友股份','凯莱英','金域医学','国电南自','我乐家居','鲍斯股份','赢合科技','润邦股份','方大化工','会畅通讯','岭南控股','迪瑞医疗','百花村','优德精密','元成股份','川润股份','三圣股份','川金诺','太龙照明','河北宣工','凯撒旅游','民盛金科','三元达','博济医药','同有科技','乐通股份','金圆股份','联创互联','金龙机电','方直科技','中牧股份','皖江物流','用友网络','圣阳股份','江南高纤','ST生化','洁美科技','金发拉比','格力电器','建投能源','汇顶科技','捷成股份','延江股份','常山股份','欧派家居','全志科技','工大高新','三维通信','北京文化','口子窖','精测电子','弘业股份','视源股份','人人乐','隆平高科','浙江永','强三力','荣晟环保','浔兴股份','生物股份','宁沪高速','山东药玻','江阴银行','徐家汇','坚朗五金','岳阳兴长','深圳燃气','波导股份','兆驰股份','智飞生物','派思股份','日出东方','四通股份','日机密封','华菱星马','嘉寓股份','德艺文创','超讯通信','宝莱特','南方轴承','泰尔股份','东风股份','银亿股份','三花智控','歌尔股份','益丰药房','康旗股份','国创高新','美尚生态','炬华科技','天沃科技','西南证券','海默科技','百川能源','亚太股份','杭锅股份','天奇股份','隆鑫通用','欧普照','明英力','中元股份','亚翔集成','宏发股份','蓝丰生化','摩恩电气','寒锐钴业','普路通','金一文化','通化东宝','卧龙电气','正川股份','横店东磁','朗源股份','文化长城','皖天然','气苏泊','五洲新春','天业股份','中国海诚','国轩高科','太平洋','朗新科技','今世缘','宋都股份','江化微','加加食品','凯中精密','晨光文具','福斯特','富满电','子奥特','瑞茂通','安琪酵母','东睦股份','北巴传媒','恒信东方','诺邦股份','华中数控','春兴精工','分众传媒','中远海特','成飞集成','上海临港','三聚环保','安车检测','瀚叶股份','黄河旋风','阳普医疗','香溢融通','润和软件','国投中鲁','双箭股份','青山纸业','迪贝电气','中国平安','和晶科技','南天信息','贝达药业','瑞丰高材','掌趣科技','孚日股份','广州发展','乐凯胶片','冰轮环境','四川金顶','东江环保','富瀚微','华伍股份','和顺电气','东港股份','鸣志电器','东北证券','依顿电子','北信','源生意','辅仁药业','晨化股份','号百控股','安泰科技','佛塑科技','马应龙','力星股份','石基信息','智云股份','渤海活塞','星湖科技','首旅酒店','海利生物','茂硕电源','仟源医药','光韵达','安利股份','宝泰隆','华微电子','亚威股份','中国西电','*ST宝实','天铁股份','赛意信息','恒顺醋业','金太阳','山推股份','康尼机电','中成股份','海马汽车','茶花股份','藏格控股','锦龙股份','陕西金叶','天舟文化','龙头股份','杭叉集团','创力集团','园城黄金','北方国际','奥马电器','湖北广电','粤宏远Ａ','东华测试','牧原股份','湘潭电化','宝鹰股份','双象股份','东方电缆','澄星股份','南风化工','金麒麟','泸天化','京能置业','立思辰','神州高铁','玉龙股份','韩建河山','任子行','恒大高新','太极集团','奥维通信','盛弘股份','银信科技','华纺股份','拓维信息','卓翼科技','吉宏股份','健帆生物','盛讯达','京泉华','浙江东日','海王生物','一汽轿车','上工申贝','中粮生化','金自天正','神剑股份','轻纺城','恒丰纸业','盈峰环境','东音股份','莱茵体育','哈尔斯','顺鑫农业','盈方微','博汇纸业','远大智能','瀛通通讯','西藏城投','日发精机','龙力生物','绿盟科技','江苏国泰','海螺水泥','小商品城','鲁西化工','中国中期','华联股份','长青集团','东兴证券','好当家','四川双马','威孚高科','山东地矿','硅宝科技','强生控股','潜能恒信','棒杰股份','三友化工','天玑科技','易联众','江中药业','正海磁材','钱江水利','新华百货','平安银行','森源电气','兆日科技','赛轮金宇','上海物贸','通灵珠宝','云图控股','太原重工','天津港','捷荣技术','中飞股份','方正科技','北京城乡','苏州科达','信捷电气','中国国旅','富瑞特装','东方锆业','来伊份','山河药辅','奥拓电子','向日葵','东诚药业','新潮能源','民生银','行新和','航天工程','先进数通','众信旅游','中钢国际','开山股份','天润数娱','风神股份','聚飞光电','久其软件','天宸股份','宏达新材','联化科技','云天化','科士达','宜通世纪','金正大','三全食品','中国电影','翠微股份','中国宝安','起步股份','*ST新城','浙商中拓','北京科锐','永辉超市','北玻股份','华测检测','格尔软件','共达电声','陆家嘴','美亚光电','招商蛇口','无锡银行','欧亚集团','苏宁云商','长园集团','百傲化学','广聚能源','中大力德','合兴包装','内蒙一机','联创光电','科达利','长江通信','隧道股份','川投能源','长江证券','达华智能','天原集团','通策医疗','融钰集团','亿纬锂能','洽洽食品','今飞凯达','吉电股份','招商轮船','双良节能','华录百纳','唐山港','浙江龙盛','鲁北化工','东方集团','*ST平能','中国中冶','科大国创','莱克电气','中信重工','百联股份','大众公用','金雷风电','永高股份','南京化纤','美康生物','江苏有线','浙能电力','西藏天路','重庆路桥','建艺集团','曙光股份','美晨科技','地尔汉宇','数码科技','拉芳家化','圣龙股份','浩丰科技','南京熊猫','中国人寿','申通地铁','广安爱众','宜安科技','万向钱潮','浦东金桥','百利科技','国海证券','中国石化','申万宏源','中国核建','金花股份','大金重工','兄弟科技','中航机电','悦心健康','申能股份','华舟应急','鞍重股份','海航创新','英飞拓','古井贡酒','红旗连锁','厦门信达','博瑞传播','东方市场','海油工程','东莞控股','碧水源','国星光电','海源机械','太龙药业','华斯股份','国美通讯','万里马','爱仕达','深圳能源','抚顺特钢','*ST东数','沈阳化','工海利','航新科技','上海贝岭','奋达科','技阳光','经纬电材','双塔食品','界龙实业','东方航空','沃尔核材','宝钢包装','东风汽车','天龙集团','滨江集团','必康股份','重庆港九','美克家居','银江股份','粤泰股份','中国化学','华能国际','力源信息','省广股份','三湘印象','智慧能源','紫鑫药业','景兴纸业','鄂尔多斯','华意压缩','神州泰岳','台海核电','新华联','吉祥航空','爱普股份','华润三九','摩登大道','东方能源','宝莫股份','亚太科技','西安饮食','腾邦国际','京投发展','广东明珠','红豆股份','蓝色光标','华丽家族','友好集团','湘邮科技','ST亚太','北京银行','康得新','绿地控股','南纺股份','泰胜风能','容大感光','新国都','天汽模','悦达投资','长江投资','三七互娱','凯龙股份','华邦健康','中科信息','潍柴动力','国投安信','晶盛机电','尚品宅配','哈高科','三环集团','旋极信息','同德化工','冀东水泥','云赛智联','大立科技','天津磁卡','全筑股份','江粉磁材','多氟多','海宁皮城','泸州老窖','石英股份','音飞储存','戴维医疗','南玻Ａ','镇海股份','旭升股份','襄阳轴承','中材国际','永鼎股份','常熟银行','巨力索具','麦达数字','惠而浦','深圳机场','鲁信创投','鲁抗医药','北方股份','方正证券','明牌珠宝','中新药业','英威腾','佳士科技','嘉泽新能','福建水泥','美亚柏科','利君股份','南都电源','柳工','司尔特','中科电气','风华高科','新华制药','海螺型材','佛山照明','新天然气','首商股份','广汇物流','晓程科技','华兰生物','华夏银行','云投生态','光线传媒','荣盛发展','航天信息','通合科技','焦点科技','游久游戏','天邦股份','信息发展','韵达股份','昌红科技','奥翔药业','特变电工','熙菱信息','银轮股份','中国中车','麦格米特','和而泰','广电网络','西部牧业','中国神华','华夏幸福','联环药业','哈空调','东方铁塔','神奇制药','太阳电缆','金陵药业','东湖高新','益盛药业','九州通','华胜天成','三鑫医疗','劲嘉股份','雷迪克','吴江银行','荣科科技','利源精制','晨曦航空','华西能源','有研新材','峨眉山Ａ','广州酒家','龙溪股份','青岛金王','伊力特','三五互联','渤海轮渡','天喻信息','安迪苏','隆盛科技','醋化股份','建发股份','积成电子','金陵饭店','康拓红外','特发信息','博实股份','珠江钢琴','广百股份','深天马Ａ','福星股份','皖新传媒','海思科','复星医药','恒瑞医药','欧浦智网','泰和新材','深桑达Ａ','海正药业','瑞普生物','东方精工','设计总院','华荣股份','易华录','顺丰控股','安洁科技','日盈电子','爱建集团','赢时胜','量子高科','张家港行','浙江东方','银泰资源','华帝股份','艾比森','中恒电气','海顺新材','瀚蓝环境','贵阳银行','奥飞娱乐','晶方科技','汉钟精机','日月股份','瑞康医药','惠威科技','翰宇药业','香山股份','圣农发展','天夏智慧','广济药业','鼎捷软件','安奈儿','锦江投','资南京','中发科技','艾德生物','诚意药业','红蜻蜓','开创国际','万里石','兴业银行','三变科技','思源电气','人福医药','新华医疗','达刚路机','美力科技','海大集团','科伦药业','贵州茅台','曲江文旅','中航飞机','中亚股份','航发控制','三六五网','永悦科技','华润双鹤','惠发股','份新大','扬杰科技','华海药业','三棵树','宁波华翔','万科Ａ','华体科技','国睿科技','日海通讯','创业软件','中兴通讯','凯乐科技','得邦照明','科华恒盛','永安药业','张裕Ａ','岱美股份','海量数据','金溢科技','上海天洋','云南白药','天赐材料','永安行','吉比特','圣邦股份','电工合金','智动力','佩蒂股份','江苏雷利','正丹股份','光莆股份','华测导航','华瑞股份','光库科技','思特奇','恒锋信息','欧普康视','江龙船艇','英飞特','汇金科技','理工光科','三超新材','集智股份','雄帝科技','广信材料','博思软件','金冠电气','新美星','名家汇','东杰智能','聚隆科技','新元科技','高伟达','星徽精密','耐威科技','先导智能','广生堂','鲁亿通','九强生物','宝色股份','天华超净','安控科技','红宇新材','科恒股份','开元股份','新文化','苏大维格','华虹计通','海伦钢琴','麦捷科技','博晖创新','慈星股份','裕兴股份','长方集团','朗玛信息','和佳股份','新天科技','星星科技','常山药业','初灵信息','瑞丰光电','冠昊生物','洲明科技','上海钢联','鸿利智汇','电科院','佳讯飞鸿','理邦仪器','高盟新材','长海股份','福安药业','通裕重工','华峰超纤','中电环保','汉得信息','天晟新材','万达信息','秀强股份','振东制药','瑞凌股份','科泰电源','香雪制药','沃森生物','晨光生物','英唐智控','汇川技术','太阳鸟','华仁药业','乾照光电','国联水产','奥克股份','三川智慧','豫金刚石','世纪鼎利','朗科科技','同花顺','华谊兄弟','红日药业','华星创业','天海防务','中宠股份','实丰文化','比音勒芬','中装建设','山东赫达','帝王洁具','久远银海','柏堡龙','科迪乳业','汇洁股份','东方新星','国光股份','光华科技','利民股份','萃华珠宝','金轮股份','奥瑞金','新疆浩源','美盛文化','冀凯股份','金河生物','宏大爆破','龙洲股份','长生生物','首航节能','博彦科技','卫星石化','道明光学','成都路桥','完美世界','朗姿股份','龙蟒佰利','山东章鼓','日上集团','八菱科技','海能达','闽发铝业','森马服饰','巨人网络','惠博普','宝鼎科技','千红制药','新时达','天桥起重','恺英网络','搜于特','骅威文化','汉缆股份','佳隆股份','通鼎互联','*ST墨龙','嘉麟杰','希努尔','新筑股份','榕基软件','沪电股份','益生股份','中原内配','兴森科技','凯撒文化','高德红外','雷科防务','齐翔腾达','嘉欣丝绸','中远海科','海普瑞','星网锐捷','北京利尔','大北农','新北洋','北方华创','亚太药业','太极股份','隆基机械','富临运业','杰瑞股份','慈文传媒','赛象科技','新朋股份','理工环科','华英农业','久立特材','南山控股','美盈森','罗莱生活','天润曲轴','博深工具','华昌化','工卫士','浙富控股','西仪股份','帝龙文化','奥特佳','大华股份','濮耐股份','方正电机','巴士在线','海得控制','智光电气','莱茵生','物红宝','三特索道','通富微','电报喜','广电运通','中核钛白','*ST普林','恒星科技','科陆电子','信隆健康','广博股份','广东鸿图','海翔药业','中泰化','学新海','鲁阳节能','海鸥卫','浴金螳','苏州固锝','太阳纸业','软控股份','东华软件','华峰氨纶','远光软件','江山化工','中钢天源','中工国际','美年健','康兔宝','久联发展','丽江旅游','海特高新','科华生物','永新股份','豫能控股','*ST中绒','众泰汽车','桂林旅游','浪潮信息','长源电力','中南建设','首钢股份','欣龙控股','中国重汽','嘉凯城','电广传媒','景峰医药','现代投资','津滨发展','湖北能源','潍柴重','机新希','银星能源','国风塑业','华茂股份','中国武夷','万年青','美达股份','新兴铸管','中核科技','浩物股份','四川美丰','燕京啤酒','美锦能源','大地传媒','中兴商业','双环科技','正虹科技','宝新能源','中山公用','远兴能源','东方电子','美好置业','经纬纺机','*ST中富','金科股份','吉林敖东','海航投资','青岛双星','大通燃气','启迪古汉','新大洲Ａ','海南海药','渝三峡Ａ','供销大集','烽火电子','泰山石油','湖南投资','金浦钛业','中原环保','皖能电力','广弘控股','美菱电器','丽珠集团','金路集团','山东路桥','张家界','华天酒店','徐工机械','东阿阿胶','南京公用','吉林化纤','民生控股','渤海金控','英特集团','丰原药业','宜华健康','华侨城Ａ','华控赛格','华锦股份','皇庭国际','泛海控股','华联控股','富奥股份','方盛制药','继峰股份','艾华集团','中电电机','吉华集团','法兰泰克','兴业股份','老百姓','太平鸟','飞科电器','中公高科','正平股份','N洛凯','柯利达','百合花','宁波高发','威龙股份','中马传动','纽威股份','安记食品','龙马环卫','火炬电子','奇精机械','卫信康','三祥新材','南威软件','杭电股份','诺力股份','荣泰健康','美诺华','维格娜丝','展鹏科技','九洲药业','鼎信通讯','新华龙','东方时尚','华懋科技','海鸥股份','松发股份','天龙股份','景旺电子','迎驾贡酒','保隆科技','日播时尚','上海亚虹','腾龙股份','碳元科技','华贸物流','共进股份','润达医疗','森特股份','宁波精达','天成自控','和邦生物','国检集团','美思德','华立股份','三维股份','德新交运','新通联','中设集团','弘讯科技','万盛股份','喜临门','龙宇燃油','中信银行','丰林集团','金隅股份','大唐发电','中国银行','玲珑轮胎','建设银行','亚星锚链','大连港','中国石油','星宇股份','蓝科高新','宁波建工','光大证券','力帆股份','际华集团','郑煤机','风范股份','拓普集团','滨化股份','中国建筑','旗滨集团','鹿港文化','吉林高速','兴业证券','百隆东方','广深铁路','农业银行','庞大集团','桐昆股份','上海银行','君正集团','杭齿前进','重庆水务','小康股份','华鼎股份','中国国航','四川成渝','中南传媒','文峰股份','宝胜股份','福成股份','东方证券','重庆建工','杭州银行','江苏银行','重庆燃气','长江电力','览海投资','张江高科','广日股份','大晟文化','国投电力','广泽股份','亚泰集团','东方电气','王府井','龙建股份','海欣股份','宝信软件','上柴股份','四川长虹','上海九百','茂业商业','津劝业','耀皮玻璃','华北制药','山西汾酒','国电电力','保税科技','汉商集团','祥龙电业','宁波富邦','安徽合力','长江传媒','兰州民百','中国高科','凤凰股份','南京医药','南宁百货','湖南天雁','大商股份','亚通股份','上海石化','刚泰控股','金龙汽车','交运股份','中华企业','福耀玻璃','富控互动','华建集团','申达股份','金枫酒业','丰华股份','老凤祥','大众交通','中毅达','金杯汽车','熊猫金控','广东榕泰','金晶科技','京能电力','精达股份','中珠医疗','山鹰纸业','法拉电子','大西洋','康缘药业','狮头股份','国发股份','亿晶光电','宏达矿业','置信电气','国药股份','上海能源','西昌电力','凤竹纺织','龙元建设','福能股份','科力远','华光股份','九有股份','时代新材','国机通用','通威股份','昆药集团','仰帆控股','现代制药','国电南瑞','海澜之家','安源煤业','金山股份','五矿资本','海越股份','金地集团','宝光股份','五洲交通','旭光股份','山东高速','恒力股份','华发股份','天房发展','振华重工','新力金融','营口港','荣华实业','江苏舜天','浦东建设','中央商场','开开实业','赣粤高速','阳光照明','广汇能源','梦舟股份','中恒集团','万通地产','青海华鼎','海南椰岛','赤天化','浙江医药','长春经开','西藏药业','紫江企业','新湖中宝','长城电工','莲花健康','光电股份','东安动力','雅戈尔','卧龙地产','上海建工','大龙地产','华升股份','长春一东','西部资源','中国卫星','西宁特钢','三峡水利','国金证券','明星电力','博信股份','东风科技','凤凰光学','皖维高新','海信电器','古越龙山','黄山旅游','歌华有线','楚天高速','福建高速','华电国际','中远海能','上海电力','上港集团','皖通高速','白云机场','浦发银行','中旗股份','顶点软件','华达科技','达志科技','扬农化工','科森科技','华正新材','步长制药','世嘉科技','四创电子','广汽集团','创新股份','尤夫股份','开润股份','金石东方','游族网络','联得装备','厦门空港','歌力思','三安光电','温氏股份','全信股份','中路股份','同达创业','中坚科技','兆丰股份','新天药业','农尚环境','世运电路','上海莱士','达安基因','长春高新','顺网科','技全聚','水井坊','华灿光电','弘宇股份','深华发Ａ','浪莎股份','苏利股份','永艺股份','珈伟股份','外高桥','华工科技','永贵电器','沙河股','份安纳','菲利华','安德利','秦安股份','青岛啤酒','许继电气','世纪华通','九牧王','巨星科技','好利来','舒泰神','大唐电信','凯发电气','博腾股份','川环科技','长荣股份','空港股份','新日恒力','中体产业','创意信息','光明乳业','绵石投资','五矿发展','苏奥传感','鼎汉技术','易尚展示','宝硕股','份达意','益佰制药','华金资本','金风科技','合纵科技','爱尔眼科','长城汽车','延华智能','湘电股份','北纬科技','金诚信','湖南发展','深天地Ａ','胜宏科','技五粮','飞亚达Ａ','华鑫股份','亿联网络','平高电气','易德龙','维宏股份','海南矿业','新安股份','扬帆新材','中海油服','杉杉股','份远望','华域汽车','东百集团','山西证券','中天能源','伟星股份','首开股份','大亚圣象','三星医疗','亚星化学','中信国安','金城医药','贝因美','金财互联','棕榈股份','国脉科技','保利地产','天马股份','华闻传媒','三峡新材','中化岩土','招商证券','天通股份','海利尔','绿城水务','一心堂','融捷股份','佛慈制药','视觉中国','雷曼股份','上海机电','深高速','贵航股份','宁波东力','深物业A','王子新材','云南旅游','世龙实业','梦百合','广发证券','京威股份','太安堂','晨鸣纸业','金字火腿','凯利泰','北矿科技','金洲管道','中孚信息','伟星新材','普利特','尖峰集团','亚厦股份','嘉化能源','均胜电子','闰土股份','辽宁成大','中信证券','国恩股份','金利科技','大秦铁路','皇氏集团','劲胜智能','南华仪器','大族激光','新城控股','一拖股份','澳洋顺','昌农产','贵州百灵','钱江生化','吉药控股','山河智能','迈克生物','粤高速Ａ','亿通科技','远东传动','航天动力','银龙股份','贵糖股份','动力源','麦趣尔','天虹股份','安徽水利','大东方','宏达高科','四川九洲','天康生物','精准信息','南方航空','上海医药','大连圣亚','双汇发展','鹏辉能源','南京银行','豫光金铅','华谊嘉信','富临精工','吉艾科技','中国电建','太辰光','上海电气','标准股份','江苏神通','汇通能源','金杯电工','得润电子','广西广电','山东矿机','西藏旅游','哈工智能','中国交建','铁流股份','天能重工','中文传媒','新华文轩','四环生物','中国核电','新凤鸣','欧菲光','乐山电力','大冷股份','金亚科技','日科化学','*ST三泰','二三四五','冠城大通','上海凯宝','大连热电','航天通信','金信诺','梦洁股份','周大生','东材科技','时代出版','同益股份','名雕股份','长春燃气','拓尔思','天保基建','东软载波','江铃汽车','天神娱乐','伊利股份','三元股份','埃斯顿','国信证券','中油工程','水晶光电','和仁科技','东方财富','光正集团','金卡智能','天源迪科','高乐股份','誉衡药业','沃华医药','紫光国芯','超华科技','城地股份','红星发展','瑞和股份','广誉远','国际实业','东宝生物','鲁银投资','键桥通讯','先河环保','江南水务','财信发展','华电重工','梅花生物','燕塘乳业','交通银行','雄韬股份','嘉应制药','青海春天','达实智能','中捷资源','北大荒','洪涛股份','安正时尚','恒立实业','万林股份','新野纺织','巨化股份','中船科技','黑牛食品','同方股份','华联综超','外运发展','万里扬','博闻科技','中航资本','宁波港','奥康国','际金融','上海凤凰','锦江股份','西部创业','瑞贝卡','中威电子','常宝股份','鹏起科技','益民集团','丹邦科技','文山电力','蓝黛传动','江苏国信','双鹭药业','宁波银行','机器人','荃银高科','爱施德','天药股份','易明医药','健民集团','电魂网络','华谊集团','潮宏基','天威视讯','珍宝岛','引力传媒','小天鹅Ａ','力生制药','天孚通信','通宝能源','福达股份','黔轮胎Ａ','康力电梯','福瑞股份','中原高速','世茂股份','上汽集团','厚普股份','国泰君安','葛洲坝','陕国投Ａ','贵人鸟','菲林格尔','粤电力Ａ','汉邦高科','泰达股份','东方金钰','正裕工业','中京电子','东方明珠','幸福蓝海','栋梁新材','深圳华强','东尼电子','南京高科','基蛋生物','北大医药','宜华生活','山大华特','江海股份','通产丽星','楚天科技','中超控股','中科曙光','中顺洁柔','百洋股份','上峰水泥','海通证券','联明股份','宁波韵升','生益科技','亚盛集团','浙江广厦','金贵银业','顾家家居','中科金财','中航重机','龙蟠科技','城市传媒','沧州明珠','宜昌交运','广州浪奇','中粮糖业','贵研铂业','百润股份','松芝股份','梅雁吉祥','索菱股份','朗迪集团','长电科技','千山药机','中联重科','西藏发展','凤凰传媒','信雅达','海兴电力','冰川网络','中集集团','伟隆股份','中闽能源','龙江交通','金种子酒','聚龙股份','上海家化','万润科','技盐田','四川路桥','银鸽投资','宁波富达','勘设股份','宝利国际','金禾实业','神思电子','青青稞酒','绿庭投资','红相电力','银座股份','华友钴业','龙泉股份','协鑫集成','光洋股份','中国中铁','永东股份','浙数文化','元祖股份','保变电气','吉鑫科技','大豪科技','华电能源','新光圆成','麦迪电气','春秋航空','启明星辰','中国太保','光迅科技','证通电子','石化机械','诺德股份','海德股份','航天科技','胜利股份','华远地产','亿利达','长信科技','凤形股份','神马股份','先锋电子','光大银行','铁龙物流','湖南海利','中鼎股份','羚锐制药','正元智慧','盐湖股','份深赛','云内动力','江苏索普','中国铁建','浙江世宝','天士力','华平股份','冠福股份','飞马国际','大参林','富春环保','东吴证券','银河磁体','通达股份','欣旺达','新世界','莫高股份','金龙羽','靖远煤电','三房巷','云南锗业','川仪股份','中远海发','京新药业','航天发展','双星新材','华孚时','尚渝开','航天机电','建科院','金洲慈航','黑牡丹','高科石化','博士眼','镜法尔','海陆重工','澳洋科','技中关','深纺织Ａ','涪陵榨菜','美邦服饰','捷捷微电','威星智能','国民技','术步步','未名医药','东方电热','奥佳华','中衡设计','同仁堂','一汽富维','苏州高新','北斗星通','东旭光电','四方达','阳煤化工','华策影视','禾望电气','长白山','香梨股份','合锻智能','维尔利','华大基因','郴电国际','华泰证券','华泰股份','新光药业','联发股份','香江控股','上海三毛','浙江众成','江苏阳光','中远海控','珠江实业','沃特股份','漳泽电力','陕鼓动力','安诺其','国统股份','百大集团','振芯科技','武进不锈','福晶科技','三角轮胎','汇中股份','温州宏丰','环旭电子','京山轻机','惠泉啤','酒万家','东软集团','金陵体育','吉视传媒','东方钽业','迦南科技','建新股份','皖通科技','国元证券','洪城水业','西水股份','闻泰科技','飞乐音响','梅泰诺','申华控股','美的集团','苏交科','宁波联合','邦宝益智','上海机场','冀中能源','汇嘉时代','上海梅林','博世科','西安旅游','海航控股','华昌达','威华股份','中储股份','亚星客车','白云山','天圣制药','晋亿实业','兴齐眼药','金鸿控股','亚振家居','西藏矿','业七匹','富邦股份','美格智能','六国化工','大康农业','巨轮智能','乐普医疗','洋河股份','星帅','尔九芝','富森美','九鼎投资','全通教育','九阳股份','首创股份','长城动漫','内蒙华电','中国医药','石化油服','工商银行','富祥股份','福田汽车','振华股份','鲁泰Ａ','合肥百货','科林电气','润欣科技','华铁股份','良信电器','凌云股份','新疆天业','浙江鼎力','回天新材','新联电子','武汉控股','兴业科技','新研股份','冠豪高新','天齐锂业','东方园林','久之洋','新华锦','天海投资','仁和药业','澳柯玛','智慧农业','上海电影','德美化工','海泰发展','连云港','武汉中商','洪都航空','梦网集团','彩虹股份','民德电子','深南电A','国科微','康弘药业','四方股份','至正股份','兴蓉环境','宏昌电子','中炬高新','南宁糖业','福日电子','浙商证券','超声电子','绿景控股','盛天网络','快克股份','德威新材','辉丰股份','漫步者','华东科技','海格通信','三星新材','如意集团','中国长城','中青旅','通润装备','银禧科技','柳州医药','东富龙','安井食品','正邦科技','林洋能源','永创智能','唐人神','晶瑞股份','航天电器','兰生股份','民丰特纸','通宇通讯','长盈精密','林州重机','东方通','天健集团','科锐国际','南国置业','中电鑫龙','中天科技','中设股份','平治信息','卫宁健康','广晟有色','复旦复华','承德露露','华媒控股','康惠制药','塔牌集团','江淮汽车','包钢股份','京运通','宝钛股份','新界泵业','四通新材','厦门国贸','科新机电','安硕信息','华安证券','长久物流','云煤能源','东方创业','GQY视讯','爱康科技','威帝股份','优博讯','恒立液压','天山股份','泰格医药','百达精工','恒为科技','大名城','健友股份','秦川机床','京东方Ａ','天地科技','中国动力','宏图高科','万丰奥威','方大集团','道道全','宝钢股份','山东华鹏','凯普生物','世纪星源','乔治白','神力股份','伊之密','中房地产','*ST东海A','信立泰','贵广网络','海辰药业','振华科技','闽东电力','荣盛石化','启迪桑德','中再资环','士兰微','泰禾集团','华钰矿业','华银电力','龙源技术','探路者','鹏博士','艾迪精密','S佳通','明星电缆','中国联通','金牌厨柜','长高集团','第一医药','实达集团','斯太尔','博迈科','宋城演艺','光明地产','中百集团','祥源文化','鄂武商Ａ','恒通股份','长安汽车','奥普光电','合肥城建','跨境通','鼎龙股份','创元科技','泰晶科技','佐力药业','中铁工业','新奥股份','华铁科技','九华旅游','金鹰股份','银宝山新','苏常柴Ａ','獐子岛','上实发展','杰恩设计','鲁商置业','泰豪科技','龙大肉食','中原证券','国中水务','海欣食品','拓斯达','正源股份','春兰股份','雏鹰农牧','启迪设计','西泵股份','西部证券','合金投资','万邦达','宝馨科技','广电电气','顺络电子','升达林业','大冶特钢','力盛赛车','天茂集团','中兵红箭','比亚迪','凯众股份','千金药业','黑芝麻','大连友谊','仙琚制药','西陇科学','金智科技','雪榕生物','安科生物','山东海化','特力Ａ','天龙光电','河钢股份','国新能源','全柴动力','二六三','好莱客','中通客车','东华科技','*ST德力','跃岭股份','光威复材','交大昂立','迪生力','华东医药','红墙股份','鱼跃医疗','新集能源','市北高新','宏盛股份','杰克股份','蓝海华腾','北部湾旅','荣安地产','日照港','杭萧钢构','蓝光发展','巴安水务','乐金健康','北方导航','骆驼股份','华鲁恒升','兆易创新','海洋王','哈森股份','福鞍股份','齐峰新材','金科文化','雷柏科技','元隆雅图','应流股份','天创时尚','通葡股份','天和防务','大连重工','特锐德','微光股份','道恩股份','科达洁能','广宇发展','格力地产','长亮科技','吴通控股','银河电子','*ST云网','天宝食品','信达地产','轴研科技','华天科技','天首发展','灵康药业','物产中大','飞力达','迅游科技','惠达卫浴','太阳能','涪陵电力','奇正藏药','上海新阳','海伦哲','星期六','顺发恒业','航发动力','沪宁股份','易成新能','华扬联众','三孚股份','百川股份','高新发展','华业资本','节能风电','城投控股','天润乳业','岷江水电','亚泰国际','南岭民爆','三雄极光','综艺股份','安泰集团','汇源通信','万润股份','越秀金控','电连技术','恒逸石化','鹏翎股份','思创医惠','江苏吴中','山东威达','中文在线','沧州大化','华通医药','广信股份','当代东方','中青宝','深康佳Ａ','海康威视','利德曼','宏润建设','济民制药','星源材质','万马股份','华明装备','汤臣倍健','金石资源','新亚制程','华映科技','东土科技','古鳌科技','中水渔业','赣能股份','珠江控股','华东电脑','航发科技','第一创业','诚志股份','国祯环保','赣锋锂业','海印股份','华鹏飞','金达威','深科技','达威股份','凯迪生态','美丽生态','网达软件','罗平锌电','远大控股','洪汇新材','葵花药业','*ST准油','天际股份','弘亚数控','太极实业','数字政通','西部材料','中国银河','苏宁环球','杭钢股份','先达股份','蓝盾股份','富安娜','中航高科','万安科技','永太科技','德尔未来','英洛华','新澳股份','普邦股份','金安国纪','美联新材','双环传动','柘中股份','洲际油气','安彩高科','三木集团','康盛股份','龙净环保','纳川股份','深冷股份','同济堂','广宇集团','健盛集团','中材节能','永泰能源','江特电机','普利制药','佳都科技','绿茵生态','迪马股份','康芝药业','江河集团','华西股份','联美控股','广田集团','三江购物','象屿股份','新疆城建','浙江震元','世荣兆业','恒泰艾普','睿能科技','天泽信息','诚益通','中航地产','纳尔股份','读者传媒','广州港','华信国际','南极电商','美尔雅','亚夏汽车','德尔股份','常熟汽饰','黑猫股份','万和电气','科斯伍德','翔鹭钨业','湖南黄金','浙江美大','毅昌股份','铜峰电子','惠天热电','曲美家居','汉威科技','拓日新能','安靠智电','青龙管业','莎普爱思','*ST佳电','我武生物','新宏泰','金瑞矿','业诺普','万业企业','思维列控','仙坛股份','易世达','宁波热电','中直股份','辉煌科技','台基股份','中国汽研','杭州高新','天地源','科大讯飞','新泉股份','高斯贝尔','神州长城','道森股份','新农开发','同洲电子','西部建设','腾达建设','凯盛科技','乐凯新材','氯碱化工','中国软件','大洋电机','招商银行','德展健康','会稽山','康美药业','航天晨光','运达科技','两面针','兴源环境','中煤能源','广和通','盛屯矿业','北京城建','智度股份','长江润发','高澜股份','恒华科技','鸿达兴业','利安隆','石大胜华','永利股份','壹桥股份','岳阳林纸','桃李面包','中航电子','漳州发展','天富能源','联创电子','农发种业','御银股份','红阳能源','栖霞建设','航民股份','广联达','富春股份','宁波海运','云南能投','雪浪环境','康恩贝','锦州港','新疆众和','北新路桥','中南文化','众兴菌业','林海股份','聚光科技','乾景园林','青松股份','昭衍新药','信邦制药','亚邦股份','中航电测','钧达股份','中科新材','明家联合','同大股份','三诺生物','天广中茂','大富科技','君禾股份','晋西车轴','凌霄泵','业粤水','华资实业','拓邦股份','长青股份','中科三环','金钼股份','珠江啤酒','大元泵业','万东医疗','恒生电子','金健米业','模塑科技','牧高笛','浙大网新','兴化股份','通程控股','盛达矿业','三德科技','宏创控股','嘉宝集团','超频三','紫光股份','正海生物','长航凤凰','五洋科技','航天长峰','秦港股份','艾艾精工','德赛电池','桂林三金','盾安环境','亚宝药业','英搏尔','远达环保','康泰生物','南方传媒','宁波中百','禾丰牧业','硕贝德','赞宇科技','万华化学','海天精工','紫金矿业','众合科技','史丹利','恩华药业','佳创视讯','昆仑万维','深赤湾Ａ','新宏泽','吉林森工','烽火通信','海波重科','瑞斯康达','雄塑科技','好想你','岭南园林','南山铝业','中广天择','航天电子','高鸿股份','国机汽车','维科精华','炼石有色','金新农','安通控股','安图生物','健康元','围海股份','金发科技','德豪润达','太钢不锈','普莱柯','联络互动','荣之联','天顺风能','永安林业','东方国信','中色股份','科远股份','中昌数据','中国国贸','合力泰','大禹节水','商业城','利群股份','中能电气','花王股份','蓝思科技','鸿路钢构','光环新网','鹭燕医药','启明信息','神宇股份','志邦股份','凯瑞德','新华保险','安妮股份','创业环保','杭氧股份','华脉科技','江泉实业','多伦科技','科力尔','透景生命','铁汉生态','四方冷链','片仔癀','恒润股份','洛阳钼业','桂冠电力','金固股份','南方汇通','中航三鑫','申科股份','华新水泥','万讯自控','世纪瑞尔','江西长运','兰州黄河','康普顿','中化国际','通用股份','捷顺科技','新宁物流','南大光电','兰花科创','三毛派神','东方网','络威尔','杭州园林','迪森股份','北辰实业','天目药业','冠农股','份红太','茂化实华','中际旭创','中来股份','赛托生物','金徽酒','新南洋','盘江股份','科林环保','皇马科技','新开普','当升科技','仁智股份','利欧股份','新乡化纤','鞍钢股份','浙江仙通','信维通信','爱乐达','桂发祥','精伦电子','康隆达','新晨科技','亿利洁能','远方信息','木林森','美利云','阳光电源','雪迪','龙怡亚','创维数字','裕同科技','久吾高科','创业黑马','高争民爆','蓝晓科技','同兴达','北京君正','徕木股份','新日股份','黄山胶囊','白云电器','东北制药','中利集团','信质电机','珠海港','永和智控','赛隆药业','贝瑞基因','博通股份','神农基因','电子城','中金黄金','金证股份','国际医学','金牛化工','快意电梯','传化智联','宜宾纸业','山东黄金','恒通科技','中新科技','维业股份','梅安森','星辉娱乐','安居宝','新黄浦','铜陵有色','丝路视觉','沱牌舍得','宇通客车','中钨高新','锐奇股份','横河模具','怡球资源','华宇软件','文科园林','数源科技','赛为智能','常铝股','份美欣','利尔化学','秋林集团','万孚生物','金刚玻璃','森远股份','云海金属','中航光电','易见股份','格林美','合众思壮','苏州恒久','天瑞仪器','桂东电力','亿帆医药','海天味业','华凯创意','恒宝股份','浪潮软件','东方日升','欣天科技','雅化集团','人民网','兴业矿业','中视传媒','康欣新材','嘉诚国际','东华能源','澄天伟业','东南网架','国光电器','TCL集团','盛运环保','天马精化','尚荣医疗','威创股份','如通股份','中颖电子','汇金通','海南高速','通光线缆','博威合金','星网宇达','龙津药业','阳谷华泰','中原特钢','重庆啤酒','大丰实业','莱宝高科','双一科技','创兴资源','网宿科技','酒鬼酒','友讯达','建设机械','清新环境','海航基础','平煤股份','新洋丰','天壕环境','厦门港务','陕西煤业','友阿股份','京蓝科技','隆华节能','精艺股份','东方海洋','恒基达鑫','雅百特','菲达环保','银邦股份','津膜科技','南洋科技','花园生物','索通发展','西部矿业','鹏欣资源','株冶集团','山东金泰','凯美特气','亨通光电','依米康','章源钨业','东凌国际','迪安诊断','大同煤业','中科创达','新经典','合康新能','阳泉煤业','海亮股份','合诚股份','同为股份','恒邦股份','海联金汇','酒钢宏兴','博雅生物','芭田股份','太化股份','雪人股份','北方稀土','贵绳股份','海信科龙','能科股份','四方精创','海特生物','联建光电','恒顺众N','丰乐种业','露笑科技','江山欧派','佳发安泰','永吉股份','蓝焰控股','路通视信','天宇股份','恒锋工具','再升科技','华自科技','大庆华科','世名科技','三夫户外','四维图新','海南橡胶','圣达生物','西藏珠峰','山东钢铁','金运激光','京天利','大烨智能','春风动力','民和股份','中油资本','司太立','开滦股份','万通智控','可立克','露天煤业','三晖电气','马钢股份','东珠景观','金岭矿业','瑞泰科技','华源控股','康德莱','大恒科技','联合光电','本钢板材','普洛药业','金桥信息','特一药业','兖州煤业','中国出版','汇纳科技','赤峰黄金','金能科技','新宙邦','八一钢铁','弘信电子','中国科传','安科瑞','田中精机','意华股份','中富通','时代万恒','登海种业','新坐标','海南瑞泽','中金岭南','辰安科技','必创科技','清源股份','荣丰控股','锦富技术','中电广通','焦作万方','方大特钢','海立股份','华力创通','银都股份','麦迪科技','诚邦股份','湖北宜化','五矿稀土','和科达','千禾味业','山煤国际','惠伦晶体','浙江富润','南钢股份','锌业股份','韦尔股份','洛阳玻璃','江西铜业','煌上煌','同力水泥','真视通','九鼎新材','梅轮电梯','昆百大Ａ','西山煤电','敦煌种业','英科医疗','锡业股份','北化股份','伟明环保','驰宏锌锗','光一科技','鸿博股份','姚记扑克','恒源煤电','维维股份','国农科技','建研院','安阳钢铁','深圳新星','太空板业','祥和实业','盐津铺子','当代明诚','天业通联','冀东装备','欢瑞世纪','贝肯能源','瑞特股份','中海达','三丰智能','杭州解百','韶钢松山','金力泰','星光农机','绿康生化','登云股份','多喜爱','吉大通信','皮阿诺','创源文化','坤彩科技','湘油泵','海峡股份','川大智胜','盛和资源','英派斯','山西焦化','云南铜业','广东骏亚','金海环境','南卫股份','陕西黑猫','飞利信','昊华能源','国盛金控','激智科技','道氏技','术罗牛','万集科技','天山生物','欧比特','邦讯技术','海兰信','辉隆股份','同济科技','强力新材','中孚实业','东信和平','濮阳惠成','潞安环能','东方网力','路畅科技','新钢股份','东方雨虹','中潜股份','神火股份','开立医疗','云铝股份','思美传媒','飞鹿股份','金明精机','海汽集团','纵横通信','精工钢构','*ST华菱','今天国际','和胜股份','上海环境','寿仙谷','川恒股份','新易盛','深中华A','万马科技','苏垦农发','楚江新材','智能自控','汉王科技','科信技术','金银河','华仪电气','福建金森','兴发集团','坚瑞沃能','众源新材','飞天诚信','渤海股份','博天环境','万向德农','兴民智通','东方嘉盛','朗科智能','双林股份','诚迈科技','爱司凯','溢多利','天安新材','凌钢股份','方大炭素','海峡环保','天马科技','富煌钢构','宏辉果蔬','九安医疗','达安股份','华宏科技','华通热力','科大智能','甘肃电投','乐心医疗','英联股份','天域生态','环能科技','联泰环保','新华网','陇神戎','发雪莱','中持股份','畅联股份','雪峰科技','泰嘉股份','西部黄金','厦门钨业','原尚股份','海联讯','蒙草生态','上海洗霸','中环环保','长盛轴承','凯伦股份','英可瑞','永福股份','广哈通信','万隆光电','精研科技','岱勒新材','星云股份','侨源气体','同和药业','新劲刚','宣亚国际','立昂技术','飞荣达','移为通信','奥联电子','贝斯特','恒泰实达','昊志机电','山鼎设计','赛升药业','沃施股份','光力科技','景嘉微','赛摩电气','华铭智能','浩云科技','康斯特','普丽盛','清水源','中泰股份','暴风集团','唐德影视','苏试试验','中光防雷','快乐购','金盾股份','正业科技','科隆股份','腾信股份','三联虹普','斯莱克','易事特','汇金股份','天翔环境','汉鼎宇佑','国瓷材料','汇冠股份','南通锻压','开能环保','佳沃股份','尔康制药','新莱应材','精锻科技','永清环保','元力股份','迪威视讯','通源石油','先锋新材','神雾环保','科融环境','中金环境','星普医科','中环装备','新开源','乐视网','金通灵','银之杰','金利华电','万顺股份','三维丝','钢研高纳','宝通科技','宝德股份','吉峰农机','北陆药业','莱美药业','南风股份','庄园牧场','集泰股份','德生科技','华森制药','卫光生物','传艺科技','英维克','华锋股份','天顺股份','环球印务','瑞尔特','奇信股份','南兴装备','永兴特钢','N兴股份','爱迪尔','万达电影','中矿资源','电光科技','金莱特','友邦吊顶','东易日盛','新宝股份','顾地科技','双成药业','睿康股份','华东重机','猛狮科技','顺威股份','康达新材','德联集团','中泰桥梁','扬子新材','勤上股份','光启技术','亚玛顿','三垒股份','艾格拉斯','大连电瓷','以岭药业','盛通股份','豪迈科技','通达动力','群兴玩具','步森股份','旷达科技','*ST弘高','*ST圣莱','嘉事堂','龙星化工','胜利精密','汉森制药','雅克科技','建研集团','蓝帆医疗','丽鹏股份','千方科技','赫美集团','新纶科技','得利斯','博云新材','宇顺电子','保龄宝','神开股份','陕天然','气大东','德奥通航','兆新股份','江南化工','恒康医','疗特尔','东晶电子','武汉凡谷','利达光电','创新医疗','深圳惠程','印纪传媒','贤丰控股','中环股份','康强电子','威海广泰','三钢闽光','大港股份','沙钢股份','长城影视','*ST众和','黔源电力','霞客环保','凯恩股份','精功科技','宗申动力','皇台酒业','中弘股份','高升控股','*ST河化','*ST建峰','一汽夏利','华北高速','茂业通信','鑫茂科技','神雾节能','银河生物','*ST金宇','泰合健康','通化金马','新能泰山','滨海能源','*ST华泽','建新矿业','恒天海龙','西王食品','万方发展','*ST钒钛','京汉股份','阳光股份','神州易桥','韶能股份','平潭发展','东北电气','广东甘化','神州信息','中天金融','万泽股份','穗恒运Ａ','*ST紫学','*ST烯碳','华塑控股','中润资源','南华生物','海虹控股','*ST沈机','*ST川化','中信海直','康达尔','深大通','中国天楹','神州数码','中粮地产','深深房Ａ','国药一致','深深宝Ａ','全新好','深振业Ａ','国泰集团','克来机电','丽岛新材','博敏电子','金鸿顺','佳力图','东宏股份','龙韵股份','阿科力','德宏股份','晶华新材','今创集团','璞泰来','中曼石油','京华激光','高能环境','地素时尚','振江股份','风语筑','金辰股份','井神股份','泰瑞机器','合盛硅业','兰石重装','上海沪工','泛微网络','天鹅股份','北特科技','出版传媒','中国重工','中国铝业','江南嘉捷','白银有色','海尔施','财通证券','柳钢股份','雷鸣科化','新五丰','中房股份','厦华电子','人民同泰','新华传媒','中航黑豹','重庆百货','文投控股','中船防务','南京新百','东阳光科','奥瑞德','哈药股份','豫园股份','中源协和','天华院','老白干酒','信威集团','百利电气','江山股份','天科股份','宏达股份','兰太实业','亿阳信通','大湖股份','延长化建','云南城投','罗顿发展','美都能源','天坛生物','中国船舶','商赢环球','中葡股份','保千里',];


//行业板块 + 概念板块
// var meta_industry_concept=meta_industry.concat(meta_concept);

//行业板块 + 概念板块 + 涨停板块
var meta_industry_concept_limite=['扭亏','PM2.5','收购','健康中国','锂电池','新能源汽车','网络安全','高送转','雄安新区','人工智能','充电桩','稀土永磁','可燃冰','股权转让','钢铁','军民融合','苹果概念','白酒','无人驾驶','钛白粉','租售同权','军工','区块链','分散染料','央企国资改革','OLED','集成电路','核电','石墨烯','增持','特斯拉','人脸识别','证金持股','上海国资改革','沪港通概念','互联网金融','一带一路','草甘膦','移动支付','证券','通信设备','创投','新材料','乳业','物联网','小金属','文化传媒','化学制品','期货概念','风电','万达私有化','农村电商','计算机应用','网络游戏','医疗器械','基因测序','车联网','房地产开发','举牌','央企改革','芯片','预盈','医药','预增','盈利','盈利降','并购重组','资金流入','TDI涨价','复牌补涨','业绩预增','季增','季降','券商板块','影视传媒','小金属钴','实控人变更','纯碱涨价','针状焦','ST板块','混改','机器人','转让','退市风险解除','证金增持','央企重组','金属锌','净利预增','钢铁限产','有色板块','央企混改','业绩扭亏为盈','装配式建筑','业绩扭亏','质押','抗癌新药','解除质押','联通混改','养老金持股','增强现实','保险板块','周期股','无人零售','化工产品涨价','创业板指标','传媒板块','氨纶','乙二醇','实近人变更','共有产权住房','中标联通项目','买入评级','土壤修复','流感','机构调研','ADC发泡剂','猪肉涨价','业绩转好','维生素涨价','铁矿石','废钢业务','碳酸锂','更名','耐火材料','游戏产业','大阅兵','业绩增长','中标','钒涨价','萤石','银行板块','央企合并预期','体育概念','业绩暴增','环保','上海国企改革','房屋租赁','碳酸二甲脂','减持','业绩向好','养老金','水泥涨价','净利增','配股','高送转填权','涨价','环保装备制造','有色金属','硅晶圆','PVC','产品涨价','锂辉石涨价','增持计划','旅游','业绩大增','要约收购','改名','实控人变更预期','央企合并','天津国资改革','雄安','雄安地热','稀土','挖掘机','金属镁','设立投资基金','借壳','液氧','新疆基建','硅锰','磁悬浮技术','云服务','创业板指标股','抗艾滋','新能源电动车','三季度','老庄股','逆势上涨','新零售','语音控制','利空出尽','看好','高送转预期','合同中标','重组调整','煤炭','机构买入','多晶硅','地方国企改革','智能交通','牛散进入','二孩概念','并购重组预期','环氧丙烷','LED','实控人重组','信息安全','疑似国家队持股','汇金持股','股份回购','净利降','半导体','金砖会议','战略合作协议','蹭雄安新区','中科系','增持评级','底部放量','终止重组','收购公司','钴涨价','钢铁板块','回购','资产重组','签订合同','预亏','煤炭板块','国企混改','创业板反弹','预焙阳极','业绩增','出售资产','硅铁价格上涨','低市盈率','订单回升','氢燃料电池','股东增持','磷矿','烧碱','厦门自贸区','庄股反弹','建军','深圳本地股','硫酸镍','钡涨价','钨涨价','资金控盘','与联通合作','自由贸易港','疑似庄股','雄安装配式建筑','老妖股','宫颈癌疫苗','芯片概念','股份联动','工业互联网','业绩降','燃料乙醇','电解铝','电气设备','通用设备','专用设备','建筑装饰','汽车零部件','传媒','化学制药','半导体及元件','有色冶炼加工','家用轻工','化工合成材料','零售','中药','建筑材料','服装家纺','光学光电子','医疗器械服务','食品加工制造','电子制造','其他电子','电力','生物制品','白色家电','计算机设备','通信服务','纺织制造','国防军工','物流','环保工程','包装印刷','基础化学','农产品加工','饮料制造','煤炭开采','燃气水务','仪器仪表','港口航运','银行','养殖业','贸易','景点及旅游','造纸','综合','公路铁路运输','医药商业','种植业与林业','采掘服务','非汽车交运','化工新材料','保险及其他','汽车整车','园区开发','机场航运','农业服务','视听器材','交运设备服务','公交','石油矿业开采','酒店及餐饮','融资融券','转融券标的','深港通','新股与次新股','MSCI概念','互联网+','电子商务','工业','新能源','机器人概念','参股新三板','新材料概念','节能环保','电子信息','PPP概念','O2O','参股券商','光伏概念','大数据','虚拟现实','智能电网','智慧城市','移动互联网','参股保险','高端装备','智能穿戴','阿里巴巴概念','云计算','金改','参股民营银行','生物医药','节能照明','污水处理','振兴东北','手机游戏','白马股','智能家居','安防','太阳能','汽车电子','医疗改革','在线教育','天然气','智能医疗','稀缺资源','迪士尼','高铁','家用电器','二胎概念','煤化工','新三板','职业教育','卫星导航','无人机','上海自贸区','美丽中国','京津冀一体化','中字头股票','风能','大飞机','黄金','土地流转','摘帽','电力改革','国产软件','债转股','电子竞技','蓝宝石','页岩气','体育产业','固废处理','能源互联网','跨境电商','养老概念','芯片替代','供应链金融','粤港澳概念','民营医院','建筑节能','新疆振兴','医药电商','P','马云概念','生态农业','通用航空','油品改革','猪肉','特高压','足球概念','重组获通过','宽带中国','水利','金融IC','特钢','海工装备','蚂蚁金服概念','农业现代化','深圳国资改革','高校','禽流感','脱硫脱硝','食品安全','量子通信','地下管网','微信小程序','王者荣耀','物流电商平台','尾气治理','冷链物流','生物质能','网约车','共享单车','东盟自贸区','互联网彩票','消费金融','农机','油品升级','中韩自贸区','超导','氟化工','天津自贸区','特色小镇','航运','碳纤维','二维码识别','广东自贸区','两桶油改革','在线旅游','杭州亚运会','西安自贸区','福建自贸区','电子发票',];


let workday=['2017-11-01', '2017-11-02', '2017-11-03', '2017-11-06', '2017-11-07', '2017-11-08', '2017-11-09', '2017-11-10', '2017-11-12','2017-11-13', '2017-11-14', '2017-11-15', '2017-11-16', '2017-11-17', '2017-11-20', '2017-11-21', '2017-11-22', '2017-11-23', '2017-11-24', '2017-11-27', '2017-11-28', '2017-11-29', '2017-11-30', '2017-12-01', '2017-12-04', '2017-12-05', '2017-12-06', '2017-12-07', '2017-12-08', '2017-12-11', '2017-12-12', '2017-12-13', '2017-12-14', '2017-12-15', '2017-12-18', '2017-12-19', '2017-12-20', '2017-12-21', '2017-12-22', '2017-12-25', '2017-12-26', '2017-12-27', '2017-12-28', '2017-12-29'];



exports.meta_industry_concept_limite=meta_industry_concept_limite;
exports.meta_stock=meta_stock;
exports.workday=workday;
