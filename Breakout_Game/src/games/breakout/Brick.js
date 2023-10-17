export default function Brick(level, bricks, canvas, brick) {
  brick.width = canvas.width / 5 - 1;
  let newbricks = [];
  if (!bricks) {
    return [];
  }
  // If all the levels are filled
  if (bricks.length >= 5 * level) {
    return;
  }

  // Brick Formation here
  for (let i = 0; i < 5 * level; i++) {
    let newBrick = new SingleBrick(
      brick.x + brick.width,
      brick.y,
      brick.width,
      brick.height,
      brick.colors
    );
    newbricks.push(newBrick);
    // newBrick.draw();
    brick.x += brick.width + 1;
    if (brick.x + brick.width >= canvas.width) {
      brick.x = 0.5;
      brick.y += brick.height + 1;
    }
  }
  return newbricks;
}

class SingleBrick {
  constructor(x, y, w, h, c) {
    this.x = x - w;
    this.y = y;
    this.width = w;
    this.height = h;
    this.colors = c;
    this.broke = false;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.broke ? "rgba(19, 73, 89, 0)" : this.colors[1];

    ctx.lineWidth = 5;
    ctx.strokeStyle = this.broke ? "rgba(19, 73, 89, 0)" : "transparent";
    // ctx.globalCompositeOperation = "destination-atop";
    // ctx.shadowBlur = 0;
    // ctx.shadowColor = "blue";
    ctx.fill();
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
}
