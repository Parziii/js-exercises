const x = 10; // circles count
const y = 20; // max distance between circles to draw a line

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

const getRandomInt = (min, max) => Math.random() * (max - min) + min;

const getRandomVelocity = () =>
  new Vector(getRandomInt(5, 15), getRandomInt(5, 15));

const getRandomPosition = () =>
  new Vector(getRandomInt(100, 500), getRandomInt(100, 500));

const getRandomRadius = () => getRandomInt(20, 50);

class Circle {
  constructor(position, velocity, rad) {
    this.position = position;
    this.velocity = velocity;
    this.rad = rad;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.rad, Math.PI * 2, false);
    ctx.stroke();
    ctx.fill();
  }

  update() {
    if (
      this.position.x + this.rad > innerWidth ||
      this.position.x - this.rad < 0
    ) {
      this.velocity.x = -this.velocity.x;
    }

    if (
      this.position.y + this.rad > innerHeight ||
      this.position.y - this.rad < 0
    ) {
      this.velocity.y = -this.velocity.y;
    }

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

const circles = new Array(x)
  .fill(1)
  .map(
    () =>
      new Circle(getRandomPosition(), getRandomVelocity(), getRandomRadius())
  );

const animation = () => {
  requestAnimationFrame(animation);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  circles.forEach((circle) => {
    circle.draw();
    circle.update();
  });
  Line.init();
};

animation();
