(function() {
  "use strict";

  App.Models.Drawing = Backbone.Model.extend({
    initialize: function() {
      this.listenTo(this.get("colors"), "change", this.paint);
    },

    rotate: function() {
      var model = this;

      _.each(["base", "over", "under"], function(x) {
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
      _.map(Object.keys(model.get("data").regions), function(key) {
        model.set(key, _.map(model.get("data").regions[key], function(xs) {
          return model.two.makePolygon(model.vectorize(xs)).noStroke();
        }));
      });

      // Pair up corresponding under and over sections
      model.set("pairs", _.map(model.get("under"), function(_, i) {
        return [model.get("under")[i], model.get("over")[i]];
      }));

      // Group
      _.each(["under", "over"], function(region) {
        model.set(region, model.two.makeGroup(model.get(region)));
      });

      model.paint();
    },

    // Converts a flat Array of pairs of integers
    // to an Array of Two.Vector pairs
    vectorize: function(xs) {
      return _.tap([], function(res) {
        for(var i = 0; i < xs.length; i += 2) {
          res.push(new Two.Vector(xs[i], xs[i + 1]));
        };
      });
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
