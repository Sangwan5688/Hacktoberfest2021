from PyQt5.QtWidgets import *
import sys
from PyQt5.QtWebEngineWidgets import *
from PyQt5.QtCore import *

class MainWindow(QMainWindow):
    def __init__(self):
        super(MainWindow,self).__init__()


        self.browser=QWebEngineView()
        self.browser.setUrl(QUrl('https://duckduckgo.com/'))
        self.setCentralWidget(self.browser)
        self.showMaximized()

        navbar=QToolBar()
        self.addToolBar(navbar)

        home=QAction('Home',self)
        home.triggered.connect(self.nav_home)
        navbar.addAction(home)


        back=QAction('<--',self)
        back.triggered.connect(self.browser.back)
        navbar.addAction(back)

        forward = QAction('-->', self)
        forward.triggered.connect(self.browser.forward)
        navbar.addAction(forward)

        reload = QAction('Reload', self)
        reload.triggered.connect(self.browser.reload)
        navbar.addAction(reload)

        self.url_bar=QLineEdit()
        self.url_bar.returnPressed.connect(self.nav_to_url)
        navbar.addWidget(self.url_bar)

        self.browser.urlChanged.connect(self.update_url)

        home = QAction('About Me!', self)
        home.triggered.connect(self.nav_about)
        navbar.addAction(home)

        home = QAction('Play a Game!', self)
        home.triggered.connect(self.nav_game)
        navbar.addAction(home)

    def nav_to_url(self):
        url=self.url_bar.text()
        self.browser.setUrl(QUrl(url))

    def update_url(self,q):
        self.url_bar.setText(q.toString())

    def nav_home(self):
        self.browser.setUrl(QUrl('https://duckduckgo.com/'))
    def nav_game(self):
        self.browser.setUrl(QUrl('http://nurshatfatehali.42web.io/'))
    def nav_about(self):
        self.browser.setUrl(QUrl('https://nurshatfateh.github.io'))


app=QApplication(sys.argv)
QApplication.setApplicationName('Basic Browser')
window=MainWindow()
app.exec_()
