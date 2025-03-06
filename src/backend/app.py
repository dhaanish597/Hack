from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import pickle
import numpy as np
import logging
import os

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure logging
logging.basicConfig(level=logging.INFO)

# Load trained models
crop_model = None
fertilizer_model = None

try:
    if os.path.exists('models/NutriSoil_NB.pkl') and os.path.exists('models/random_forest_model.pkl'):
        with open('models/NutriSoil_NB.pkl', 'rb') as file:
            crop_model = pickle.load(file)
        with open('models/random_forest_model.pkl', 'rb') as file:
            fertilizer_model = pickle.load(file)
        logging.info("✅ Models loaded successfully.")
    else:
        logging.error("❌ Model files not found in 'models/' directory.")
except Exception as e:
    logging.error(f"⚠️ Error loading models: {e}")

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        
        if not crop_model or not fertilizer_model:
            raise ValueError("Models are not loaded correctly.")
        
        logging.info(f"📥 Received input: {data}")
        
        # Extract input values safely
        try:
            features = np.array([
                float(data['N']), float(data['P']), float(data['K']), 
                float(data['Zn']), float(data['SOC']), float(data['B']),
                float(data['temperature']), float(data['humidity']),
                float(data['ph']), float(data['rainfall']),float(10.0),float(12.9)
            ]).reshape(1, -1)
        except ValueError as ve:
            logging.error(f"❌ Invalid input values: {ve}")
            return jsonify({'error': 'Invalid input values. Ensure all fields contain numeric values.'}), 400
        if crop_model.n_features_in_ == 3:
            crop_features = features[:, :3]  # Select first 3 values (N, P, K) if required
        else:
            crop_features = features  # Use full features if needed

        if fertilizer_model.n_features_in_ == 10:
            fertilizer_features = features  # Use all 10 values
        else:
            fertilizer_features = features[:, :fertilizer_model.n_features_in_]  # Adjust dynamically

        crop_prediction = crop_model.predict(crop_features)[0]

        # Fertilizer prediction
        fertilizer_prediction = fertilizer_model.predict(fertilizer_features)[0]

        response = {
            'crop_prediction': str(crop_prediction),
            'fertilizer_prediction': str(fertilizer_prediction)
        }
        
        logging.info(f"✅ Prediction output: {response}")
        
        return jsonify(response)
    
    except Exception as e:
        logging.error(f"⚠️ Error in /predict: {e}")
        return jsonify({'error': 'Server error occurred. Check logs for details.'}), 500

if __name__ == '__main__':
    app.run(debug=True)
