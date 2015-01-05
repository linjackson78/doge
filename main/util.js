define([], function() {
	return {
		saveData: function(key, value) {
			localStorage.setItem(key, JSON.stringify(value))
		},

		getData: function(key) {
			return JSON.parse(localStorage.getItem(key))
		},

		deleteData: function(key) {
			localStorage.removeItem(key)
		},
		//这个joinURL常用，所以放util里，不过考虑到涉及网络的内容，可能放client里更好？
		joinURL: function(settings) {
			var defaultSettings = {
				"host": "http://www.oschina.net",
				"path": "/",
				"dataType": "jsonp",
				"client_id": "DdorykETWSiMXwQrGT1U",
				"client_secret": "B4WCJ9KQ5HRDG8MeNHsFego2w7wHWCGb",
				"redirect_uri": "http://localhost:3000/main/index.html",
				"access_token": this.getData("client") ? this.getData("client").access_token : "",
			}
			settings = settings ? settings : {};
			var finalSettings = _.extend(defaultSettings, settings);
			var result = "";
			result = finalSettings["host"] + finalSettings["path"] + "?"
				//由于for...in...遍历对象没有顺序，而host和path必须排前面，所以上一句将这两个东西单独先拿出来组装
			for (var key in finalSettings) {
				if (key != "host" && key != "path") {
					result = result + key + "=" + finalSettings[key] + "&"
				}
			}
			return result;
		},

		isLogin: function() {
			//先从localstorage里有没有client这个东西判断有没登陆
			if (!this.getData("client")) {
				return false;
				//有client，说明有access_token，但必须保证没过期，所以下面判断有没过期	
			} else {
				var result = this.getData("client").expires_time > Date.now() ? true : false;
				if (!result) this.deleteData("client");
				return result;
			}
		},

		//下面都是假数据
		fakeNewsListJSON: {
			"newslist": [{
				"id": 57925,
				"author": "oschina",
				"pubDate": "2014-12-15 07:11:04",
				"title": "Point Linux 3.0 Beta 3 发布",
				"authorid": 1,
				"commentCount": 3,
				"type": 4
			}, {
				"id": 57924,
				"author": "oschina",
				"pubDate": "2014-12-15 07:11:04",
				"title": "是不是 Android？ YunOS 3.0 体验评测",
				"authorid": 1,
				"commentCount": 38,
				"type": 4
			}, {
				"id": 57923,
				"author": "开源中国真理部部长",
				"pubDate": "2014-12-15 07:10:30",
				"title": "CotEditor 2.0.3 释出，OS X 下轻量级代码编辑器",
				"authorid": 699222,
				"commentCount": 5,
				"type": 4
			}, {
				"id": 57922,
				"author": "oschina",
				"pubDate": "2014-12-15 07:07:13",
				"title": "放弃微软，福特车载系统选择 QNX 平台",
				"authorid": 1,
				"commentCount": 8,
				"type": 4
			}, {
				"id": 57921,
				"author": "oschina",
				"pubDate": "2014-12-15 07:03:05",
				"title": "你患上开发者渐冻症了吗？",
				"authorid": 1,
				"commentCount": 25,
				"type": 4
			}, {
				"id": 57920,
				"author": "oschina",
				"pubDate": "2014-12-15 06:59:43",
				"title": "为什么说微软开源 .Net 也拼不过 Java？",
				"authorid": 1,
				"commentCount": 38,
				"type": 4
			}, {
				"id": 57919,
				"author": "oschina",
				"pubDate": "2014-12-15 06:56:55",
				"title": "Bonobo Git Server 3.4.3 发布",
				"authorid": 1,
				"commentCount": 0,
				"type": 4
			}, {
				"id": 57918,
				"author": "oschina",
				"pubDate": "2014-12-15 06:56:01",
				"title": "systemd 218 发布，Linux 的 init 程序",
				"authorid": 1,
				"commentCount": 5,
				"type": 4
			}, {
				"id": 57917,
				"author": "oschina",
				"pubDate": "2014-12-15 06:53:52",
				"title": "C3.js 0.4.8 发布，开源图表库",
				"authorid": 1,
				"commentCount": 0,
				"type": 4
			}, {
				"id": 57916,
				"author": "oschina",
				"pubDate": "2014-12-15 06:50:15",
				"title": "FST 2.18 发布，Java 快速序列化库",
				"authorid": 1,
				"commentCount": 2,
				"type": 4
			}, {
				"id": 57915,
				"author": "oschina",
				"pubDate": "2014-12-15 06:47:49",
				"title": "When.js 3.6.4 发布，Promises/A 和 when() 实现",
				"authorid": 1,
				"commentCount": 0,
				"type": 4
			}, {
				"id": 57914,
				"author": "oschina",
				"pubDate": "2014-12-15 06:44:34",
				"title": "Linux Kernel 3.2.65 发布",
				"authorid": 1,
				"commentCount": 1,
				"type": 4
			}, {
				"id": 57913,
				"author": "Miyanaga",
				"pubDate": "2014-12-14 20:52:28",
				"title": "Kreogist Mu 0.4 正式版发布，跨平台音乐管理中心",
				"authorid": 1169420,
				"commentCount": 34,
				"type": 4
			}, {
				"id": 57912,
				"author": "滔哥",
				"pubDate": "2014-12-14 10:58:37",
				"title": "9 个 GIF 动画阐述 Web 设计的 25 年历史",
				"authorid": 1164691,
				"commentCount": 18,
				"type": 4
			}, {
				"id": 57911,
				"author": "无闻",
				"pubDate": "2014-12-14 10:08:54",
				"title": "Gogs v0.5.9 发布，Go 写的自助 Git 托管服务",
				"authorid": 852826,
				"commentCount": 13,
				"type": 4
			}],
			"notice": {
				"replyCount": 0,
				"msgCount": 0,
				"fansCount": 0,
				"referCount": 0
			}
		},

		fakeNewsDetailJSON: {
			"id": 57925,
			"body": "<style type='text/css'>pre {white-space:pre-wrap;word-wrap:break-word;}</style><p>Point Linux 3.0 Beta 3 发布，<span>此版本最主要的特性是包括最新的 GNOME 3.14 版本，将会与现有的 MATE 桌面配合的很好。Point Linux GNOME 版本包括两种套件，一种是完全包括所有功能，开箱即用的桌面；一种是核心，只包含基础和自由组件。Point Linux GNOME 引入了 GNOME 'Classic'模式，包括全新的黑色面板主题，专为 GNOME 2 的粉丝而准备。</span>此版本还有很多 bug 修复和改进，更多内容请看 <a target=\"_blank\" href=\"http://wiki.pointlinux.org/index.php?title=Point_Linux_MATE_3.0b3_Release_Notes\" rel=\"nofollow\">MATE edition</a> 和 <a target=\"_blank\" href=\"http://wiki.pointlinux.org/index.php?title=Point_Linux_GNOME_3.0b3_Release_Notes\" rel=\"nofollow\">GNOME variant</a>。<a href=\"http://pointlinux.org/download.html?version=3.0b3\" rel=\"nofollow\">Download</a>: <a href=\"http://mirror.yandex.ru/mirrors/point/releases/pointlinux-mate-full-3.0b3-64.iso\" rel=\"nofollow\">pointlinux-mate-full-3.0b3-64.iso</a> (1,118MB, <a href=\"http://mirror.yandex.ru/mirrors/point/releases/pointlinux-mate-full-3.0b3-64.iso.md5\" rel=\"nofollow\">MD5</a>, <a href=\"http://mirror.yandex.ru/mirrors/point/releases/pointlinux-mate-full-3.0b3-64.iso.torrent\" rel=\"nofollow\">torrent</a>), <a href=\"http://www.gtlib.gatech.edu/pub/pointlinux-releases/pointlinux-gnome-full-3.0b3-64.iso\" rel=\"nofollow\">pointlinux-gnome-full-3.0b3-64.iso</a> (1,119MB, <a href=\"http://www.gtlib.gatech.edu/pub/pointlinux-releases/pointlinux-gnome-full-3.0b3-64.iso.md5\" rel=\"nofollow\">MD5</a>, <a href=\"http://www.gtlib.gatech.edu/pub/pointlinux-releases/pointlinux-gnome-full-3.0b3-64.iso.torrent\" rel=\"nofollow\">torrent</a>)。</p> \n<p>via <a target=\"_blank\" href=\"http://distrowatch.com/?newsid=08737\" rel=\"nofollow\">distrowatch.com</a></p> \n<p>Point Linux是一份GNU/Linux发行，它旨在结合Debian GNU/Linux的力量和MATE所提供的效率，而后者是GNOME 2桌面环境的一个分支。Point Linux为需要快捷、稳定和可预知桌面的用户们提供易于安装和使用的发行。</p> \n<p><img src=\"http://static.oschina.net/uploads/img/201310/07163357_So2n.png\" alt=\"\"></p>",
			"pubDate": "2014-12-15 07:11:04",
			"author": "oschina",
			"title": "Point Linux 3.0 Beta 3 发布",
			"authorid": 1,
			"relativies": [{
				"title": "是不是 Android？ YunOS 3.0 体验评测",
				"url": "http://www.oschina.net/news/57924/yunos-3-0"
			}, {
				"title": "Snort 3.0 Alpha 发布，CISCO 已经完全重写过",
				"url": "http://www.oschina.net/news/57890/cisco-releases-alpha-version-snort-30"
			}, {
				"title": "Django REST Framework 3.0 发布",
				"url": "http://www.oschina.net/news/57528/django-rest-framework-3-0"
			}, {
				"title": "OpenBSD 现已支持 USB 3.0 ",
				"url": "http://www.oschina.net/news/57002/openbsd-gets-usb-3-0-support"
			}, {
				"title": "NUnit 3.0 Alpha 2 发布，.NET 单元测试",
				"url": "http://www.oschina.net/news/56708/nunit-3-0-alpha2"
			}, {
				"title": "RavenDB 3.0 新特性：索引后端 ",
				"url": "http://www.oschina.net/translate/what-new-ravendb-30-indexing"
			}, {
				"title": "Couchbase Server 3.0 发布，NoSQL 数据库",
				"url": "http://www.oschina.net/news/55911/couchbase-server-3-0"
			}, {
				"title": "中兴新系统 MiFavor UI 3.0 来了",
				"url": "http://www.oschina.net/news/55673/mifavor-ui-3-0"
			}, {
				"title": "Glide 3.0 发布，Android 的媒体管理库",
				"url": "http://www.oschina.net/news/54947/glide-3-0-released"
			}, {
				"title": "OpenCV 3.0 Alpha 发布，计算机视觉库",
				"url": "http://www.oschina.net/news/54654/opencv-3-0-alpha"
			}],
			"notice": {
				"replyCount": 0,
				"msgCount": 0,
				"fansCount": 0,
				"referCount": 0
			},
			"favorite": 0,
			"commentCount": 3,
			"url": "http://www.oschina.net/news/57925/point-linux-3-0-beta-3"
		},

		fakeCommentsListJSON: {
			"notice": {
				"replyCount": 0,
				"msgCount": 0,
				"fansCount": 0,
				"referCount": 0
			},
			"commentList": [{
				"content": "<div class='detail'>支持<a href='http://my.oschina.net/focus' class='referer' target='_blank'>@ZeroOne</a> ，sb太多，懒得指名 </div>",
				"id": 283713299,
				"pubDate": "2014-12-14 22:14:57",
				"client_type": 5,
				"commentPortrait": "http://static.oschina.net/uploads/user/283/566080_50.jpg?t=1402472324000",
				"commentAuthor": "Ely",
				"commentAuthorId": 566080,
				"refers": []
			}, {
				"content": "<div class='detail'>支持微软打击盗版</div>",
				"id": 283707228,
				"pubDate": "2014-12-14 13:49:02",
				"client_type": 0,
				"commentPortrait": "http://www.oschina.net/img/portrait.gif",
				"commentAuthor": "wxwpxh",
				"commentAuthorId": 2245781,
				"refers": []
			}, {
				"content": "<div class='detail'>咱干这行的，你搞个东西都让盗版了，不是个办法</div>",
				"id": 283687364,
				"pubDate": "2014-12-13 10:13:44",
				"client_type": 0,
				"commentPortrait": "http://www.oschina.net/img/portrait.gif",
				"commentAuthor": "langwang01",
				"commentAuthorId": 1861228,
				"refers": []
			}, {
				"content": "<div class='detail'>果断看出，网络无安全可言，只要人家有足够的理由，你的一切都可能成为证据</div>",
				"id": 283678902,
				"pubDate": "2014-12-12 22:28:34",
				"client_type": 0,
				"commentPortrait": "http://static.oschina.net/uploads/user/695/1391464_50.jpg?t=1418094405000",
				"commentAuthor": "Move_yao",
				"commentAuthorId": 1391464,
				"refers": []
			}, {
				"content": "<div class='detail'>倒闭不倒闭,无所谓.事物总是发展的.</div>",
				"id": 283678197,
				"pubDate": "2014-12-12 21:29:49",
				"client_type": 0,
				"commentPortrait": "http://static.oschina.net/uploads/user/128/256033_50.jpg?t=1350466132000",
				"commentAuthor": "梁金堂",
				"commentAuthorId": 256033,
				"refers": []
			}, {
				"content": "<div class='detail'>告诉大家一个比微软小冰牛的免费平台，图灵机器人</div>",
				"id": 283672802,
				"pubDate": "2014-12-12 14:00:14",
				"client_type": 0,
				"commentPortrait": "",
				"commentAuthor": "",
				"commentAuthorId": "",
				"refers": []
			}, {
				"content": "+1024，每天安卓手机加ipad几乎完成了所有娱乐，除PC游戏，在Linux一样不觉得别扭，要是玩网页游戏的话 那真没什么不习惯。Linux下的输入法比mac的好找多了。",
				"id": 283668773,
				"pubDate": "2014-12-12 08:24:26",
				"client_type": 3,
				"commentPortrait": "http://static.oschina.net/uploads/user/12/25626_50.jpg",
				"commentAuthor": "sindtoto",
				"commentAuthorId": 25626,
				"refers": [{
					"refertitle": "引用来自“wxwpxh”的评论",
					"referbody": "不用微软很多年了"
				}]
			}, {
				"content": "<div class='detail'>不用微软很多年了</div>",
				"id": 283660269,
				"pubDate": "2014-12-11 20:35:48",
				"client_type": 0,
				"commentPortrait": "http://www.oschina.net/img/portrait.gif",
				"commentAuthor": "wxwpxh",
				"commentAuthorId": 2245781,
				"refers": []
			}, {
				"content": "问题是用从小用linux的你能用淘宝天猫？能用网银？就交学费一条，除非你是去银行排队，否则就真离不开windows。",
				"id": 283658121,
				"pubDate": "2014-12-11 17:36:45",
				"client_type": 0,
				"commentPortrait": "http://static.oschina.net/uploads/user/406/813226_50.jpg?t=1394529156000",
				"commentAuthor": "火炫",
				"commentAuthorId": 813226,
				"refers": [{
					"refertitle": "引用来自“ZeroOne”的评论",
					"referbody": "这些用着windows盗版的傻逼们想微软倒闭几个意思？"
				}, {
					"refertitle": "引用来自“Pagination”的评论",
					"referbody": "个人看法，微软统治了桌面端，让我们没办法切换到Linux下。Linux没有想象的那么好，windows也没有那么差，只是不自由，黑他正常。"
				}, {
					"refertitle": "引用来自“万岁爷”的评论",
					"referbody": "不明白二楼的说法, 让我们没办法? 是谁们没办法? 你自己可以用linux的啊, 微软没有强迫你用windows... linux已经可以兼容微软的很多文档了, 基本上除了游戏之外其他的应用都有替代品了."
				}]
			}, {
				"content": "公司用Windows, 用MS office，回到家要處理工作，想完全兼容還能用Linux嗎？公司用甚麼，能由得員工決定嗎？",
				"id": 283652687,
				"pubDate": "2014-12-11 10:03:57",
				"client_type": 0,
				"commentPortrait": "",
				"commentAuthor": "",
				"commentAuthorId": "",
				"refers": [{
					"refertitle": "引用来自“ZeroOne”的评论",
					"referbody": "这些用着windows盗版的傻逼们想微软倒闭几个意思？"
				}, {
					"refertitle": "引用来自“Pagination”的评论",
					"referbody": "个人看法，微软统治了桌面端，让我们没办法切换到Linux下。Linux没有想象的那么好，windows也没有那么差，只是不自由，黑他正常。"
				}, {
					"refertitle": "引用来自“万岁爷”的评论",
					"referbody": "不明白二楼的说法, 让我们没办法? 是谁们没办法? 你自己可以用linux的啊, 微软没有强迫你用windows... linux已经可以兼容微软的很多文档了, 基本上除了游戏之外其他的应用都有替代品了."
				}]
			}, {
				"content": "猪一样的思维，猪一样的逻辑。",
				"id": 283651571,
				"pubDate": "2014-12-11 08:30:58",
				"client_type": 0,
				"commentPortrait": "http://static.oschina.net/uploads/user/290/580695_50.jpg?t=1405932882000",
				"commentAuthor": "loki_lan",
				"commentAuthorId": 580695,
				"refers": [{
					"refertitle": "引用来自“妈她亲我”的评论",
					"referbody": "sb，中国有10几亿盗版用户，来抓吧"
				}, {
					"refertitle": "引用来自“loki_lan”的评论",
					"referbody": "说的好像盗版还是一件值得炫耀的事情一样"
				}, {
					"refertitle": "引用来自“妈她亲我”的评论",
					"referbody": "哈哈, 二楼说的很好啊. 中国人不懂感恩的太多了. 没有微软的操作系统, 个人电脑不会发展的这么快. 更不会有一楼这样的人出来上网骂大街秀下限..."
				}, {
					"refertitle": "引用来自“loki_lan”的评论",
					"referbody": "我觉得没有微软，个人电脑一样会发展的很快。"
				}, {
					"refertitle": "引用来自“妈她亲我”的评论",
					"referbody": "没有微软和盗版? 指望很多人从实验室的unix终端命令行开始学电脑? 你能肯定这种电脑有人喜欢用?发展很快? 如果你敢这么说, 那么可以肯定你没有用过微软之外的操作系统..."
				}, {
					"refertitle": "引用来自“ZeroOne”的评论",
					"referbody": "你别瞎激动，linux要做ui，绝不比windows差，况且windows还不就是从DOS时代转变过来的嘛。"
				}, {
					"refertitle": "引用来自“loki_lan”的评论",
					"referbody": "没人激动... 如果你想用linux说事的话, 那么请看一下linux发展的年表, 看看个人电脑普及和发展最快的时代是不是linux的功劳.有没有这种可能性. 谢谢."
				}, {
					"refertitle": "引用来自“ZeroOne”的评论",
					"referbody": "个人电脑的发展不是微软的功劳，是市场需求的功劳，当年没有微软，一样有其他类微软的公司做这事情，有钱赚就有人上，微软只不过是下手比较快的一个而已，没有你说的那么没他世界就不转了似的。"
				}, {
					"refertitle": "引用来自“loki_lan”的评论",
					"referbody": "历史不容假设, 不看过程只看结果, 现在的现实就是微软造就了个人电脑的大发展. 不管你怎么说什么别的公司什么的都很苍白的. 如果你说下手快, 苹果比微软起步还要早为啥不如微软成功? 请理智思考问题,谢谢."
				}, {
					"refertitle": "引用来自“ZeroOne”的评论",
					"referbody": "linux要做UI绝对不比windows差，搞笑。"
				}, {
					"refertitle": "引用来自“loki_lan”的评论",
					"referbody": "搞不搞笑我不知道，至少我觉得mac证明了这一点"
				}, {
					"refertitle": "引用来自“ZeroOne”的评论",
					"referbody": "这种说法就好比一个穷屌对大家说：我是没学计算机，我要是学计算机了绝逼能超过比尔盖茨。"
				}, {
					"refertitle": "引用来自“Feng_Yu”的评论",
					"referbody": "你这种说法就好比一个弱屌对大家说：别人性无能，我一定也是性无能。"
				}, {
					"refertitle": "引用来自“斯诺登”的评论",
					"referbody": "神一样的思维，猪一样的逻辑。"
				}]
			}, {
				"content": "神一样的思维，猪一样的逻辑。",
				"id": 283651502,
				"pubDate": "2014-12-11 08:25:10",
				"client_type": 0,
				"commentPortrait": "http://static.oschina.net/uploads/user/496/993026_50.jpg?t=1372169910000",
				"commentAuthor": "妈她亲我",
				"commentAuthorId": 993026,
				"refers": [{
					"refertitle": "引用来自“loki_lan”的评论",
					"referbody": "sb，中国有10几亿盗版用户，来抓吧"
				}, {
					"refertitle": "引用来自“妈她亲我”的评论",
					"referbody": "说的好像盗版还是一件值得炫耀的事情一样"
				}, {
					"refertitle": "引用来自“loki_lan”的评论",
					"referbody": "哈哈, 二楼说的很好啊. 中国人不懂感恩的太多了. 没有微软的操作系统, 个人电脑不会发展的这么快. 更不会有一楼这样的人出来上网骂大街秀下限..."
				}, {
					"refertitle": "引用来自“妈她亲我”的评论",
					"referbody": "我觉得没有微软，个人电脑一样会发展的很快。"
				}, {
					"refertitle": "引用来自“ZeroOne”的评论",
					"referbody": "没有微软和盗版? 指望很多人从实验室的unix终端命令行开始学电脑? 你能肯定这种电脑有人喜欢用?发展很快? 如果你敢这么说, 那么可以肯定你没有用过微软之外的操作系统..."
				}, {
					"refertitle": "引用来自“loki_lan”的评论",
					"referbody": "你别瞎激动，linux要做ui，绝不比windows差，况且windows还不就是从DOS时代转变过来的嘛。"
				}, {
					"refertitle": "引用来自“ZeroOne”的评论",
					"referbody": "没人激动... 如果你想用linux说事的话, 那么请看一下linux发展的年表, 看看个人电脑普及和发展最快的时代是不是linux的功劳.有没有这种可能性. 谢谢."
				}, {
					"refertitle": "引用来自“loki_lan”的评论",
					"referbody": "个人电脑的发展不是微软的功劳，是市场需求的功劳，当年没有微软，一样有其他类微软的公司做这事情，有钱赚就有人上，微软只不过是下手比较快的一个而已，没有你说的那么没他世界就不转了似的。"
				}, {
					"refertitle": "引用来自“ZeroOne”的评论",
					"referbody": "历史不容假设, 不看过程只看结果, 现在的现实就是微软造就了个人电脑的大发展. 不管你怎么说什么别的公司什么的都很苍白的. 如果你说下手快, 苹果比微软起步还要早为啥不如微软成功? 请理智思考问题,谢谢."
				}, {
					"refertitle": "引用来自“loki_lan”的评论",
					"referbody": "linux要做UI绝对不比windows差，搞笑。"
				}, {
					"refertitle": "引用来自“ZeroOne”的评论",
					"referbody": "搞不搞笑我不知道，至少我觉得mac证明了这一点"
				}, {
					"refertitle": "引用来自“Feng_Yu”的评论",
					"referbody": "这种说法就好比一个穷屌对大家说：我是没学计算机，我要是学计算机了绝逼能超过比尔盖茨。"
				}, {
					"refertitle": "引用来自“斯诺登”的评论",
					"referbody": "你这种说法就好比一个弱屌对大家说：别人性无能，我一定也是性无能。"
				}]
			}, {
				"content": "你这种说法就好比一个弱屌对大家说：别人性无能，我一定也是性无能。",
				"id": 283651147,
				"pubDate": "2014-12-11 07:55:39",
				"client_type": 0,
				"commentPortrait": "http://static.oschina.net/uploads/user/290/580695_50.jpg?t=1405932882000",
				"commentAuthor": "loki_lan",
				"commentAuthorId": 580695,
				"refers": [{
					"refertitle": "引用来自“妈她亲我”的评论",
					"referbody": "sb，中国有10几亿盗版用户，来抓吧"
				}, {
					"refertitle": "引用来自“loki_lan”的评论",
					"referbody": "说的好像盗版还是一件值得炫耀的事情一样"
				}, {
					"refertitle": "引用来自“妈她亲我”的评论",
					"referbody": "哈哈, 二楼说的很好啊. 中国人不懂感恩的太多了. 没有微软的操作系统, 个人电脑不会发展的这么快. 更不会有一楼这样的人出来上网骂大街秀下限..."
				}, {
					"refertitle": "引用来自“ZeroOne”的评论",
					"referbody": "我觉得没有微软，个人电脑一样会发展的很快。"
				}, {
					"refertitle": "引用来自“loki_lan”的评论",
					"referbody": "没有微软和盗版? 指望很多人从实验室的unix终端命令行开始学电脑? 你能肯定这种电脑有人喜欢用?发展很快? 如果你敢这么说, 那么可以肯定你没有用过微软之外的操作系统..."
				}, {
					"refertitle": "引用来自“ZeroOne”的评论",
					"referbody": "你别瞎激动，linux要做ui，绝不比windows差，况且windows还不就是从DOS时代转变过来的嘛。"
				}, {
					"refertitle": "引用来自“loki_lan”的评论",
					"referbody": "没人激动... 如果你想用linux说事的话, 那么请看一下linux发展的年表, 看看个人电脑普及和发展最快的时代是不是linux的功劳.有没有这种可能性. 谢谢."
				}, {
					"refertitle": "引用来自“ZeroOne”的评论",
					"referbody": "个人电脑的发展不是微软的功劳，是市场需求的功劳，当年没有微软，一样有其他类微软的公司做这事情，有钱赚就有人上，微软只不过是下手比较快的一个而已，没有你说的那么没他世界就不转了似的。"
				}, {
					"refertitle": "引用来自“loki_lan”的评论",
					"referbody": "历史不容假设, 不看过程只看结果, 现在的现实就是微软造就了个人电脑的大发展. 不管你怎么说什么别的公司什么的都很苍白的. 如果你说下手快, 苹果比微软起步还要早为啥不如微软成功? 请理智思考问题,谢谢."
				}, {
					"refertitle": "引用来自“ZeroOne”的评论",
					"referbody": "linux要做UI绝对不比windows差，搞笑。"
				}, {
					"refertitle": "引用来自“Feng_Yu”的评论",
					"referbody": "搞不搞笑我不知道，至少我觉得mac证明了这一点"
				}, {
					"refertitle": "引用来自“斯诺登”的评论",
					"referbody": "这种说法就好比一个穷屌对大家说：我是没学计算机，我要是学计算机了绝逼能超过比尔盖茨。"
				}]
			}, {
				"content": "只要捉你就OK了，你一辈子都赔不起，洗干净菊花准备捡肥皂吧",
				"id": 283645633,
				"pubDate": "2014-12-11 00:16:08",
				"client_type": 0,
				"commentPortrait": "http://static.oschina.net/uploads/user/134/269399_50.jpg?t=1407273834000",
				"commentAuthor": "冰雪情缘l",
				"commentAuthorId": 269399,
				"refers": [{
					"refertitle": "引用来自“斯诺登”的评论",
					"referbody": "sb，中国有10几亿盗版用户，来抓吧"
				}]
			}, {
				"content": "<div class='detail'>文明上网，理性发言哈，</div>",
				"id": 283644926,
				"pubDate": "2014-12-10 23:17:13",
				"client_type": 0,
				"commentPortrait": "http://static.oschina.net/uploads/user/465/930985_50.jpg?t=1411959667000",
				"commentAuthor": "013",
				"commentAuthorId": 930985,
				"refers": []
			}, {
				"content": "<div class='detail'>兄弟们，咱的一举一动都在他们的监控下</div>",
				"id": 283643424,
				"pubDate": "2014-12-10 21:12:00",
				"client_type": 3,
				"commentPortrait": "http://static.oschina.net/uploads/user/57/114991_50.jpeg?t=1373581024000",
				"commentAuthor": "嫂来哇",
				"commentAuthorId": 114991,
				"refers": []
			}, {
				"content": "<div class='detail'>当人们都尝试开始用Linux，那么市场就改变了，看看服务器市场就明白了，win的服务器有占几成？ </div>",
				"id": 283642917,
				"pubDate": "2014-12-10 20:29:48",
				"client_type": 3,
				"commentPortrait": "http://static.oschina.net/uploads/user/12/25626_50.jpg",
				"commentAuthor": "sindtoto",
				"commentAuthorId": 25626,
				"refers": []
			}, {
				"content": "这种说法就好比一个穷屌对大家说：我是没学计算机，我要是学计算机了绝逼能超过比尔盖茨。",
				"id": 283642864,
				"pubDate": "2014-12-10 20:25:24",
				"client_type": 0,
				"commentPortrait": "http://static.oschina.net/uploads/user/496/993026_50.jpg?t=1372169910000",
				"commentAuthor": "妈她亲我",
				"commentAuthorId": 993026,
				"refers": [{
					"refertitle": "引用来自“loki_lan”的评论",
					"referbody": "sb，中国有10几亿盗版用户，来抓吧"
				}, {
					"refertitle": "引用来自“妈她亲我”的评论",
					"referbody": "说的好像盗版还是一件值得炫耀的事情一样"
				}, {
					"refertitle": "引用来自“ZeroOne”的评论",
					"referbody": "哈哈, 二楼说的很好啊. 中国人不懂感恩的太多了. 没有微软的操作系统, 个人电脑不会发展的这么快. 更不会有一楼这样的人出来上网骂大街秀下限..."
				}, {
					"refertitle": "引用来自“loki_lan”的评论",
					"referbody": "我觉得没有微软，个人电脑一样会发展的很快。"
				}, {
					"refertitle": "引用来自“ZeroOne”的评论",
					"referbody": "没有微软和盗版? 指望很多人从实验室的unix终端命令行开始学电脑? 你能肯定这种电脑有人喜欢用?发展很快? 如果你敢这么说, 那么可以肯定你没有用过微软之外的操作系统..."
				}, {
					"refertitle": "引用来自“loki_lan”的评论",
					"referbody": "你别瞎激动，linux要做ui，绝不比windows差，况且windows还不就是从DOS时代转变过来的嘛。"
				}, {
					"refertitle": "引用来自“ZeroOne”的评论",
					"referbody": "没人激动... 如果你想用linux说事的话, 那么请看一下linux发展的年表, 看看个人电脑普及和发展最快的时代是不是linux的功劳.有没有这种可能性. 谢谢."
				}, {
					"refertitle": "引用来自“loki_lan”的评论",
					"referbody": "个人电脑的发展不是微软的功劳，是市场需求的功劳，当年没有微软，一样有其他类微软的公司做这事情，有钱赚就有人上，微软只不过是下手比较快的一个而已，没有你说的那么没他世界就不转了似的。"
				}, {
					"refertitle": "引用来自“ZeroOne”的评论",
					"referbody": "历史不容假设, 不看过程只看结果, 现在的现实就是微软造就了个人电脑的大发展. 不管你怎么说什么别的公司什么的都很苍白的. 如果你说下手快, 苹果比微软起步还要早为啥不如微软成功? 请理智思考问题,谢谢."
				}, {
					"refertitle": "引用来自“Feng_Yu”的评论",
					"referbody": "linux要做UI绝对不比windows差，搞笑。"
				}, {
					"refertitle": "引用来自“斯诺登”的评论",
					"referbody": "搞不搞笑我不知道，至少我觉得mac证明了这一点"
				}]
			}, {
				"content": "<div class='detail'>深度系统还不错</div>",
				"id": 283642751,
				"pubDate": "2014-12-10 20:15:57",
				"client_type": 0,
				"commentPortrait": "http://static.oschina.net/uploads/user/59/118890_50.jpg?t=1402231617000",
				"commentAuthor": "人生想绕几个圈",
				"commentAuthorId": 118890,
				"refers": []
			}, {
				"content": "白日做梦",
				"id": 283642740,
				"pubDate": "2014-12-10 20:15:01",
				"client_type": 0,
				"commentPortrait": "http://static.oschina.net/uploads/user/59/118890_50.jpg?t=1402231617000",
				"commentAuthor": "人生想绕几个圈",
				"commentAuthorId": 118890,
				"refers": [{
					"refertitle": "引用来自“饥渴的大牲口遇见了躁动的小畜生”的评论",
					"referbody": "Windows 开源吧"
				}]
			}]
		}
	}
})