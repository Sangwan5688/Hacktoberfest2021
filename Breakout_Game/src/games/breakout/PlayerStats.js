export default function PlayerStats(ctx, player, canvas) {
  // Name
  ctx.font = "20px Arial";
  ctx.fillStyle = "white";
  ctx.fillText(`Name: ${player.name}`, 20, 30);

  // Lives
  ctx.font = "20px Arial";
  ctx.fillStyle = "red";
  let gap = 0;
  for (let i = 0; i < player.lives; i++) {
    ctx.fillText("❤️", canvas.width / 2 + gap, 30);
    gap += 30;
  }

  // Score
  ctx.font = "20px Arial";
  ctx.fillStyle = "white";
  ctx.fillText(`Score: ${player.score}`, canvas.width - 140, 30);
}
