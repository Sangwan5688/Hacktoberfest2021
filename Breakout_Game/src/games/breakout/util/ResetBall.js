// RESET THE BALL
export default function ResetBall(ballObj, canvas, paddleProps) {
  console.log(ballObj);
  console.log(paddleProps);
  ballObj.x = paddleProps.x;
  ballObj.y = paddleProps.y - 80;
  ballObj.dx = 6 * (Math.random() * 2 - 1);
  ballObj.dy = -6;
}
