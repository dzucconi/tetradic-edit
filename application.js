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

  var Drawing = {
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
  }

  var groups = Object.keys(Drawing).map(function(section) {
    Drawing[section].group =
      two.makeGroup(Drawing[section]._0, Drawing[section]._1, Drawing[section]._2, Drawing[section]._3);
  });

  Drawing.base.group.fill = "#000";

  var pairs = [0, 0, 0, 0].map(function(_, i) {
    return [Drawing.under["_" + i], Drawing.over["_" + i]]
  });

  var fillPair = function(pair, color) {
    pair.map(function(x) { x.fill = color; });
  }

  fillPair(pairs[0], pusher.color("red").html());
  fillPair(pairs[1], pusher.color("red").complement().html());
  fillPair(pairs[2], pusher.color("green").html());
  fillPair(pairs[3], pusher.color("green").complement().html());

  two.update();
});
