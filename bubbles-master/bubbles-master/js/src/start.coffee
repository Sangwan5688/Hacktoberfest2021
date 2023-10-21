
#START
#adding the game canvas to the game
$('#gamearea').append(game_element)
#player1 = new Player(CANVAS_WIDTH/2,CANVAS_HEIGHT/2,20)

#player2 = new Player(75,75,12)

console.log(player1)


start = ->
  enemies = []
  bullets = []
  explosions = []
  player1 = new Player(CANVAS_WIDTH/2,CANVAS_HEIGHT/2,20)


start()
runtime()

