(function() {
  "use strict";

  App.Models.Drawing = Backbone.Model.extend({
    initialize: function() {
      this.listenTo(this.get("colors"), "change", this.paint);
    },

    rotate: function() {
      var model = this;

      ["base", "over", "under"].forEach(function(x) {
        model.get(x).rotation = 0.25 * Math.PI;
      });
    },

    // Draw initial figure after the two instance
    // is attached to the DOM
    draw: function(two) {
      this.two = two;

      var model = this;

      // Draw background
      model.set("base", model.two.makePolygon(model.vectorize(model.get("data").base)));
      model.get("base").stroke = "#777";

      // Draw regions
      Object.keys(model.get("data").regions).map(function(key) {
        model.set(key, model.get("data").regions[key].map(function(xs) {
          return model.two.makePolygon(model.vectorize(xs)).noStroke();
        }));
      });

      // Pair up corresponding under and over sections
      model.set("pairs", model.get("under").map(function(_, i) {
        return [model.get("under")[i], model.get("over")[i]];
      }));

      // Group
      ["under", "over"].forEach(function(region) {
        model.set(region, model.two.makeGroup(model.get(region)));
      });

      model.paint();
    },

    // Converts a flat Array of pairs of integers
    // to an Array of Two.Vector pairs
    vectorize: function(xs) {
      var vectors = [];

      for(var i = 0; i < xs.length; i += 2) {
        vectors.push(new Two.Vector(xs[i], xs[i + 1]));
      };

      return vectors;
    },

    fillPair: function(pair, color) {
      pair[0].fill = color.add("#090909").html(); // Slightly lighten
      pair[1].fill = color.html();
    },

    paint: function() {
      var model = this;

      if (model.get("colors").get("linked")) {
        model.get("colors").set("secondary", model.get("colors").get("primary").hue("+90"));
      }

      model.fillPair(model.get("pairs")[0], model.get("colors").get("primary"));
      model.fillPair(model.get("pairs")[1], model.get("colors").get("primary").complement());
      model.fillPair(model.get("pairs")[2], model.get("colors").get("secondary"));
      model.fillPair(model.get("pairs")[3], model.get("colors").get("secondary").complement());

      model.two.update();
    }
  });
}());
