define(['butterfly/view', 'css!news-detail/news-detail', 'main/util', 'main/client', 'text!news-detail/comment-tmpl.html'], function(View, CSS, Util, Client, CommentTmpl) {
	return View.extend({

		events: {
			"click #back": "back",
			"click #pub-comment": "pubComment",
			"click .comment-reply-btn": "replyComment"
		},

		commentSettings: null,

		onShow: function() {
			var _this = this;
			this.pageId = location.hash.split("?")[1].split("=")[1];
			this.myScroll = new IScroll(".detail-wrapper", {
				mouseWheel: true
			});

			$(".news-content").children().remove();

			Client.apiRequest({
				url: {
					path: "/action/openapi/news_detail",
					id: this.pageId
				},
				log: true,
				cache: true,
				success: newsDetailCb,
				error: errorCb,
			});

			//newsDetailCb(Util.fakeNewsDetailJSON)

			function newsDetailCb(json) {
				$(".news-detail-title").text(json.title);
				$(".news-content").append("<div class='article'>" + json.body + "</div>");
				_this.loadComments();
			}

			function errorCb() {
				$(".news-detail-title").text("文章加载失败");
				$(".news-content").append("<div class='article'>" + "<p class='sorry'>不好意思</p><p>服务器出了点问题</p>" + "</div>");
				_this.loadComments();
			}
		},

		onHide: function() {
			this.commentSettings = null;
			this.myScroll.destroy();
			$("#pub-comment-content").val("").attr("placeholder", "讲点什么")
		},

		back: function() {
			butterfly.navigate("#news-list/news-list.html");
		},

		loadComments: function() {
			var _this = this;
			$('.news-comment').children().remove();

			Client.apiRequest({
				url: {
					path: "/action/openapi/comment_list",
					catalog: 1,
					page: 1,
					pageSize: 100,
					id: this.pageId,
				},
				dataType: "jsonp",
				success: injectComments,
				/*success: function(data){
					injectComments(data)
				}*/
			});

			//injectComments(Util.fakeCommentsListJSON)

			//在news-list.js里，把加载数据后的回调函数绑定在view上面之后，success的回调函数得写成上上面这个样子，以避免作用域改变带来的问题，所以这里贪方便，不把injectComments独立绑在view上了
			function injectComments(json) {
				var commentCount = 0;
				if (json.commentList) {
					json.commentList.forEach(function(obj, index) {
						var tmplStr = CommentTmpl;
						var tmpl = _.template(tmplStr);
						if (obj.commentPortrait == "") {
							obj.commentPortrait = "portrait.gif";
						}
						if (obj.commentAuthor == "") {
							obj.commentAuthor = "游客"
						}
						var html = tmpl(obj)
						$(html).appendTo($(".news-comment"));
						commentCount++;
					});
				}
				$(".comment-count").text(commentCount);
				setTimeout(function() {
					_this.myScroll.refresh();
				}, 100)
			}
		},

		replyComment: function(e) {
			e.preventDefault();
			var $target = $(e.target)
			this.commentSettings = {
				"path": "/action/openapi/comment_reply",
				"authorid": $target.data("comment-author-id"),
				"replyid": $target.data("comment-id")
			};
			$("#pub-comment-content").attr("placeholder", "@" + $target.data("comment-author"));
			this.myScroll.y = this.myScroll.maxScrollY;
			setTimeout(function() {
				$("#pub-comment-content").focus()
			}, 500); //这里如果不延时执行的话，会有点问题，原因不详
		},

		pubComment: function() {
			var _this = this;
			var text = $("#pub-comment-content").val();
			var defaultSettings = {
				"path": "/action/openapi/comment_pub",
				"id": _this.pageId,
				"content": text,
				"catalog": "1"
			};
			var finalSettings = _.extend(defaultSettings, _this.commentSettings ? _this.commentSettings : {});
			//客户端验证评论内容不能为空;
			if (text.replace(/^\s*/g, '') !== "") {
				Client.apiRequest({
					url: finalSettings,
					success: function(json) {
						if (json.error === "200") {
							_this.loadComments(json);
							_this.pubCommentTips("发布成功~", "再说点什么吧")
						} else if (json.error === "500") {
							_this.pubCommentTips("评论内容不能为空的说", "评论内容不能为空的说")
						}
					},
				})

			} else {
				_this.pubCommentTips("评论内容不能为空的说", "评论内容不能为空的说")
			}
		},

		pubCommentTips: function(tips, placeholder) {
			$("#pub-comment-content").val("").attr("placeholder", placeholder);
			$(".comment-tips").text(tips).slideDown(100).delay(2000).slideUp(1000);
		},

	});
})