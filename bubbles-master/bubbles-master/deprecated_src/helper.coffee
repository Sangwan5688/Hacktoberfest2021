
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

maxEnemySize = (player) ->
  return Math.sqrt(player.radius) * PROPORTION_MAX_NEW_ENEMY_SIZE

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
  #x = Math.floor(x)
  #y = Math.floor(y)
  @beginPath()
  @arc(x,y,radius,0,2*Math.PI)
  @fill()

CanvasRenderingContext2D::strokeCircle = (x,y,radius) ->
  #console.log(@)
  @beginPath()
  @arc(x,y,radius,0,2*Math.PI)
  @stroke()

CanvasRenderingContext2D::drawCircle = (x,y,radius) ->
  @beginPath()
  @arc(x,y,radius,0,2*Math.PI)
  @fill()
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
