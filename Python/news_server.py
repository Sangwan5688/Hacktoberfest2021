from flask import Flask,render_template,redirect,url_for,request,session
from flask_pymongo import PyMongo
import requests

app=Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/FlaskApp"
app.config["SECRET_KEY"]='asdf;alsdkf'
db = PyMongo(app).db
is_loggedin=False

@app.route("/")
def home():
    if is_loggedin:
        if 'email' in session:
            email=session['email']
            find_user=db.registrations.find_one({'email':email})
            if find_user:
                return render_template("index.html",find_user=find_user,is_loggedin=is_loggedin)
        return render_template("index.html")
    else:
        return redirect(url_for('login'))

@app.route("/register",methods=['GET','POST'])
def register():
    if request.method=='POST':
        new_user={
            'name':request.form.get('name'),
            'email':request.form.get('email'),
            'password':request.form.get('password'),
            'c_password':request.form.get('c_password'),
        }
        if new_user['password']==new_user['c_password']:
            db.registrations.insert_one(new_user)
            return redirect(url_for('login'))
        else:
            msg="passwords didn't match"
            return render_template("register.html",msg=msg)
    return render_template("register.html")

@app.route("/login",methods=['GET','POST'])
def login():
    if request.method=='POST':
        current_mail=request.form.get('email')
        current_password=request.form.get('password')
        existing_user=db.registrations.find_one({'email':current_mail})
        if current_password==existing_user['password']:
            session['email']=existing_user['email']
            global is_loggedin
            is_loggedin=True
            return redirect(url_for('home'))
        else:
            msg="incorrect credentials"
            return render_template("login.html",msg=msg)
    return render_template("login.html")

@app.route("/news")
def news():
    if is_loggedin:
        get_news_data=requests.get('https://newsapi.org/v2/everything?q=tesla&from=2023-05-22&sortBy=publishedAt&apiKey=b13a8a18d733456d9011e4d63aa6ed79').json()
        all_articles=get_news_data['articles']
        if 'email' in session:
            email=session['email']
            find_user=db.registrations.find_one({'email':email})
            if find_user:
                return render_template("news.html",find_user=find_user,is_loggedin=is_loggedin,all_articles=all_articles)
        return render_template("news.html")
    else:
        return redirect(url_for('login'))

@app.route("/contact")
def contact():
    if is_loggedin:
        if 'email' in session:
            return render_template("contact.html",is_loggedin=is_loggedin)
        return render_template("contact.html")
    else:
        return redirect(url_for('login'))

@app.route("/logout")
def logout():
    session.pop("email",None)
    global is_loggedin
    is_loggedin=False
    return redirect(url_for('login'))

if __name__=="__main__":
    app.run(debug=True)
