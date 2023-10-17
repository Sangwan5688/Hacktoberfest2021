import data from "../../../data";
import ResetBall from "./ResetBall";
export default function AllBroken(bricks, player, canvas, ballObj) {
  let { brickObj, paddleProps } = data;
  //   if (bricks.length === 0) {
  //     return;
  //   }
  let total = 0;
  for (let i = 0; i < bricks.length; i++) {
    if (bricks[i].broke === true) {
      total++;
    }
  }
  if (total === bricks.length) {
    player.level++;
    ResetBall(ballObj, canvas, paddleProps);
    brickObj.y = 50;
  }
}
