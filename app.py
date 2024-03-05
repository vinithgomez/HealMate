from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['HealMate']
collection = db['Dataset']

# Define API endpoints
@app.route('/api/data', methods=['GET'])
def get_data():
    data = []
    for doc in collection.find():
        # print(doc)
        data.append({
            'id': str(doc['65e6b9c63bac786772327572']),
            'name': doc['name'],
            'description': doc['description']
        })
    response = jsonify({'data': data})
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

@app.route('/api/data', methods=['POST'])
def add_data():
    data = request.json
    if 'name' not in data or 'description' not in data:
        return jsonify({'error': 'Missing data fields'}), 400

    new_data = {
        'name': data['name'],
        'description': data['description']
    }
    result = collection.insert_one(new_data)
    return jsonify({'message': 'Data added successfully', 'id': str(result.inserted_id)}), 201

if __name__ == '__main__':
    app.run(debug=True)
    