class Explosion extends CircleMovingInGameObject
  constructor: (ex_circle) ->
    super(ex_circle.cx, ex_circle.cy, ex_circle.radius, 0,0, ex_circle.fill_style, ex_circle.stroke_style)
 # super(x, y, radius, x_velocity, y_velocity, 'yellow', 'black')

  update: ->
    #console.log(@)
    #super()
    #console.log(gcc)
    if @fill_style.a
      @fill_style.a = @fill_style.a - 0.05
      if @fill_style.a <= 0 then @active = false
    @radius = @radius + 10

  draw: ->
    super(true,true)
