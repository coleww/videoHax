(function(){"use strict";Array.prototype.sample=function(){return this[Math.floor(Math.random()*this.length)]},"undefined"!=typeof Uint8ClampedArray?Uint8ClampedArray.prototype.slice=Array.prototype.slice:"undefined"!=typeof CanvasPixelArray?CanvasPixelArray.prototype.slice=Array.prototype.slice:console.log("bad times ahead, yo")})(),function(t){"use strict";var i=t.imagePlayer=t.imagePlayer||{},e=i.Player=function(t,e){this.canvas=t,this.ctx=t.getContext("2d"),this.currImgCtx=e.getContext("2d"),this.w=t.width,this.h=t.height,this.interval=void 0,this.img=void 0,this.loopType="shapes",this.modes={shapes:new i.shapeMode(this.ctx,this.w,this.h),slits:new i.slitMode(this.ctx,this.w,this.h),walkers:new i.walkerMode(this.ctx,this.w,this.h)}};e.prototype.play=function(){new i.PlayerUI(this,new i.Saver(this.canvas)),this.loadAndDraw(this.pickRandomImage())},e.prototype.pickRandomImage=function(){return"/canvasHax/images/"+(Math.floor(20*Math.random())+1)+".jpg"},e.prototype.loadAndDraw=function(t){var i=this,e=new Image;e.onload=function(){i.drawImage(e)},e.src=t},e.prototype.handleImage=function(t){var i=this,e=new FileReader;e.onload=function(t){i.loadAndDraw(t.target.result)},e.readAsDataURL(t.target.files[0])},e.prototype.drawImage=function(t){void 0!==t&&(this.img=t),this.ctx.drawImage(this.img,0,0,this.w,this.h),this.currImgCtx.drawImage(this.img,0,0,this.img.width,this.img.height,0,0,100,100);var i=new PixelArray(this.ctx,this.w,this.h);this.ctx.fillStyle="rgb(0, 0, 0)",this.ctx.fillRect(0,0,this.w,this.h),this.modes.walkers.generateWalkers(i),this.interval&&clearInterval(this.interval);var e=this;this.interval=window.setInterval(function(){e.modes[e.loopType].playLoop(i)},5)}}(this),function(t){"use strict";var i=t.imagePlayer=t.imagePlayer||{},e=i.PlayerUI=function(t,i){this.installListeners(t,i)};e.prototype.installListeners=function(t,i){this.installPlayerListeners(t,i),this.installShapeListeners(t.modes.shapes),this.installSlitListeners(t.modes.slits),this.installWalkerListeners(t.modes.walkers)},e.prototype.installPlayerListeners=function(t,i){var e=$("#slits-opts"),s=$("#shapes-opts"),a=$("#walkers-opts");$("input:radio[name=loop-type]").change(function(i){var n=$(i.target).val();t.loopType=n,e.addClass("hide"),s.addClass("hide"),a.addClass("hide"),$("#"+n+"-opts").removeClass("hide"),t.drawImage()}),$("#save").click(function(){i.saveImage()}),$("#gif").click(function(){i.createGIF()}),$("#imageLoader").change(function(i){t.handleImage(i)})},e.prototype.installShapeListeners=function(t){$("#alpha").change(function(i){t.settings.alpha=$(i.target).val()}),$("#shape-size").change(function(i){t.settings.elementSize=$(i.target).val()}),$("#shape-move").change(function(i){t.settings.distance=$(i.target).val()}),$("#num-shapes").change(function(i){t.settings.numElements=$(i.target).val()}),$("input:radio[name=start-position]").change(function(i){t.settings.elementStart=$(i.target).val()}),$("input:radio[name=stroke-type]").change(function(i){t.settings.drawShape=$(i.target).val()})},e.prototype.installSlitListeners=function(t){$("#line-alpha").change(function(i){t.settings.alpha=$(i.target).val()}),$("#line-width").change(function(i){t.settings.lineWidth=$(i.target).val()});var i=$("#slit-width");$("input:radio[name=line-type]").change(function(e){t.settings.slitType=$(e.target).val(),"converge"===t.settings.slitType?i.addClass("hide"):i.removeClass("hide")})},e.prototype.installWalkerListeners=function(t){$("#walker-size").change(function(i){t.settings.walkerSize=$(i.target).val()}),$("#walker-alpha").change(function(i){t.settings.alpha=$(i.target).val()})}}(this),function(t){"use strict";var i=t.imagePlayer=t.imagePlayer||{},e=i.Saver=function(t){this.canvas=t};e.prototype.saveImage=function(){this.canvas.toBlob(function(t){saveAs(t,"imagePlayer.png")})},e.prototype.createGIF=function(){var t=this,i=0,e=6,s=new Animated_GIF({workerPath:"/canvasHax/vendor/Animated_GIF.worker.js"}),a=$("#gif");a.text("creating..."),s.setSize(500,500),s.setDelay(100);var n=window.setInterval(function(){var o=document.createElement("img");if(o.src=t.canvas.toDataURL(),s.addFrame(o),i++,a.text(e-i+"..."),i>=e){clearInterval(n);var r=document.createElement("img");s.getBase64GIF(function(t){r.src=t,document.body.appendChild(r),a.text("Create Gif")})}},1e3)}}(this),function(t){"use strict";var i=t.Pixel=function(t,i,e){this.rgba=t,this.xpos=i,this.ypos=e};i.prototype.getColor=function(t){var i=this.rgba[0],e=this.rgba[1],s=this.rgba[2],a=this.rgba[3];return void 0!==t&&(a=t),"rgba("+i+","+e+","+s+","+a+")"}}(this),function(t){"use strict";var i=t.PixelArray=function(t,i,e){this._pixels=t.getImageData(0,0,i,e).data,this.w=i,this.h=e,this.numPixels=this._pixels.length/4};i.prototype.getPixel=function(t,i){if(t>this.w||i>this.h||0>t||0>i)throw"OUTTA BOUNDS!";var e=4*(i*this.w+t),s=this._pixels.slice(e,e+4);return new Pixel(s,t,i)},i.prototype.randomPixel=function(){var t=this.randomCoords();return this.getPixel(t[0],t[1])},i.prototype.centerPixel=function(){var t=this.centerCoords();return this.getPixel(t[0],t[1])},i.prototype.randomCoords=function(){var t=Math.floor(Math.random()*this.w),i=Math.floor(Math.random()*this.h);return[t,i]},i.prototype.centerCoords=function(){return[this.w/2,this.h/2]},i.prototype.getRow=function(t){for(var i=[],e=0;this.w>e;e++){var s=this.getPixel(e,t);i.push(s)}return i},i.prototype.getCol=function(t){for(var i=[],e=0;this.h>e;e++){var s=this.getPixel(t,e);i.push(s)}return i},i.prototype.getA=function(t,i){for(var e=[],s="row"===t?this.w:this.h,a=0;s>a;a++){var n="row"===t?this.getPixel(a,i):this.getPixel(i,a);e.push(n)}return e}}(this),function(t){"use strict";var i=t.RandomWalker=function(t,i,e,s,a){this.pixel=t,this.dirs=[-1,0,1],this.w=i,this.h=e,this.xdir=null,this.ydir=null,this.x2pos=null,this.y2pos=null,void 0===s||void 0===a?(this.xpos=Math.floor(Math.random()*i),this.ypos=Math.floor(Math.random()*e)):(this.xpos=s,this.ypos=a),this.setRandomDirection(),this.move(5)};i.prototype.move=function(t){this.xpos+=this.xdir,this.ypos+=this.ydir,this.x2pos=this.xpos+this.xdir*t,this.y2pos=this.ypos+this.ydir*t,(0>this.xpos||this.xpos>this.w)&&(this.xdir*=-1),(0>this.ypos||this.ypos>this.h)&&(this.ydir*=-1)},i.prototype.setRandomDirection=function(){this.xdir=this.dirs.sample(),this.ydir=this.dirs.sample(),0===this.xdir&&0===this.ydir&&this.setRandomDirection()},i.prototype.intersectsWith=function(t){var i=this.xpos,e=this.ypos,s=this.x2pos,a=this.y2pos,n=t.xpos,o=t.ypos,r=t.x2pos,h=t.y2pos,l=s-i,c=a-e,p=r-n,d=h-o,g=l*d-c*p;if(0===g)return!1;var u=n-i,m=o-e,f=(u*d-m*p)/g;if(0>f||f>1)return!1;var y=(u*c-m*l)/g;return 0>y||y>1?!1:!0}}(this),function(t){"use strict";var i=t.imagePlayer=t.imagePlayer||{},e=i.shapeMode=function(t,i,e){this.ctx=t,this.w=i,this.h=e,this.settings={elementSize:5,alpha:1,elementStart:"origin",drawShape:"circle",distance:5,numElements:5},this.shapes={circle:this.drawCircle.bind(this.ctx),square:this.drawSquare.bind(this.ctx),random:this.drawRandom.bind(this.ctx),line:this.drawLine.bind(this.ctx)}};e.prototype.playLoop=function(t){var i=t.randomCoords(),e=i[0],s=i[1],a=t.getPixel(e,s),n=a.getColor(this.settings.alpha);switch(this.ctx.fillStyle=n,this.ctx.strokeStyle=n,this.settings.elementStart){case"center":i=t.centerCoords(),e=i[0],s=i[1];break;case"random":i=t.randomCoords(),e=i[0],s=i[1];break;case"origin":}this.draw(e,s)},e.prototype.draw=function(t,i){for(var e=0;this.settings.numElements>e;e++){var s=this.settings.elementSize*Math.random();if(this.shapes[this.settings.drawShape](t,i,s),t+=(2*Math.random()-1)*this.settings.distance,i+=(2*Math.random()-1)*this.settings.distance,0-this.settings.elementSize>t||0-this.settings.elementSize>i||t>this.w+this.settings.elementSize||i>this.h+this.settings.elementSize)break}},e.prototype.drawCircle=function(t,i,e){this.beginPath(),this.arc(t,i,e,0,2*Math.PI,!1),this.fill()},e.prototype.drawSquare=function(t,i,e){this.fillRect(t-e,i-e,2*e,2*e)},e.prototype.drawRandom=function(t,i,e){e*=2;var s=t-Math.random()*e,a=i-Math.random()*e;this.beginPath(),this.moveTo(s,a),this.lineTo(t+e*Math.random(),i-e*Math.random()),this.lineTo(t+e*Math.random(),i+e*Math.random()),this.lineTo(t-e*Math.random(),i+e*Math.random()),this.lineTo(s,a),this.fill()},e.prototype.drawLine=function(t,i,e){this.lineWidth=1+e/10;var s=[5*Math.random()*e,-5*Math.random()*e,0];this.beginPath(),this.moveTo(t,i),this.lineTo(t+s.sample(),i+s.sample()),this.stroke()}}(this),function(t){"use strict";var i=t.imagePlayer=t.imagePlayer||{},e=i.slitMode=function(t,i,e){this.ctx=t,this.w=i,this.h=e,this.settings={lineWidth:1,slitType:"vertical",alpha:1}};e.prototype.playLoop=function(t){var i=this.getPixels(t);this.ctx.lineWidth=this.settings.lineWidth,this.draw(i)},e.prototype.draw=function(t){switch(this.settings.slitType){case"horizontal":this.drawHorizontal(t);break;case"vertical":this.drawVertical(t);break;case"converge":this.drawConvergence(t)}},e.prototype.drawConvergence=function(t){var i=this.w/2,e=this.h/2;this.ctx.lineWidth=1;for(var s=0;this.w>s;s++)this.ctx.beginPath(),this.ctx.strokeStyle=t[s].getColor(this.settings.alpha),this.ctx.moveTo(s,0),this.ctx.lineTo(i,e),this.ctx.stroke();for(var a=this.w-1;a>0;a--)this.ctx.beginPath(),this.ctx.strokeStyle=t[a].getColor(this.settings.alpha),this.ctx.moveTo(this.w-a,this.h),this.ctx.lineTo(i,e),this.ctx.stroke();for(var n=this.w;this.w+this.h>n;n++)this.ctx.beginPath(),this.ctx.strokeStyle=t[n].getColor(this.settings.alpha),this.ctx.moveTo(0,n-this.w),this.ctx.lineTo(i,e),this.ctx.stroke();for(var o=this.w+this.h-1;o>this.w;o--)this.ctx.beginPath(),this.ctx.strokeStyle=t[o].getColor(this.settings.alpha),this.ctx.moveTo(this.w,this.h+this.w-o),this.ctx.lineTo(i,e),this.ctx.stroke(),console.log(this.h-o-this.w)},e.prototype.drawHorizontal=function(t){for(var i=parseInt(this.settings.lineWidth,10),e=0;this.w>e;e+=i)this.ctx.fillStyle=t[e].getColor(this.settings.alpha),this.ctx.fillRect(0,e,this.w,this.settings.lineWidth)},e.prototype.drawVertical=function(t){for(var i=parseInt(this.settings.lineWidth,10),e=0;this.h>e;e+=i)this.ctx.fillStyle=t[e].getColor(this.settings.alpha),this.ctx.fillRect(e,0,this.settings.lineWidth,this.w)},e.prototype.getPixels=function(t){var i=t.randomCoords();if("horizontal"===this.settings.slitType)return t.getCol(i[0]);if("vertical"===this.settings.slitType)return t.getRow(i[1]);var e=t.getRow(i[0]),s=t.getCol(i[1]);return e.concat(s)}}(this),function(t){"use strict";var i=t.imagePlayer=t.imagePlayer||{},e=i.walkerMode=function(t,i,e){this.ctx=t,this.w=i,this.h=e,this.walkers=[],this.settings={numWalkers:100,walkerSize:25,alpha:1}};e.prototype.generateWalkers=function(t){this.walkers.length=0;for(var i=0;this.settings.numWalkers>i;i++){var e=t.randomPixel();this.walkers.push(new RandomWalker(e,this.w,this.h))}},e.prototype.playLoop=function(){var t=this;this.walkers.forEach(function(i,e,s){i.move(t.settings.walkerSize),s.forEach(function(s,a){i.intersectsWith(s)&&e!==a&&t.drawQuad(i,s)})})},e.prototype.drawQuad=function(t,i){this.ctx.fillStyle=t.pixel.getColor(this.settings.alpha),this.ctx.beginPath(),this.ctx.moveTo(t.xpos,t.ypos),this.ctx.lineTo(t.x2pos,t.y2pos),this.ctx.lineTo(i.xpos,i.ypos),this.ctx.lineTo(i.x2pos,i.y2pos),this.ctx.fill()}}(this);