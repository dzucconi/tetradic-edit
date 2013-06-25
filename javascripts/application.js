(function(exports) {
  "use strict"

  exports.App = {
    Routers: {},
    Models: {},
    Views: {},
    Collections: {},

    initialize: function() {
      this.mediator = _.clone(Backbone.Events);
      this.router = new App.Routers.Router();

      Backbone.history.start();
    }
  };

  $(function() { App.initialize(); })
}(this));
