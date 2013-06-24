$(function() {
  "use strict";

  var stage = {
    el: $("#render")[0],
    params: {
      width: 864,
      height: 864
    }
  },

  two = new Two(stage.params).appendTo(stage.el),

  Drawing = {
    groups: {
      base: {
        _0: two.makePolygon(792,365, 499,72, 432,5, 365,72, 72,365, 5,432, 72,499, 365,792, 432,859, 499,792, 792,499, 859,432)
      },

      paper: {
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
    },

    colors: {
      _0: pusher.color("red"),
      _1: pusher.color("green"),
      linked: true
    },

    fillPair: function(pair, color) {
      pair[0].fill = color.add("#090909").html();
      pair[1].fill = color.html();
    },

    update: function(linked) {
      if (this.colors.linked) { this.colors._1 = this.colors._0.hue("+90"); }

      $("#c1")[0].value = this.colors._0.hex6();
      $("#c2")[0].value = this.colors._1.hex6();

      this.fillPair(pairs[0], this.colors._0);
      this.fillPair(pairs[1], this.colors._0.complement());
      this.fillPair(pairs[2], this.colors._1);
      this.fillPair(pairs[3], this.colors._1.complement());

      two.update();
    }
  }

  var groups = Object.keys(Drawing.groups.paper).map(function(section) {
    Drawing.groups.paper[section].group =
      two.makeGroup(
        Drawing.groups.paper[section]._0,
        Drawing.groups.paper[section]._1,
        Drawing.groups.paper[section]._2,
        Drawing.groups.paper[section]._3
      );

    Drawing.groups.paper[section].group.noStroke();
  });

  Drawing.groups.base.stroke = "#777";

  var pairs = [0, 0, 0, 0].map(function(_, i) {
    return [Drawing.groups.paper.under["_" + i], Drawing.groups.paper.over["_" + i]]
  });

  Drawing.update();

  $(".color").on("change", function() {
    var _color = $(this).data("color");

    Drawing.colors[_color] = pusher.color(this.value);
    Drawing.update();
  });

  $("#linked").on("click", function(e) {
    e.preventDefault();

    var $el = $(this);

    Drawing.colors.linked = !$el.data("value");
    $el.data("value", Drawing.colors.linked);
    $el.text($el.data(Drawing.colors.linked.toString()));
    $("#menu").toggleClass("is-linked");
  });
});
