$(function() {
  "use strict";

  var stage = {
    el: $("#render")[0],
    unit: 864,
    params: {
      width: 864,
      height: 864
    }
  },

  two = new Two(stage.params).appendTo(stage.el);

  window.Drawing = {
    groups: {
      base: {
        _0: two.makePolygon(5,432, 72,499, 72,365),
        _1: two.makePolygon(859,432, 792,365, 792,499),
        _2: two.makePolygon(432,859, 499,792, 365,792),
        _3: two.makePolygon(432,5, 365,72, 499,72)
      },

      under: {
        _0: two.makePolygon(792,432, 792,365, 499,72, 432,72, 432,432),
        _1: two.makePolygon(432,72, 365,72, 72,365, 72,432, 432,432),
        _2: two.makePolygon(792,499, 792,432, 432,432, 432,792, 499,792),
        _3: two.makePolygon(72,432, 72,499, 365,792, 432,792, 432,432)
      },

      over: {
        _0: two.makePolygon(365,365, 72,365, 365,72),
        _1: two.makePolygon(499,365, 792,365, 499,72),
        _2: two.makePolygon(365,499, 72,499, 365,792),
        _3: two.makePolygon(499,792, 792,499, 499,499)
      }
    },

    colors: {
      _0: pusher.color("red"),
      _1: pusher.color("green")
    },

    update: function() {
      fillPair(pairs[0], this.colors._0.html());
      fillPair(pairs[1], this.colors._0.complement().html());
      fillPair(pairs[2], this.colors._1.html());
      fillPair(pairs[3], this.colors._1.complement().html());

      two.update();
    }
  }

  var groups = Object.keys(Drawing.groups).map(function(section) {
    Drawing.groups[section].group =
      two.makeGroup(
        Drawing.groups[section]._0,
        Drawing.groups[section]._1,
        Drawing.groups[section]._2,
        Drawing.groups[section]._3
      );

    Drawing.groups[section].group.noStroke();
  });

  Drawing.groups.base.group.fill = "#eee";

  var pairs = [0, 0, 0, 0].map(function(_, i) {
    return [Drawing.groups.under["_" + i], Drawing.groups.over["_" + i]]
  });

  var fillPair = function(pair, color) {
    pair.map(function(x) { x.fill = color; });
  }

  Drawing.update();

  $(".color").on("change", function() {
    var _color = $(this).data("color");
    console.log(_color);
    Drawing.colors[_color] = pusher.color(this.value);
    Drawing.update();
  });
});
