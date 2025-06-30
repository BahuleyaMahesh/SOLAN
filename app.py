from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import csv, os

app = Flask(__name__)
CORS(app)

DATA_FILE = "solar_data.csv"

# Create CSV if it doesn't exist
if not os.path.exists(DATA_FILE):
    with open(DATA_FILE, "w") as f:
        f.write("timestamp,voltage,current,power\n")

@app.route('/upload', methods=['POST'])
def upload():
    data = request.get_json()
    voltage = float(data.get('voltage', 0))
    current = float(data.get('current', 0))
    power = voltage * current
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    with open(DATA_FILE, "a") as f:
        f.write(f"{timestamp},{voltage},{current},{power}\n")

    return jsonify({"status": "success", "message": "Data saved"}), 200

@app.route('/data', methods=['GET'])
def get_data():
    records = []
    with open(DATA_FILE, "r") as f:
        next(f)  # skip header
        for line in f:
            timestamp, voltage, current, power = line.strip().split(",")
            records.append({
                "timestamp": timestamp,
                "voltage": float(voltage),
                "current": float(current),
                "power": float(power)
            })
    return jsonify(records)

if __name__ == '__main__':
    app.run()
