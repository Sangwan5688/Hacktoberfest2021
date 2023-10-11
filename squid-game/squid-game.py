from ursina import *
from random import randint


def update():
    global score, text, run
    if run:
        for squid in squids:
            squid.x -= time.dt * squid.speed
            if squid.x < -randint(8, 14):
                squid.x = randint(8, 14)
                squid.y = randint(-36, 36) * 0.1
                squid.speed = randint(1, 3)

        for bullet in bullets:
            bullet.x += time.dt * bullet.speed

            # collision with bullet
            hit_info = bullet.intersects()
            if hit_info.hit:
                bullet.z = 1

                if hit_info.entity in squids:
                    score += 1
                    text.y = 1
                    text = Text(text=f"Score: {score}", position=(-0.65, 0.4), origin=(0, 0), scale=2,
                                color=color.yellow, background=True)

                    CreateBubbles(hit_info.entity.x, hit_info.entity.y)

                    hit_info.entity.x = randint(8, 14)
                    hit_info.entity.y = randint(-36, 36) * 0.1

                    # Collision with submarine
    hit_info = submarine.intersects()
    if hit_info.hit:
        run = False
        Entity(model='quad', scale=(20, 10), texture='assets/deepwater.png', z=0.1)
        Text(text='You lost! Reload the game!', origin=(0, 0), scale=2, color=color.yellow, background=True)


def CreateBubbles(x, y):
    num = 10
    e = [None] * num
    for i in range(num):
        e[i] = Bubbles(x, y)


class Squid(Entity):
    def __init__(self, x, y, speed):
        super().__init__()
        self.model = 'quad'
        self.scale = (2, 1)
        self.x = x
        self.y = y
        self.speed = speed
        self.texture = 'assets/squid.png'
        self.collider = 'box'


class Bullet(Entity):
    def __init__(self):
        super().__init__()
        self.model = 'quad'
        self.texture = 'assets/bullet.png'
        self.scale = 0.8
        self.x = submarine.x + 1.4
        self.y = submarine.y - 0.18
        self.speed = 3
        self.collider = 'box'


class Bubbles(Entity):
    def __init__(self, x, y):
        super().__init__()
        self.model = 'circle'
        self.scale = 0.5
        self.x = x
        self.y = y

    def update(self):
        self.x += random.randint(-2, 2) / 100
        self.y += random.randint(0, 2) / 50

        self.scale -= 0.008

        if self.scale <= 0.005:
            destroy(self)


def input(key):
    global bullets, run
    if run:
        if key == "up arrow" or key == "up arrow hold":
            submarine.y += 0.25
        if key == "down arrow" or key == "down arrow hold":
            submarine.y -= 0.25

        if key == "space":
            Audio('assets/laser_sound.wav')
            bullet = Bullet()
            bullets.append(bullet)


app = Ursina()

score = 0
run = True

bg = Entity(model='quad', scale=(20, 10), texture='assets/deepwater.png', z=0.1)

submarine = Animation(
    'assets//submarine',
    collider='box',
    scale=(2, 1),
    x=-3,
    y=1
)

num = 8
squids = [None] * num
for i in range(num):
    x = randint(8, 14)
    y = randint(-36, 36) * 0.1
    speed = randint(1, 3)
    squids[i] = Squid(x, y, speed)

bullets = []

text = Text(text=f"Score: {score}", position=(-0.65, 0.4), origin=(0, 0), scale=2, color=color.yellow, background=True)

app.run()