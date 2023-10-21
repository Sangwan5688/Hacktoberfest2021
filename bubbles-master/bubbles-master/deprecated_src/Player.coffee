#player
class Player extends CircleMovingInGameObject
  constructor: (x, y, radius) ->


    #super(x, y, radius, 0, 0, 'rgba(255,0,0,0.9)', 'black')
    super(x, y, radius, 0, 0, new Rgba(255,0,0,0.9), 'black')
    @last_bullet_shot = 0
    @age = 0
  shoot: ->
    [x,y] = @gunpoint()
    (bullets.push(new Bullet(x,y,@radius*BULLET_SHOOTER_RATIO,@x_velocity*2, @y_velocity*2)); @last_bullet_shot = @age) if @last_bullet_shot + 10 < @age
    @radius = @radius * (1 - SHOOTER_SHOOT_LOSS)

  gunpoint: ->
    [@x+@width/2,@y+@height/2]

  update: ->
    @age++
    #player movements
    #if keydown.left then @cx -= 5
    if keydown.left and -MAX_USER_SPEED <= @x_velocity then @x_velocity = @x_velocity - DEFAULT_USER_ACCELERATION
    #if keydown.right then @cx += 5
    if keydown.right and @x_velocity <= MAX_USER_SPEED then @x_velocity = @x_velocity + DEFAULT_USER_ACCELERATION
    #if keydown.up then @cy -=5
    if keydown.up and -MAX_USER_SPEED <= @y_velocity then @y_velocity = @y_velocity - DEFAULT_USER_ACCELERATION
    #if keydown.down then @cy += 5
    if keydown.down and @y_velocity <= MAX_USER_SPEED then @y_velocity = @y_velocity + DEFAULT_USER_ACCELERATION

    @setCircleBox()

    #player special movements
    if keydown.space then @shoot()
    super()

  draw: ->
    super(true,true)
