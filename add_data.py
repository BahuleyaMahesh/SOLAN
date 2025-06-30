import requests

data_points = [
    {"voltage": 19.2, "current": 2.1},
    {"voltage": 20.0, "current": 1.8},
    {"voltage": 18.7, "current": 2.0},
    {"voltage": 17.9, "current": 2.2},
]

for point in data_points:
    response = requests.post("http://localhost:5000/upload", json=point)
    print(response.json())
