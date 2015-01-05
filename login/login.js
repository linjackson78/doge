define(['butterfly/view', 'css!login/login', 'main/util'], function(View, CSS, Util) {
  return View.extend({

    events: {
      "click #logInBtn": "login"
    },

    login: function() {
      location.assign(Util.joinURL({
        path: "/action/oauth2/authorize",
        response_type: "code",
      }))
    }

  });
})