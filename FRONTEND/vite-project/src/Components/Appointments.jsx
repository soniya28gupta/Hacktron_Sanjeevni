import React, { useState } from 'react';
import ReactPlayer from 'react-player'; // Import React Player
import '../css/Appointments.css'; // Import the CSS file
import { extractMood, moodToPlaylist } from '../utils/extractMood'; // Import the utility functions

const Appointments = () => {
  const [mood, setMood] = useState('');
  const [extractedMood, setExtractedMood] = useState(''); // State to store the extracted mood
  const [videos, setVideos] = useState([]); // State to store the list of video URLs
  const [error, setError] = useState('');

  const handleGetRecommendations = () => {
    setError('');
    setVideos([]);

    // Extract mood from the input string
    const moodFromInput = extractMood(mood);
    setExtractedMood(moodFromInput || 'No valid mood detected'); // Update the extracted mood state

    if (!moodFromInput) {
      setError('No valid mood detected. Please include one of the following moods: happy, sad, angry, depressed, anxiety.');
      return;
    }

    // Get all videos for the extracted mood
    const playlist = moodToPlaylist[moodFromInput];
    if (Array.isArray(playlist)) {
      setVideos(playlist); // Set the videos if the playlist is an array
    } else {
      setError('No videos available for the detected mood.');
    }
  };

  return (
    <>
      <h1 className="appointments-heading">Healing begins where words end-let the music mend your soul.</h1>
      <p>Don't know what video you feel like to watch? Tell how you are feeling and we will help you with that!</p>

      <div className="appointments-container">
        <textarea
          placeholder="Write about your mood..."
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          className="appointments-textarea"
        />
        <button onClick={handleGetRecommendations} className="submit-button">
          Submit
        </button>
        {extractedMood && (
          <p className="extracted-mood">
            <strong>Extracted Mood:</strong> {extractedMood}
          </p>
        )}
        {videos.length > 0 && (
          <div className="videos-grid">
            {videos.map((video, index) => (
              <div key={index} className="video-item">
                <ReactPlayer url={video} controls width="100%" />
              </div>
            ))}
          </div>
        )}
        {error && <p className="error-message">{error}</p>}
      </div>
    </>
  );
};

export default Appointments;
