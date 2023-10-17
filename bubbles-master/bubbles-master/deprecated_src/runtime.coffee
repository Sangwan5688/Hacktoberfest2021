#RUNTIME
runtime = (time) ->
    update()
    draw()
    #TODO: make a pollyfill for crossbrowser support
    window.requestAnimFrame(runtime, gc)

 #the update methode, executed before every draw
 #warning, this method if full of side effects
update = ->

  #we check for coliding enemies
  for enemy in enemies
    do (enemy) ->
      for enemy2 in enemies when ((enemy2 isnt enemy) and circleCollides(enemy, enemy2) and (enemy2.active and enemy.active))
        do (enemy) ->
          #console.log('enemy join')
          enemy.join(enemy2)

  #we check if a player colides with an enemy
  for enemy in enemies when circleCollides(enemy, player1)
   do (enemy) ->
     player1.join(enemy)

  #we check if a bulet collides with an enemy
  for bullet in bullets
    do (bullet) ->
      #todo get tge Explosion dependency out of the enemy into the runtime
     (enemy.explode(); bullet.active=false) for enemy in enemies when circleCollides(bullet, enemy)

  #we update all enemies and create a new enemies array
  active_enemies =  ( do -> (enemy.update(); enemy) for enemy in enemies when enemy.active)
  enemies = null
  enemies = active_enemies

  #we update all explosions
  explosions =  ( do -> (explosion.update(); explosion) for explosion in explosions when explosion.active)

  #we update all bullets and create a new bullets array
  bullets = ( do -> (bullet.update(); bullet) for bullet in bullets when bullet.active)

  #we update the player
  player1.update()

  #now is a good time to -maybe- create a new enemy
  if enemies.length < MAX_NUMBER_ENEMIES
    enemies.push(new Enemy(MIN_NEW_ENEMY_SIZE+Math.random()*maxEnemySize(player1))) if Math.random() < NEW_ENEMY_PROPABILITY

  #check if an end of game event occured
  if player1.active == false then (start())
  if player1.radius*1.2 > CANVAS_HEIGHT then (start())
  return

#the main draw method, exectued after every update
draw = ->
  tcc.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT)
  #gcc.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT)
  #TODO the draw-method of the objects only deliver the information on what to draw, the actuall drawing is done by this method
  player1.draw()
  do bullet.draw for bullet in bullets
  do enemy.draw for enemy in enemies
  do explosion.draw for explosion in explosions
  gcc.drawImage(tcc,0,0)
  console.log('new')
