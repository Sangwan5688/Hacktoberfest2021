import sports

from pynotifier import Notification

Matchinfo = sports.get_sport("CRICKET")

Notification(title= "IPL LIVE SCORE UPDATES",
description= str(Matchinfo),duration=60
).send()
