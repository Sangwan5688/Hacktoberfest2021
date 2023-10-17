#CONSTANTS
CANVAS_WIDTH = 800
CANVAS_HEIGHT = 600
ENEMIES_PROPABILITY = 0.2
DEFAULT_SPEED = 0.5
DEFAULT_USER_SPEED = 0.1
MAX_NUMBER_ENEMIES = 10
DEFAULT_LINE_WIDTH = 2
DEFAULT_FILL_STYLE = 'black'
DEFAULT_STROKE_STYLE = 'black'
DEFAULT_POSITIVE_CIRCLE_JOIN_RATE = 0.5
DEFAULT_NEGATIVE_CIRCLE_JOIN_RATE = 1
MINIMAL_VIABLE_RADIUS = 1
MAX_ENEMY_RADIUS = 750
NEW_ENEMY_PROPABILITY = 0.01
BULLET_SHOOTER_RATIO = 0.2
SHOOTER_SHOOT_LOSS = 0.01
PROPORTION_MAX_NEW_ENEMY_SIZE = 2.0
MIN_NEW_ENEMY_SIZE = MINIMAL_VIABLE_RADIUS
#INIT
##defining the game canvas
ge = game_element = $("<canvas width='#{CANVAS_WIDTH}' height='#{CANVAS_HEIGHT}'></canvas>")
gc = game_canvas = game_element.get(0)
gcc = game_canvas_context = game_canvas.getContext("2d")


#game globals
game = @
bullets = []
enemies = []
explosions = []
player1 = {}
s_t_a_r_t = false


#GLOBAL CLASSES

#an abstract class for all game objects in the game
class InGameObject
  constructor: (@active=true, @fill_style=DEFAULT_FILL_STYLE, @stroke_style=DEFAULT_STROKE_STYLE, @line_width=DEFAULT_LINE_WIDTH) ->
    gcc.fillStyle = @fills_style
    gcc.strokeStyle = @stroke_style
    gcc.lineWidth = @line_width

class MovingInGameObject extends InGameObject
  constructor: (@x, @y, @x_velocity = 0, @y_velocity = 0, fill_style, stroke_style, line_width, active) ->
    super(active, fill_style, stroke_style, line_width)

  update: =>
    @x += @x_velocity
    @y += @y_velocity


class RectangleMovingInGameObject extends MovingInGameObject
  constructor: (x, y, @width, @height, x_velocity, y_velocity, fill_style, stroke_style, line_width, active) ->
    super(x, y, x_velocity, y_velocity, fill_style, stroke_style, line_width, active)

  inBounds: =>
    @x >= 0 and
    @x <= CANVAS_WIDTH and
    @y >= 0 and
    @y <= CANVAS_HEIGHT

  getF: =>
    @radius*@radius*Math.PI

  setF: (newF) =>
    @radius = Math.sqrt(newF/Math.PI)

  addF: (plusF) =>
    @setF(@getF()+plusF)


  update: =>
    super()
    @testViability()

  testViability: =>
    @active = @active and inBounds()

  draw: (fill=true, stroke=false) =>
    if fill
      gcc.fillStyle = @fill_style
      gcc.fillRect(@x, @y, @width, @height)
    if stroke
      gcc.strokeStyle = @stroke_style
      gcc.strokeRect(@x,@y,@width,@height)

class CircleMovingInGameObject extends RectangleMovingInGameObject
  constructor: (@cx, @cy, @radius, x_velocity, y_velocity, fill_style, stroke_style, active) ->
    @setCircleBox()
    super(@x, @y, @width, @height, x_velocity, y_velocity, fill_style, stroke_style, active)

  #we emulate a box around every circle to support some rectangle methods
  setCircleBox: =>
    @width = @height = @radius * 2
    @x = @cx - @radius
    @y = @cy - @radius

  update: =>
    @cx += @x_velocity
    @cy += @y_velocity
    @setCircleBox()

    if @inBounds() is false
      if @cx < 0
        @cx = CANVAS_WIDTH + (@cx * -1)
      else if @cx > CANVAS_WIDTH
        @cx = (@cx - CANVAS_WIDTH) * -1

      if @cy < 0
        @cy = CANVAS_HEIGHT + (@cy * -1)
      else if @cy > CANVAS_HEIGHT
        @cy = (@cy - CANVAS_HEIGHT) * -1

    super()

    #limiting the potential radius of a bubble
    #@radius = MAX_ENEMY_RADIUS if @radius > MAX_ENEMY_RADIUS

    @testViability()

  testViability: =>
    @active = @active and @radius > MINIMAL_VIABLE_RADIUS

  draw: (fill=true, stroke=false, drawbox=false) =>
    super(false,true) if drawbox
    if fill
      gcc.fillStyle = @fill_style?.toString()
      gcc.fillCircle(@cx, @cy, @radius)

    if stroke
      gcc.strokeStyle = @stroke_style
      gcc.strokeCircle(@cx, @cy, @radius)

   #super(false,true)

  inBounds: =>
    @cx > (@radius * -1) and
    @cx < (CANVAS_WIDTH + @radius) and
    @cy > (@radius * -1) and
    @cy < (CANVAS_HEIGHT + @radius)

  join: (another_circle) =>
    #console.log (@radius+' '+another_circle.radius)
    return false if not @active
    return false if not another_circle.active
    return false if @radius < MINIMAL_VIABLE_RADIUS
    return false if another_circle.radius < MINIMAL_VIABLE_RADIUS
    winner = false
    looser = false
    if @radius > another_circle.radius
      winner = @
      looser = another_circle
      #oldLooserF = another_circle.getF()
      #another_circle.radius = another_circle.radius - DEFAULT_NEGATIVE_CIRCLE_JOIN_RATE
      #newLooserF =  another_circle.getF()
      #@addF(oldLooserF-newLooserF)
      #@radius = @radius + DEFAULT_POSITIVE_CIRCLE_JOIN_RATE #if @radius < 100

    else if @radius < another_circle.radius
      winner = another_circle
      looser = @
      #another_circle.radius = another_circle.radius + DEFAULT_POSITIVE_CIRCLE_JOIN_RATE #  if another.radius < 100
      #@radius = @radius - DEFAULT_NEGATIVE_CIRCLE_JOIN_RATE
    else #bounce
      #@x_velocity = @x_velocity * -1
      #@y_velocity = @y_velocity * -1
      if Math.random() > 0.5 then @explode() else another_circle.explode()

    if (winner and looser)
      oldLooserF =looser.getF()
      looser.radius = looser.radius - DEFAULT_NEGATIVE_CIRCLE_JOIN_RATE
      newLooserF =  looser.getF()
      winner.addF(oldLooserF-newLooserF)

    @testViability()

  explode: =>
    @active=false
    explosions.push(new Explosion(@))


#player
class Player extends CircleMovingInGameObject
  constructor: (x, y, radius) ->


    #super(x, y, radius, 0, 0, 'rgba(255,0,0,0.9)', 'black')
    super(x, y, radius, 0, 0, new Rgba(255,0,0,0.9), 'black')
    @last_bullet_shot = 0
    @age = 0
  shoot: =>
    [x,y] = @gunpoint()
    (bullets.push(new Bullet(x,y,@radius*BULLET_SHOOTER_RATIO,@x_velocity*2, @y_velocity*2)); @last_bullet_shot = @age) if @last_bullet_shot + 10 < @age
    @radius = @radius * (1 - SHOOTER_SHOOT_LOSS)

  gunpoint: =>
    [@x+@width/2,@y+@height/2]

  update: =>
    @age++
    #player movements
    #if keydown.left then @cx -= 5
    if keydown.left then @x_velocity = @x_velocity - DEFAULT_USER_SPEED
    #if keydown.right then @cx += 5
    if keydown.right then @x_velocity = @x_velocity + DEFAULT_USER_SPEED
    #if keydown.up then @cy -=5
    if keydown.up then @y_velocity = @y_velocity - DEFAULT_USER_SPEED
    #if keydown.down then @cy += 5
    if keydown.down then @y_velocity = @y_velocity + DEFAULT_USER_SPEED

    @setCircleBox()

    #player special movements
    if keydown.space then @shoot()
    super()

  draw: =>
    super(true,true)



class Explosion extends CircleMovingInGameObject
  constructor: (ex_circle) ->
    super(ex_circle.cx, ex_circle.cy, ex_circle.radius, 0,0, ex_circle.fill_style, ex_circle.stroke_style)
 # super(x, y, radius, x_velocity, y_velocity, 'yellow', 'black')

  update: =>
    #console.log(@)
    #super()
    #console.log(gcc)
    if @fill_style.a
      @fill_style.a = @fill_style.a - 0.05
      if @fill_style.a <= 0 then @active = false
    @radius = @radius + 10

  draw: =>
    super(true,true)


class Bullet extends CircleMovingInGameObject
  constructor: (x, y, radius=3, x_velocity, y_velocity ) ->
    super(x, y, radius, x_velocity, y_velocity, 'yellow', 'black')

  draw: =>
    super(true,true)

#the bubbles
class Enemy extends CircleMovingInGameObject
  constructor: (radius = 10+Math.random()*10) ->
    radius = MAX_ENEMY_RADIUS if radius > MAX_ENEMY_RADIUS
    #where to place the bubble
    where_to_place_the_bubble = Math.random()
    if where_to_place_the_bubble < 0.25
      #top
      y = -radius
      x = Math.random() * CANVAS_WIDTH
      y_velocity = DEFAULT_SPEED
      x_velocity = (DEFAULT_SPEED * -1) + Math.random()*(1+DEFAULT_SPEED)
    else if where_to_place_the_bubble < 0.50
      #bottom
      y = CANVAS_HEIGHT + radius
      x = Math.random() * CANVAS_WIDTH
      y_velocity = (DEFAULT_SPEED * -1)
      x_velocity = (DEFAULT_SPEED * -1) * Math.random()*(1+DEFAULT_SPEED)
    else if where_to_place_the_bubble < 0.75
      #left
      y = Math.random() * CANVAS_HEIGHT
      x = -radius
      x_velocity = 1
      y_velocity = (DEFAULT_SPEED * -1) * Math.random()*(1+DEFAULT_SPEED)
    else
      #right
      y = Math.random() * CANVAS_HEIGHT
      x = CANVAS_WIDTH + radius
      x_velocity = (DEFAULT_SPEED * -1)
      y_velocity = (DEFAULT_SPEED * -1) * Math.random()*(1+DEFAULT_SPEED)

    @age = 0
    #new Rgba(255,0,0,0.9)
    #super(x, y, radius, x_velocity, y_velocity, 'rgba('+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+',0.7)', 'rgb(0,0,255)')
    super(x, y, radius, x_velocity, y_velocity, new Rgba(Math.floor(Math.random()*255),Math.floor(Math.random()*255),Math.floor(Math.random()*255),0.7), 'rgb(0,0,255)')

  update: =>
    super()
    @stroke_style = 'black' if @radius > player1.radius
    @stroke_style = 'darkred' if @radius >=  MAX_ENEMY_RADIUS
    @stroke_style = 'blue' if @radius < player1.radius




  draw: =>
    super(true, true)

  join: (another_circle) =>
    super(another_circle)
    @radius = MAX_ENEMY_RADIUS if @radius >  MAX_ENEMY_RADIUS













#RUNTIME
runtime = (time) ->
    update()
    draw()
    #TODO: make a pollyfill for crossbrowser support
    window.webkitRequestAnimationFrame(runtime, gc)

 #the update methode, executed before every draw
update = ->

  for enemy in enemies
    do (enemy) ->
      for enemy2 in enemies when ((enemy2 isnt enemy) and circleCollides(enemy, enemy2) and (enemy2.active and enemy.active))
        do (enemy) ->
          #console.log('enemy join')
          enemy.join(enemy2)

  #check for player/enemy joins
  for enemy in enemies when circleCollides(enemy, player1)
   do (enemy) ->
     player1.join(enemy)

  #we test for bullet / enemy collision
  for bullet in bullets
    do (bullet) ->
     (enemy.explode(); bullet.active=false) for enemy in enemies when circleCollides(bullet, enemy)

  #we update all enemies and create a new enemies array
  #console.log(enemies)
  enemies =  ( do -> (enemy.update(); enemy) for enemy in enemies when enemy.active)

  #we update all explosions
  explosions =  ( do -> (explosion.update(); explosion) for explosion in explosions when explosion.active)

  #we update all bullets and create a new bullets array
  bullets = ( do -> (bullet.update(); bullet) for bullet in bullets when bullet.active)

  #player
  player1.update()

  #now is a good time to -maybe- create a new enemy
  # TODO: add one to the number of enemies for every bullet fired
  if enemies.length < MAX_NUMBER_ENEMIES
    enemies.push(new Enemy(MIN_NEW_ENEMY_SIZE+Math.random()*(player1.radius*PROPORTION_MAX_NEW_ENEMY_SIZE))) if Math.random() < NEW_ENEMY_PROPABILITY

  #doesn't make sanes to return anything right now
  #
  #
  #check if an end of game event occured
  if player1.active == false then (start())
  if player1.radius*1.2 > CANVAS_HEIGHT then (start())
  return

#the main draw method, exectued after every update
draw = ->
  #console.log 'draw'
  gcc.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT)

  player1.draw()
  #player2.draw()
  do bullet.draw for bullet in bullets
  #console.log(enemies)
  do enemy.draw for enemy in enemies
  do explosion.draw for explosion in explosions





#collision

rectCollides = (a,b) ->
  a.x < b.x + b.width &&
  a.x + a.width > b.x &&
  a.y < b.y + b.height &&
  a.y + a.height > b.y

#circleCollides
circleCollides = (c1,c2) ->
  if rectCollides(c1,c2)
    #c2 = a2 + b2
    a = c2.cx - c1.cx
    b = c2.cy - c1.cy
    c = Math.sqrt(a*a + b*b)
    if (c - c1.radius - c2.radius) < 0
      return true
  return false



#helpers
#keydown helper
window.keydown = {}

keyName = (event) ->
  $.hotkeys.specialKeys[event.which] or String.fromCharCode(event.which).toLowerCase();

$(document).bind("keydown", ((event) ->
#  console.log 'keydown: "' + keyName(event)+'"'
  keydown[keyName(event)] = true;
  ))

$(document).bind("keyup", ((event) ->
#  console.log 'keyup: "' + keyName(event)+'"'
  keydown[keyName(event)] = false;
  ))

#extending root objects
#clamp (return min number is number is not within a certain range)
Number::clamp = (min, max) -> Math.min(Math.max(this, min), max)

#drawing helpers

# a canvas full circle
CanvasRenderingContext2D::fillCircle = (x,y,radius) ->
  #console.log(@)
  @beginPath()
  @arc(x,y,radius,0,2*Math.PI)
  @fill()

CanvasRenderingContext2D::strokeCircle = (x,y,radius) ->
  #console.log(@)
  @beginPath()
  @arc(x,y,radius,0,2*Math.PI)
  @stroke()

class Rgb
  constructor: (@r=0,@g=0,@b=0) ->
  toString: -> 'rgba('+@r+','+@g+','+@b+')'

class Rgba extends Rgb
  constructor: (r=0,g=0,b=0,@a=1) -> super(r,g,b)
  toString: -> 'rgba('+@r+','+@g+','+@b+','+@a+')'


#animator frame helper
#window.requestAnimFrame = ((callback) ->
#    return window.requestAnimationFrame ||
#    window.webkitRequestAnimationFrame ||
#    window.mozRequestAnimationFrame ||
#    window.oRequestAnimationFrame ||
#    window.msRequestAnimationFrame ||
#    (callback) ->
#        window.setTimeout(callback, 1000 / 60)
#)()

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

#console.dir(webkitRequestAnimationFrame)