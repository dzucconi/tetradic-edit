(function() {
  "use strict"

  App.Routers.Router = Backbone.Router.extend({
    routes: {
      "" : "index"
    },

    index: function() {
      var colorSet = new App.Models.ColorSet({
        primary: pusher.color("#ff0000"),
        linked: true
      });

      var drawing = new App.Models.Drawing({
        width: 864,
        height: 864,

        colors: colorSet,

        data: {
          base: [792,365, 499,72, 432,5, 365,72, 72,365, 5,432, 72,499, 365,792, 432,859, 499,792, 792,499, 859,432],

          regions: {
            under: [
              [792,432, 792,365, 499,72, 432,72, 432,432],
              [432,72, 365,72, 72,365, 72,432, 432,432],
              [792,499, 792,432, 432,432, 432,792, 499,792],
              [72,432, 72,499, 365,792, 432,792, 432,432]
            ],

            over: [
              [365,365, 72,365, 365,72],
              [499,365, 792,365, 499,72],
              [365,499, 72,499, 365,792],
              [499,792, 792,499, 499,499]
            ]
          }
        },
      });

      this.view = new App.Views.DrawingView({ model: drawing });
      this.view.render();

      this.interfaceView = new App.Views.InterfaceView({ model: colorSet });
      this.interfaceView.render();
    }
  });
}());
