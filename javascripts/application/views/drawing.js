(function() {
  "use strict";

  App.Views.DrawingView = Backbone.View.extend({
    el: "#drawing",

    template: _.template("<div id='render'></div>"),

    initialize: function() {
      this.two = new Two({
        width: this.model.get("width"),
        height: this.model.get("height")
      });
    },

    render: function() {
      this.$el.html(this.template(this.model.attributes));
      this.postRender();

      return this;
    },

    postRender: function() {
      this.two.appendTo(this.$el.find("#render")[0]);
      this.model.draw(this.two);
    }
  });
}());
