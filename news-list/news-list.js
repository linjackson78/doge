define(['butterfly/view', 'css!news-list/news-list', 'main/util', "text!news-list/news-list-tmpl.html", "main/client"], function(View, CSS, Util, newsListTmpl, Client) {
  return View.extend({

    events: {
      "click .news-list-nav": "toggleNav",
      "click .news-header": "navigateToDetail"
    },
    //本页面的默认参数
    myScroll: null,
    pullDownOffset: 50,
    pullUpOffset: 50,
    pageSize: 10,
    currentPage: 1,
    catalog: 1,
    oldPage: null,
    touchEndScrollY: 0,
    refreshList: 0, //对更新的新闻条数进行计数

    onShow: function() {
      var _this = this;
      _this.isLoadingUp = false;
      _this.isLoadingDown = false;
      _this.isTogglingNav = false;
      var $content = $(".news-list-content"),
        $pullDown = $(".pull-down"),
        $pullUp = $(".pull-up"),
        $scroller = $(".news-list-scroller"),
        $downIcon = $(".pull-down-icon"),
        $upIcon = $(".pull-up-icon")
      if (!_this.myScroll) {
        _this.myScroll = new IScroll(".news-list-wrapper", {
          mouseWheel: true,
          probeType: 1,
        });
        _this.myScroll.on("scroll", function() {
          //超出设定的偏移值，同时不处于“更新”状态时，才改变“刷新提示块”的内容
          if (this.y > _this.pullDownOffset && !_this.isLoadingUp) {
            $pullDown.text("松手开始更新")
            $downIcon.addClass("down-active")
          } else if (this.y < _this.pullDownOffset && !_this.isLoadingUp) {
            $pullDown.text("继续下拉更新")
            $downIcon.removeClass("down-active")
          }
          //同上理
          if (this.y < -$scroller.outerHeight() - _this.pullUpOffset + 475 && !_this.isLoadingDown) {
            $pullUp.text("松手可以加载")
            $upIcon.addClass("up-active")
          } else if (this.y > -$scroller.outerHeight() - _this.pullUpOffset + 475 && !_this.isLoadingDown) {
            $pullUp.text("上拉加载更多")
            $upIcon.removeClass("up-active")
          }
        });
      } else {
        _this.myScroll.refresh();
      }

      document.addEventListener("touchend", function() {
        //将手指离开屏幕时，iscroll的滚动距离记录下来，很关键的参数的说
        _this.touchEndScrollY = _this.myScroll.y;

        if (_this.touchEndScrollY > _this.pullDownOffset && !_this.isLoadingUp) {
          console.log("loading upside")
          _this.isLoadingUp = true;
          $pullDown.text("正在更新")
          _this.oldPage = _this.currentPage;
          _this.currentPage = 1;
          _this.pageSize = 30; //权宜之后，决定在更新的时候获取最新的30条
          _this.loadNewsList();
        }

        if (_this.touchEndScrollY < -$scroller.outerHeight() - _this.pullUpOffset + 475 && !_this.isLoadingDown && !_this.isTogglingNav) {
          console.log("loading downside")
          _this.isLoadingDown = true;
          $pullDown.text("正在加载")
          _this.currentPage++;
          _this.loadNewsList().done(function() {
            _this.touchEndScrollY = 0
            _this.isLoadingDown = false;
            $pullDown.text("上拉加载更多")
          })
        }
      });

      if (_this.currentPage != _this.oldPage) {
        _this.loadNewsList().done(function() {});
      }
    },

    onHide: function() {
      this.oldPage = this.currentPage;
    },

    toggleNav: function(e) {
      var _this = this;
      _this.isTogglingNav = true;
      e.preventDefault();
      $target = $(e.target);
      this.catalog = $target.data("catalog");
      this.page = 1;
      this.currentPage = 1;
      $(".news-list-nav").removeClass("nav-active")
      $target.addClass("nav-active")
      $(".news-list-content").children().remove();
      this.loadNewsList().done(function() {
        _this.isTogglingNav = false; //加载完才改变状态，否则iscroll高度太小，“上拉加载更多”的那部分逻辑会误判导致自动加载
      })
    },

    loadNewsList: function() {
      var _this = this;
      var dfd = $.Deferred(); //这里用jquery的deferred对象，使得加载新闻这样子的异步IO操作可以写成链式操作，并达到同步操作的效果
      console.log("loading newslist, currentPage is", _this.currentPage);
      Client.apiRequest({
        url: {
          "path": "/action/openapi/news_list",
          "catalog": _this.catalog,
          "pageSize": _this.pageSize,
          "page": _this.currentPage
        },
        dataType: "jsonp",
        success: injectNewsList
      });

      return dfd.promise();

      function injectNewsList(json) {
        var lastNewsId = parseInt($(".news-li").first().attr("id"));
        var read = Util.getData("read") ? Util.getData("read") : {};
        json.newslist.forEach(function(obj) {
          obj.read = read[obj.id] ? "read" : "";
        });
        //下拉刷新时这样搞
        if (_this.isLoadingUp) {
          for (var i = json.newslist.length - 1; i >= 0; i--) {
            if (json.newslist[i].id > lastNewsId) {
              _this.refreshList++;
              var html = _.template(newsListTmpl)(json.newslist[i]);
              $(html).prependTo($(".news-list-content"))
            }
          }
          _this.currentPage = _this.oldPage;
          _this.pageSize = 10;
          _this.touchEndScrollY = 0;
          $(".list-tips").text("好像更新了" + _this.refreshList + "条~").slideDown(500).delay(2000).slideUp(500);
          _this.refreshList = 0;
          _this.isLoadingUp = false;
          $(".pull-down").text("继续下拉更新")
          $(".pull-down-icon").removeClass("down-active")
        } else {
          //其它加载情况这样搞  
          json.newslist.forEach(function(obj) {
            var html = _.template(newsListTmpl)(obj);
            $(html).appendTo($(".news-list-content"));
          })
          $(".pull-up").text("上拉加载更多")
          $(".pull-up-icon").removeClass("up-active")
        }
        setTimeout(function() {
          _this.myScroll.refresh()
        }, 100)
        dfd.resolve();
      }
    },

    navigateToDetail: function(e) {
      var targetNewsId = $(e.target).closest(".news-li").attr("id")
        //把已读文章的id存储起来
      var read = Util.getData("read") ? Util.getData("read") : {}
      read[targetNewsId] = "read";
      Util.saveData("read", read);
      $(e.target).closest(".news-li").addClass("read");

      butterfly.navigate("#news-detail/news-detail.html?id=" + targetNewsId) //这里把url参数图方便直接加在hash后面，不知是否妥当
    },
  });
});