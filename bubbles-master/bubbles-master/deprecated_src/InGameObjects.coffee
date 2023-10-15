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

  update: ->
    @x += @x_velocity
    @y += @y_velocity


class RectangleMovingInGameObject extends MovingInGameObject
  constructor: (x, y, @width, @height, x_velocity, y_velocity, fill_style, stroke_style, line_width, active) ->
    super(x, y, x_velocity, y_velocity, fill_style, stroke_style, line_width, active)

  inBounds: ->
    @x >= 0 and
    @x <= CANVAS_WIDTH and
    @y >= 0 and
    @y <= CANVAS_HEIGHT

  getF: ->
    @radius*@radius*Math.PI

  setF: (newF) ->
    @radius = Math.sqrt(newF/Math.PI)

  addF: (plusF) ->
    @setF(@getF()+plusF)


  update: ->
    super()
    @testViability()

  testViability: ->
    @active = @active and inBounds()

  draw: (fill=true, stroke=false) ->
    if fill
      #gcc.fillStyle = @fill_style
      #gcc.fillRect(@x, @y, @width, @height)
      tcc.fillStyle = @fill_style
      tcc.fillRect(@x, @y, @width, @height)
    if stroke
      #gcc.strokeStyle = @stroke_style
      #gcc.strokeRect(@x,@y,@width,@height)
      tcc.fillStyle = @fill_style
      tcc.fillRect(@x, @y, @width, @height)

class CircleMovingInGameObject extends RectangleMovingInGameObject
  constructor: (@cx, @cy, @radius, x_velocity, y_velocity, fill_style, stroke_style, active) ->
    @setCircleBox()
    super(@x, @y, @width, @height, x_velocity, y_velocity, fill_style, stroke_style, active)

  #we emulate a box around every circle to support some rectangle methods
  setCircleBox: ->
    @width = @height = @radius * 2
    @x = @cx - @radius
    @y = @cy - @radius

  update: ->
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

  testViability: ->
    @active = @active and @radius > MINIMAL_VIABLE_RADIUS

  #draw: (fill=true, stroke=false, drawbox=false) ->
  #  super(false,true) if drawbox
  #  if fill
  #    gcc.fillStyle = @fill_style?.toString()
  #    gcc.fillCircle(@cx, @cy, @radius)
  #
  #  if stroke
  #    gcc.strokeStyle = @stroke_style
  #    gcc.strokeCircle(@cx, @cy, @radius)

  #streamlined version for better performance
  draw: () ->
    x=(0.5 + @cx) | 0
    y=(0.5 + @cy) | 0
    #gcc.fillStyle = @fill_style.toString()
    ##gcc.fillCircle(x, y, @radius)
    #gcc.strokeStyle = @stroke_style
    ##gcc.strokeCircle( x, y, @radius)
    #gcc.drawCircle(x,y,@radius)
    tcc.fillStyle = @fill_style.toString()
    tcc.strokeStyle = @stroke_style
    tcc.drawCircle(x,y,@radius)

  inBounds: ->
    @cx > (@radius * -1) and
    @cx < (CANVAS_WIDTH + @radius) and
    @cy > (@radius * -1) and
    @cy < (CANVAS_HEIGHT + @radius)

  join: (another_circle) ->
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

  explode: ->
    @active=false
    explosions.push(new Explosion(@))