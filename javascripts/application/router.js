(function() {
  "use strict"

  App.Routers.Router = Backbone.Router.extend({
    routes: {
      "": "index",
      "iteration/:primary/:secondary/:rotation": "index"
    },

    initialize: function() {
      this.models = {};

      var updateUrl = _.debounce(this.persist, 500).bind(this);

      this.listenTo(App.mediator, "color:change", updateUrl);
      this.listenTo(App.mediator, "rotation:change", updateUrl);
    },

    index: function(primary, secondary, rotation) {
      this.setupModels(primary, secondary, rotation);

      this.view = new App.Views.DrawingView({ model: this.models.drawing });
      this.view.render();

      this.interfaceView = new App.Views.InterfaceView({ model: this.models.colorSet });
      this.interfaceView.render();
    },

    setupModels: function(primary, secondary, rotation) {
      if (typeof(secondary) === "undefined") {
        // Setup default color scheme if we aren't
        // coming in from a route
        var colorSet = new App.Models.ColorSet({
          primary: pusher.color("#ff0000"),
          linked: true
        });
      } else {
        var colorSet = new App.Models.ColorSet({
          primary: pusher.color(primary),
          secondary: pusher.color(secondary),
          linked: false
        });
      }

      var drawing = new App.Models.Drawing({
        width: 864,
        height: 864,
        rotation: (parseInt(rotation) || 0),

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
        }
      });

      this.models.drawing = drawing;
      this.models.colorSet = colorSet;
    },

    persist: function() {
      App.router.navigate("/iteration" +
        "/" + this.models.colorSet.get("primary").hex6() +
        "/" + this.models.colorSet.get("secondary").hex6() +
        "/" + this.models.drawing.get("rotation"), { trigger: false, replace: true });
    }
  });
}());
