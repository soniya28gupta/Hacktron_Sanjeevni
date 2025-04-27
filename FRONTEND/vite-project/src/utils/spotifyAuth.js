import axios from 'axios';

const SPOTIFY_CLIENT_ID = 'f00b6596feb84205973206279d3ce362';
const SPOTIFY_CLIENT_SECRET = 'a211e77c892e47a092ced52551ff276e';
const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';

// Function to get Spotify access token
export const getSpotifyAccessToken = async () => {
  try {
    const response = await axios.post(
      SPOTIFY_TOKEN_URL,
      new URLSearchParams({
        grant_type: 'client_credentials',
      }),
      {
        headers: {
          Authorization: `Basic ${btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return response.data.access_token; // Return the access token
  } catch (error) {
    console.error('Error fetching Spotify access token:', error.message);
    throw new Error('Failed to fetch Spotify access token. Please check your credentials or network.');
  }
};
