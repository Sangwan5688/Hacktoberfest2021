from flask import Flask

app = Flask(__name__)

count = 0

@app.route('/', methods=['GET'])
def return_unique_num():
    global count
    count += 1
    if (count > 50):
      count = 1
    if (count == 1):
      user_role = "moderator"
    else:
      user_role = "participant"
    return {"user_id": count, "user_role":user_role}

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=80)
