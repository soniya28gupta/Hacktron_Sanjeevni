import pickle
import pandas as pd
import numpy as np
import os

# Hardcoded dataset for demonstration
data = {
    "genres": ["pop", "rock", "jazz", "classical", "hip-hop"],
    "artists": ["Artist1", "Artist2", "Artist3", "Artist4", "Artist5"],
    "valence": [0.8, 0.6, 0.4, 0.9, 0.7],
    "energy": [0.7, 0.8, 0.5, 0.3, 0.9],
    "danceability": [0.9, 0.7, 0.6, 0.2, 0.8],
    "tempo": [120, 130, 110, 100, 140],
    "liveness": [0.1, 0.2, 0.3, 0.4, 0.5],
    "speechiness": [0.05, 0.04, 0.03, 0.02, 0.06],
    "labels": ["happy", "energetic", "calm", "sad", "happy"]
}
df = pd.DataFrame(data)

# Hardcoded model for demonstration
class SimpleMoodModel:
    def predict(self, mood_list):
        mood = mood_list[0].lower()
        if mood in ["happy", "energetic", "calm", "sad"]:
            return [mood]
        return ["neutral"]

# Save the model using pickle
model_path = os.path.join(os.path.dirname(__file__), '../models/mood_recommender.pkl')
model = SimpleMoodModel()
with open(model_path, 'wb') as f:
    pickle.dump(model, f)
print(f"✅ Model saved to {model_path}")

# Load the model using pickle
with open(model_path, 'rb') as f:
    model = pickle.load(f)
print("✅ Model loaded successfully")

# Hardcoded mood mapping
mood_mapping = {
    "joy": "happy",
    "anger": "energetic",
    "sadness": "sad",
    "love": "happy",
    "fear": "calm",
    "surprise": "energetic",
    "neutral": "calm",
    "motivated": "energetic",
    "anxiety": "calm",
    "depressed": "sad"
}

# Hardcoded emotion detection
def detect_mood(text):
    print(f"📜 Hardcoded emotion detected from text: {text}")
    return text.lower()

# Recommend songs based on mood
def recommend_songs_by_mood(mood, df, n=5):
    mood_matched = df[df['labels'].str.lower() == mood]
    if mood_matched.empty:
        print(f"No songs found for mood '{mood}'. Showing random songs instead.")
        return df.sample(n)
    return mood_matched.sample(n)

if __name__ == "__main__":
    user_input = input("\n💬 Tell me how you're feeling: ")
    detected_mood = detect_mood(user_input)

    # Map detected mood
    mapped_mood = mood_mapping.get(detected_mood, detected_mood)

    print("\n🎶 Your Song Recommendations:\n")
    recommendations = recommend_songs_by_mood(mapped_mood, df)

    # Show important columns
    print(recommendations[['labels', 'genres', 'artists', 'valence', 'tempo', 'energy']])
