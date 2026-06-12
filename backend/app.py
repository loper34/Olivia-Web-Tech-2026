from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
import os

current_backend_dir = os.path.dirname(os.path.abspath(__file__))

react_root_dir = os.path.join(os.path.dirname(current_backend_dir), 'frontend')
react_build_path = os.path.join(react_root_dir, 'build')
backend_static_images_path = os.path.join(current_backend_dir, 'static', 'images', 'Semua Fakultas', 'fotojpg')
backend_static_models_path = os.path.join(current_backend_dir, 'static', 'models')

app = Flask(
    __name__,
    static_folder=os.path.join(react_build_path, 'static'),
    template_folder=react_build_path
)

CORS(app)

import json

@app.route('/api/geojson')
def get_geojson_data():
    try:
        geojson_path = os.path.join(current_backend_dir, 'bangunan_unhas.geojson')
        with open(geojson_path, 'r', encoding='utf-8') as f:
            geojson_doc = json.load(f)
        return jsonify(geojson_doc)
    except Exception as e:
        print("Error loading local GeoJSON:", e)
        return jsonify({"error": "Failed to load GeoJSON data"}), 500

@app.route('/images/<filename>')
def get_image(filename):
    print(f"DEBUG: Attempting to serve image: {filename} from {backend_static_images_path}")

    try:
        if ".." in filename or "/" in filename or "\\" in filename:
            return jsonify({"error": "Invalid filename"}), 400

        return send_from_directory(backend_static_images_path, filename)
    except FileNotFoundError:
        print(f"File not found error: {filename} in {backend_static_images_path}")
        return jsonify({"error": f"File not found: {filename} at specified path."}), 404
    except Exception as e:
        print(f"DEBUG: Error serving image: {e}")
        return jsonify({"error": f"Failed to serve image: {str(e)}"}), 500


@app.route('/models/<filename>')
def get_model(filename):
    print(f"DEBUG: Attempting to serve model: {filename} from {backend_static_models_path}")
    try:
        if ".." in filename or "/" in filename or "\\" in filename:
            return jsonify({"error": "Invalid filename"}), 400
        return send_from_directory(backend_static_models_path, filename)
    except FileNotFoundError:
        return jsonify({"error": f"File not found: {filename}"}), 404
    except Exception as e:
        return jsonify({"error": f"Failed to serve model: {str(e)}"}), 500

@app.route('/')
def serve_react_app():
    return send_from_directory(app.template_folder, 'index.html')

@app.route('/<path:path>')
def serve_react_assets(path):
    
    if os.path.exists(os.path.join(app.template_folder, path)):
        return send_from_directory(app.template_folder, path)
    else:
    
        return send_from_directory(app.template_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True, port=5000)