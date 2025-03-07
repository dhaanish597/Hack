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
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

# Get the absolute path to the models directory
current_dir = os.path.dirname(os.path.abspath(__file__))
models_dir = os.path.join(current_dir, 'models')

# Optionally, manually set an absolute path (if needed)
# models_dir = "/absolute/path/to/your/models"

# Log the model directory
logging.info(f"📂 Looking for models in: {models_dir}")

# Define model paths
crop_model_path = os.path.join(models_dir, 'NutriSoil_NB.pkl')
fertilizer_model_path = os.path.join(models_dir, 'random_forest_model.pkl')

# Check if model files exist before loading
if not os.path.exists(crop_model_path):
    logging.error(f"❌ Crop model NOT found at: {crop_model_path}")
if not os.path.exists(fertilizer_model_path):
    logging.error(f"❌ Fertilizer model NOT found at: {fertilizer_model_path}")

# Load trained models
crop_model, fertilizer_model = None, None
try:
    if os.path.exists(crop_model_path) and os.path.exists(fertilizer_model_path):
        with open(crop_model_path, 'rb') as file:
            crop_model = pickle.load(file)
            logging.info("✅ Crop model loaded successfully")

        with open(fertilizer_model_path, 'rb') as file:
            fertilizer_model = pickle.load(file)
            logging.info("✅ Fertilizer model loaded successfully")
    else:
        raise FileNotFoundError("Model files are missing in the expected location")
except Exception as e:
    logging.error(f"⚠️ Error loading models: {str(e)}")
    logging.error(f"Current working directory: {os.getcwd()}")

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if not crop_model or not fertilizer_model:
        return jsonify({'error': 'Models are not loaded. Check server logs.'}), 503

    try:
        data = request.get_json()
        logging.info(f"📥 Received input: {data}")

        # Extract input values safely
        try:
            features = np.array([
                float(data['N']), float(data['P']), float(data['K']), 
                float(data['Zn']), float(data['SOC']), float(data['B']),
                float(data['temperature']), float(data['humidity']),
                float(data['ph']), float(data['rainfall']), float(10.0), float(12.9)
            ]).reshape(1, -1)
        except (KeyError, ValueError) as e:
            logging.error(f"❌ Invalid input data: {str(e)}")
            return jsonify({'error': 'Invalid input values. Check required fields.'}), 400

        logging.info(f"Feature shape: {features.shape}")

        # Ensure the correct number of features are passed
        crop_features = features[:, :crop_model.n_features_in_] if crop_model else features
        fertilizer_features = features[:, :fertilizer_model.n_features_in_] if fertilizer_model else features

        # Make predictions
        crop_prediction = crop_model.predict(crop_features)[0]
        fertilizer_prediction = fertilizer_model.predict(fertilizer_features)[0]

        response = {
            'crop_prediction': str(crop_prediction),
            'fertilizer_prediction': str(fertilizer_prediction)
        }
        
        logging.info(f"✅ Prediction output: {response}")
        return jsonify(response)
    
    except Exception as e:
        logging.error(f"⚠️ Prediction error: {str(e)}")
        return jsonify({'error': f'Prediction error: {str(e)}'}), 500

if __name__ == '__main__':
    logging.info("🚀 Starting the Flask application...")
    app.run(debug=True)
