import requests

url = "https://solar-backend-jdxk.onrender.com/upload"

# You can change these values to simulate new entries
test_data = {
    "voltage": 19.5,
    "current": 2.3
}

response = requests.post(url, json=test_data)

print("Status:", response.status_code)
print("Response:", response.json())
