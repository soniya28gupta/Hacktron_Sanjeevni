export const extractMood = (input) => {
  const moods = ['happy', 'sad', 'angry', 'depressed', 'anxiety'];
  const lowerCaseInput = input.toLowerCase();

  // Check if any mood exists in the input string
  for (const mood of moods) {
    if (lowerCaseInput.includes(mood)) {
      return mood; // Return the first matched mood
    }
  }

  return null; // Return null if no mood is found
};

// Map moods to YouTube video links
export const moodToPlaylist = {
  happy: [
    'https://www.youtube.com/watch?v=Cc_cNEjAh_Y&list=PL8U7gDbfLksNOQ-IbN_jfC9DVQYt4xXTo',
    'https://www.youtube.com/watch?v=WxtJqyIyThU',
    'https://www.youtube.com/watch?v=Jy5o66NXgVs',
    'https://www.youtube.com/watch?v=GEVvyIrQZnA',
    'https://www.youtube.com/watch?v=FGtaw55iq1o',
    'https://www.youtube.com/watch?v=Hx8c50vUi4I',
    'https://www.youtube.com/watch?v=LGPv0JAuW-U',
    'https://www.youtube.com/watch?v=wEELNLOIOPs',
    'https://www.youtube.com/watch?v=dx4Teh-nv3A&list=PL406sb8c3_OkjFTgwKb8SX-ul1tChD6Hr',
    'https://www.youtube.com/watch?v=WjAPDofGg28&list=PL406sb8c3_OkjFTgwKb8SX-ul1tChD6Hr&index=4',
  ],
  sad: 'spotify:playlist:37i9dQZF1DX7qK8ma5wgG1', // Example playlist for sad
  angry: 'spotify:playlist:37i9dQZF1DX76Wlfdnj7AP', // Example playlist for angry
  depressed: 'spotify:playlist:37i9dQZF1DX3rxVfibe1L0', // Example playlist for depressed
  anxiety: 'spotify:playlist:37i9dQZF1DX3YSRoSdA634', // Example playlist for anxiety
};
