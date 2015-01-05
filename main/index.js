define(['butterfly/view', 'main/util', "main/client"], function(View, Util, Client) {
  return View.extend({
    onShow: function() {
      //通过Util里判断是否登陆的isLogin方法，决定是否跳转到登录页，同时考虑第一次登录时地址会附带code字段的特殊情况
      if (!Util.isLogin() && location.search.indexOf("code") == -1) {
        butterfly.navigate("#login/login.html")
          //地址有code字段才请求access_token
      } else if (!Util.isLogin()) {
        console.log()
        Client.apiRequest({
            url: {
              path: "/action/openapi/token",
              grant_type: "authorization_code",
              code: location.search.match(/code=(.+)&/)[1]
            },
            log: true,
            success: function(json) {
              //这里把“过期时间段”（多少秒后过期）转换为了“过期时间点”（哪个时间点过期），方便比较
              json.expires_time = Date.now() + json.expires_in * 1000;
              Util.saveData("client", json);
              //办完登录手续，自动跳到详情页
              butterfly.navigate("#news-list/news-list.html")
            }
          })
          //因为新闻详情页用地址栏的id做标记，所以地址栏没id的网址都路由到新闻列表页里去
      } else if (location.hash.indexOf("id") == -1) {
        butterfly.navigate("#news-list/news-list.html")
      }
    }
  });
});