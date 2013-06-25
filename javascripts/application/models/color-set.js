(function() {
  "use strict";

  App.Models.ColorSet = Backbone.Model.extend({
    initialize: function() {
      this.listenTo(this, "change:linked", this.setLinkedClass);

      this.setLinkedClass();
    },

    setLinkedClass: function() {
      this.set("linked_class", this.get("linked") ? "is-linked" : "is-unlinked");
    }
  });
}());
