import pyqrcode 
s = input('Enter the url/text you want to encode(ex : www.spyrosigma.com) : ')
url = pyqrcode.create(s) 
url.svg("Hmm.svg", scale = 20) #We can use this in browser(Scalable Vector graphics)
url.png('Hmm.png', scale = 20) 
print('Doneeee ! Check folder for png and svg images')
