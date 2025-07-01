from flask import Flask, jsonify
from flask_cors import CORS
import os
import datetime

app = Flask(__name__)
CORS(app)

data = {
    "voltage": 18.7,
    "current": 2.2,
    "power": 41.14,
    "timestamp": datetime.datetime.now().strftime("%H:%M:%S")
}

@app.route('/')
def home():
    return "Solar Backend is Live!"

@app.route('/data')
def get_data():
    return jsonify(data)

port = int(os.environ.get("PORT", 5000))
app.run(host='0.0.0.0', port=port)
