
class Bullet extends CircleMovingInGameObject
  constructor: (x, y, radius=3, x_velocity, y_velocity ) ->
    super(x, y, radius, x_velocity, y_velocity, 'yellow', 'black')

  draw: ->
    super(true,true)
