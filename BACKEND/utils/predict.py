import sys
import json
import joblib
import os

# Load the model
try:
    model_path = os.path.join(os.path.dirname(__file__), '../models/mood_recommender (1).joblib')
    model = joblib.load(model_path)
except Exception as e:
    print(json.dumps({"error": f"Failed to load model: {str(e)}"}))
    sys.exit(1)

def get_recommendations(mood):
    try:
        # Predict using the ML model
        prediction = model.predict([mood])[0]  # Assuming model expects a list of moods
        return prediction  # Adjust based on model output type
    except Exception as e:
        raise ValueError(f"Model prediction failed: {str(e)}")

if __name__ == "__main__":
    try:
        input_data = json.loads(sys.argv[1])
        mood = input_data.get("mood", "").strip()
        if not mood:
            raise ValueError("Mood is required")
        output = get_recommendations(mood)
        print(json.dumps(output))
    except Exception as e:
        print(json.dumps({"error": str(e)}))
