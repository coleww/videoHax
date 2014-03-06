(function(root){
  var imagePlayer = root.imagePlayer = (root.imagePlayer || {});

  PlayerUI = imagePlayer.PlayerUI = function(player, saver){
    this.player = player;
    this.saver = saver;
    //should this be here? prbly not?
    //though one method that does all listeners,
    //its basically a factory?
    this.installListeners();
    this.installDrawListeners();
    this.installSlitListeners();
  };

  PlayerUI.prototype.installListeners = function() {
    var player = this.player;
    var saver = this.saver;
    $("input:radio[name=loop-type]").change(function(e) {
      e.preventDefault();
      player.loopType = $(event.target).val();
      $("#slit-opts").toggleClass("hide");
      $("#draw-opts").toggleClass("hide");
      player.drawNewImage(player.img);
    });

    $("#save").click(function(e) {
      e.preventDefault();
      saver.saveImage();
    });

    $("#gif").click(function(e) {
      e.preventDefault();
      saver.createGIF();
    });

    $('#imageLoader').change(function(e) {
      e.preventDefault();
      player.handleImage(e);
    });
  };

  PlayerUI.prototype.installDrawListeners = function() {
    var player = this.player;
    $("#alpha").change(function(e) {
      player.alpha = $(e.target).val();
    });

    $("#shape-size").change(function(e) {
      player.elementSize = $(e.target).val();
    });

    $("#shape-move").change(function(e) {
      player.distance = $(e.target).val();
    });

    $("#num-shapes").change(function(e) {
      player.numElements = $(e.target).val();
    });

    $("input:radio[name=start-position]").change(function(e) {
      e.preventDefault();
      player.elementStart = $(event.target).val();
    });

    $("input:radio[name=stroke-type]").change(function(e) {
      e.preventDefault();
      player.strokeType = $(event.target).val();
    });
  };

  PlayerUI.prototype.installSlitListeners = function() {
    var player = this.player;
    $("#line-alpha").change(function(e) {
      player.alpha = $(e.target).val();
    });

    $("#line-width").change(function(e) {
      player.lineWidth = $(e.target).val();
    });

    $("input:radio[name=line-type]").change(function(e) {
      e.preventDefault();
      player.slitType = $(e.target).val();
    });
  };
})(this);
