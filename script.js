// Testing animation concepts for boss battle

const textBoxText = document.getElementById("textbox");
const textBoxText2 = document.getElementById("textbox2");

const split = new SplitText(textBoxText, {
  charsClass: "kb-char shake-constant",
  linesClass: "kb-line"
});

const chars = split.chars;

const nextSplit = new SplitText(textBoxText2, {
  charsClass: "kb-char shake-constant",
  linesClass: "kb-line"
});

const chars2 = nextSplit.chars;

const codeEditorDiv = document.createElement("div");
codeEditorDiv.className = "code-editor";

const codeEditorDiv2 = document.createElement("div");
codeEditorDiv2.className = "code-editor reveal";

// Insert it at the beginning of textBoxText
textBoxText.prepend(codeEditorDiv);
textBoxText2.prepend(codeEditorDiv2);

chars.forEach((char, index) => {
  char.classList.add("shake-little");

  // Calculate a pseudo-random delay based on the index
  const delay = Math.random() * 0.2 + index * 0.05; // Adjust randomness and staggering here

  // Set the delay as an inline style
  char.style.animationDelay = `${delay}s`;
});

chars2.forEach((char, index) => {
  char.classList.add("shake-little");

  // Calculate a pseudo-random delay based on the index
  const delay = Math.random() * 0.2 + index * 0.05; // Adjust randomness and staggering here

  // Set the delay as an inline style
  char.style.animationDelay = `${delay}s`;
});

let currentLine;

var tl = new TimelineMax({
  // onComplete: () => {
  //   codeEditorDiv.classList.add("reveal");
  // }
});

tl.delay(3);

tl.call(
  function () {
    textBoxText.classList.add("visible");
  },
  null,
  null,
  0
)
  .staggerFrom(
    chars,
    0.8,
    {
      opacity: 0,
      ease: SteppedEase.config(1)
    },
    0.08,
    "+=0"
  )
  .call(
    function () {
      textBoxText.classList.add("cont-dot");
    },
    null,
    "+=0",
    0
  )
  .call(
    function () {
      codeEditorDiv.classList.add("reveal");
    },
    null,
    "+=2",
    0
  )
  .call(
    function () {
      textBoxText.style.display = "none";
      textBoxText2.style.display = "flex";
    },
    null,
    "+=2",
    0
  )
  .staggerFrom(
    chars2,
    0.8,
    {
      opacity: 0,
      ease: SteppedEase.config(1)
    },
    0.08,
    "+=0"
  )
  .call(
    function () {
      textBoxText2.classList.add("cont-dot");
    },
    null,
    "+=0",
    0
  )
  // .call(
  //   function () {
  //     textBoxText2.innerHTML += LiquidHTML();
  //   },
  //   null,
  //   "+=3",
  //   0
  // )
  // .call(
  //   function () {
  //     const textBox2Code = document
  //       .getElementById("textbox2")
  //       .querySelector(".code-editor");
  //     textBox2Code.classList.remove("reveal");
  //     textBox2Code.style.zIndex = "10";
  //   },
  //   null,
  //   "+=0",
  //   0
  // )
  // .call(
  //   function () {
  //     const textBox2Code = document
  //       .getElementById("textbox2")
  //       .querySelector(".code-editor");
  //     textBox2Code.classList.add("reveal");
  //   },
  //   null,
  //   "+=3",
  //   0
  // )
  .pause();

tl.play();

///////

console.clear();

var canvasLightning = function (c, cw, ch) {
  this.init = function () {
    this.loop();
  };

  var _this = this;
  this.c = c;
  this.ctx = c.getContext("2d");
  this.cw = cw;
  this.ch = ch;
  this.mx = 0;
  this.my = 0;

  this.now = Date.now();
  this.delta = 0;
  this.then = this.now;

  this.lightning = [];
  this.lightTimeCurrent = 0;
  this.lightTimeTotal = 50;

  this.rand = function (rMi, rMa) {
    return ~~(Math.random() * (rMa - rMi + 1) + rMi);
  };

  this.createL = function (x, y, canSpawn) {
    this.lightning.push({
      x: x,
      y: y,
      xRange: this.rand(5, 30),
      yRange: this.rand(5, 25),
      path: [
        {
          x: x,
          y: y
        }
      ],
      pathLimit: this.rand(10, 35),
      canSpawn: canSpawn,
      hasFired: false,
      grower: 0,
      growerLimit: 5 //this.rand(5, 15)
    });
  };

  this.updateL = function () {
    var i = this.lightning.length;
    while (i--) {
      var light = this.lightning[i];

      light.grower += this.delta;

      if (light.grower >= light.growerLimit) {
        light.grower = 0;
        light.growerLimit *= 1.05;

        light.path.push({
          x:
            light.path[light.path.length - 1].x +
            (this.rand(0, light.xRange) - light.xRange / 2),
          y: light.path[light.path.length - 1].y + this.rand(0, light.yRange)
        });

        if (light.path.length > light.pathLimit) {
          this.lightning.splice(i, 1);
        }
        light.hasFired = true;
      }
    }
  };

  this.renderL = function () {
    var i = this.lightning.length;
    while (i--) {
      var light = this.lightning[i];

      const randomColor = Math.random();
      this.ctx.strokeStyle =
        "hsla(0, 100%, 100%, " + this.rand(10, 100) / 100 + ")";
      if (randomColor >= 0.33 && randomColor < 0.8) {
        this.ctx.strokeStyle =
          "hsla(248, 53%, 58%, " + this.rand(10, 100) / 100 + ")";
      }

      if (randomColor >= 0.8) {
        this.ctx.strokeStyle =
          "hsla(204, 86%, 53%, " + this.rand(10, 100) / 100 + ")";
      }

      this.ctx.lineWidth = 4;
      if (this.rand(0, 30) == 0) {
        this.ctx.lineWidth = 5;
      }
      if (this.rand(0, 60) == 0) {
        this.ctx.lineWidth = 6;
      }
      if (this.rand(0, 90) == 0) {
        this.ctx.lineWidth = 7;
      }

      this.ctx.beginPath();

      var pathCount = light.path.length;
      this.ctx.moveTo(light.x, light.y);
      for (var pc = 0; pc < pathCount; pc++) {
        this.ctx.lineTo(light.path[pc].x, light.path[pc].y);

        if (light.canSpawn) {
          if (this.rand(0, 100) == 0) {
            light.canSpawn = false;
            this.createL(light.path[pc].x, light.path[pc].y, false);
          }
        }
      }

      if (!light.hasFired) {
        this.ctx.fillStyle =
          "rgba(255, 255, 255, " + this.rand(4, 12) / 100 + ")";
        this.ctx.fillRect(0, 0, this.cw, this.ch);
      }

      if (this.rand(0, 60) == 0) {
        this.ctx.fillStyle =
          "rgba(255, 255, 255, " + this.rand(1, 3) / 100 + ")";
        this.ctx.fillRect(0, 0, this.cw, this.ch);
      }

      this.ctx.stroke();
    }
  };

  this.lightningTimer = function () {
    this.lightTimeCurrent += this.delta;
    if (this.lightTimeCurrent >= this.lightTimeTotal) {
      var newX = this.rand(100, cw - 100);
      var newY = this.rand(0, ch / 2);
      var createCount = this.rand(1, 3);
      while (createCount--) {
        this.createL(newX, newY, true);
      }
      this.lightTimeCurrent = 0;
      this.lightTimeTotal = this.rand(200, 1500);
    }
  };

  this.clearCanvas = function () {
    this.ctx.globalCompositeOperation = "destination-out";
    this.ctx.fillStyle = "rgba(0,0,0," + this.rand(1, 30) / 100 + ")";
    this.ctx.fillRect(0, 0, this.cw, this.ch);
    this.ctx.globalCompositeOperation = "source-over";
  };

  window.addEventListener("resize", () => {
    this.cw = this.c.width = window.innerWidth;
    this.ch = this.c.height = window.innerHeight;
  });

  this.loop = function () {
    requestAnimationFrame(this.loop.bind(this));

    this.now = Date.now();
    this.delta = this.now - this.then;
    this.then = this.now;

    this.clearCanvas();
    this.updateL();
    this.lightningTimer();
    this.renderL();
  };
};

var c = document.getElementById("canvas");
var cw = (c.width = window.innerWidth);
var ch = (c.height = window.innerHeight);
var cl = new canvasLightning(c, cw, ch);

cl.init();

function LiquidHTML() {
  return `
<div class="cont">
  <div class="drip"></div>
  <div class="drip"></div>
  <div class="drip"></div>
  <div class="drip"></div>
  <div class="drip"></div>
  <div class="drip"></div>
  <div class="drip"></div>
  <div class="drip"></div>
  <div class="drip"></div>
  <div class="drip"></div>
  <div class="drip"></div>
  <div class="drip"></div>
  <div class="drip"></div>
  <div class="drip"></div>
  <div class="drip"></div>
  <div class="drip"></div>
  <div class="drip"></div>
  <div class="drip"></div>
  <div class="drip"></div>
  <div class="drip"></div>
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
    <defs>
      <filter id="goo">
        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
        <feBlend in="SourceGraphic" in2="goo" />
      </filter>
    </defs>
  </svg>

</div>
  `.trim();
}