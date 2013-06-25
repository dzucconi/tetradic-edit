(function() {
  "use strict";

  App.Views.InterfaceView = Backbone.View.extend({
    el: "#interface",

    events: {
      "change .color" : "changeColor",
      "click .toggler" : "toggleLinked"
    },

    template: _.template("" +
      "<div class='menu <%= linked_class %>'>" +
        "<input class='color primary' data-attr='primary' type='color' value='<%= primary.hex6() %>'>" +

        "<div class='toggler'>" +
          "<a class='linker linked'>⧓</a>" +
          "<a class='linker unlinked'>⋈</a>" +
        "</div>" +

        "<input class='color secondary' data-attr='secondary' type='color' value='<%= secondary.hex6() %>'>" +
      "</div>" +
    ""),

    initialize: function() {
      this.listenTo(this.model, "change:linked", this.render);
    },

    changeColor: function(e) {
      var $target = $(e.target);

      this.model.set($target.data("attr"), pusher.color(e.target.value));
    },

    toggleLinked: function(e) {
      e.preventDefault();

      this.model.set("linked", !this.model.get("linked"));
    },

    render: function() {
      this.$el.html(this.template(this.model.attributes));

      return this;
    }
  });
}());
