(function() {
  "use strict";

  App.Views.DrawingView = Backbone.View.extend({
    el: "#drawing",

    template: _.template("<div id='render'></div>"),

    events: {
      "click": "rotate"
    },

    initialize: function() {
      this.two = new Two({
        width: this.model.get("width"),
        height: this.model.get("height")
      });
    },

    increment45: function() {
      var rot = this.model.get("rotation");

      if (rot >= 315) { return 0; };

      return (rot || 0) + 45;
    },

    rotate: function() {
      this.model.set("rotation", this.increment45());
      this.renderRotation();

      App.mediator.trigger("rotation:change");
    },

    renderRotation: function() {
      var model = this.model;

      var rules = ["-webkit-", "-moz-", "-ms-", "-o-", ""].reduce(function(obj, vendor) {
        obj[vendor + "transform"] = "rotate(" + model.get("rotation") + "deg)";

        return obj;
      }, {});

      this.$el.find("#render").css(rules);
    },

    render: function() {
      this.$el.html(this.template(this.model.attributes));
      this.postRender();

      return this;
    },

    postRender: function() {
      this.two.appendTo(this.$el.find("#render")[0]);
      this.model.draw(this.two);
      this.renderRotation();
    }
  });
}());
