$(function() {
  var stage = {
    el: $("#render")[0],
    unit: 600,
    params: {
      width: 600,
      height: 600
    }
  },

  two = new Two(stage.params).appendTo(stage.el),

  make = {
    fold: function(size) {
      return two.makePolygon(0,0, (size / 6), 0, size,(size - (size / 6)), size,size, 0,size, 0,0);
    },

    triangle: function(size) {
      return two.makePolygon(0,0, size,size, 0,size, 0,0);
    }
  };

  // Build Base
  var _base = [1, 2, 3, 4].map(function(i) {
    return make.fold(stage.unit / 2);
  })

  _base.map(function(fold) {
    // fold.fill = "black"
  });

  var base = two.makeGroup(_base);

  _base[0].translation.set(0, 0);
  _base[1].translation.set(0, stage.unit / 2);
  _base[2].translation.set(stage.unit / 2, 0);
  _base[3].translation.set(stage.unit / 2, stage.unit / 2);

  _base[0].rotation = Math.PI * -0.5;
  _base[1].rotation = Math.PI * 1;
  _base[2].rotation = Math.PI * 0.0;
  _base[3].rotation = Math.PI * 0.5;

  base.translation.set(stage.unit / 4, stage.unit / 4);

  // Build top
  var _top = [1, 2, 3, 4].map(function(i) {
    return make.triangle(stage.unit / 2.5);
  });

  _top[0].translation.set(0, 0);
  _top[1].translation.set(0, stage.unit / 2);
  _top[2].translation.set(stage.unit / 2, 0);
  _top[3].translation.set(stage.unit / 2, stage.unit / 2);

  _top[0].rotation = Math.PI * -0.5;
  _top[1].rotation = Math.PI * 1;
  _top[2].rotation = Math.PI * 0.0;
  _top[3].rotation = Math.PI * 0.5;

  var top = two.makeGroup(_top);

  top.translation.set(stage.unit / 4, stage.unit / 4);

  two.update();
});
