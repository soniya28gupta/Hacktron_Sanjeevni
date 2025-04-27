import { PythonShell } from 'python-shell';

const getMoodRecommendations = (req, res) => {
  const { mood } = req.body;

  if (!mood) {
    return res.status(400).json({ error: 'Mood is required' });
  }

  console.log('Received mood:', mood); // Debugging log

  const options = {
    mode: 'text',
    args: [JSON.stringify({ mood })],
  };

  PythonShell.run('./utils/predict.py', options, (err, results) => {
    if (err) {
      console.error('Error running Python script:', err.message || err);
      return res.status(500).json({ error: 'Failed to get recommendations' });
    }

    console.log('Python script results:', results); // Debugging log

    if (!results || results.length === 0) {
      console.error('No output received from Python script');
      return res.status(500).json({ error: 'No recommendations received' });
    }

    try {
      const output = JSON.parse(results[0]);
      console.log('Parsed output:', output); // Debugging log
      return res.json(output);
    } catch (e) {
      console.error('Failed to parse Python output:', e.message || e);
      return res.status(500).json({ error: 'Invalid response format' });
    }
  });
};

export { getMoodRecommendations };