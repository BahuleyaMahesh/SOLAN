from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

# In-memory log of data
solar_log = []

@app.route('/')
def home():
    return "☀️ Solar Dashboard Backend Running"

@app.route('/data', methods=['GET'])
def get_data():
    if not solar_log:
        return jsonify({"error": "No data available"}), 404
    return jsonify(solar_log[-1])  # Return latest reading

@app.route('/upload', methods=['POST'])
def upload_data():
    try:
        data = request.json
        voltage = float(data['voltage'])
        current = float(data['current'])
        power = round(voltage * current, 2)
        timestamp = datetime.now().strftime('%H:%M:%S')

        entry = {
            'voltage': voltage,
            'current': current,
            'power': power,
            'timestamp': timestamp
        }

        solar_log.append(entry)
        return jsonify({"message": "Data received", "entry": entry}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
