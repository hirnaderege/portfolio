/* script.js */
function sayHi() {
    alert("Hi there! Thanks for visiting my portfolio! 💖");
}

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector('.flip-container').addEventListener('click', function() {
        this.querySelector('.flipper').classList.toggle('flipped');
    });
});


window.onSpotifyWebPlaybackSDKReady = () => {
    const token = 'YOUR_SPOTIFY_ACCESS_TOKEN';  // Use the token from authentication
    const player = new Spotify.Player({
        name: 'My Custom Player',
        getOAuthToken: cb => { cb(token); },
        volume: 0.5
    });

    // Connect the player
    player.connect().then(success => {
        if (success) {
            console.log('Player connected!');
        }
    });

    // Handle player state changes
    player.addListener('player_state_changed', state => {
        if (!state) return;
        console.log('Currently playing:', state.track_window.current_track);
    });

    // Listen for errors
    player.addListener('initialization_error', ({ message }) => {
        console.error('Initialization error:', message);
    });

    player.addListener('authentication_error', ({ message }) => {
        console.error('Authentication error:', message);
    });

    player.addListener('account_error', ({ message }) => {
        console.error('Account error:', message);
    });

    player.addListener('playback_error', ({ message }) => {
        console.error('Playback error:', message);
    });

    // When the player is ready
    player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID:', device_id);
        // Transfer playback to this device
        fetch('https://api.spotify.com/v1/me/player', {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ device_ids: [device_id], play: true })
        });
    });
};



fetch(`https://api.spotify.com/v1/me/player/play`, {
    method: 'PUT',
    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
        uris: ['spotify:track:TRACK_ID']  // Replace with a valid Spotify track URI
    })
});



async function getProfile(accessToken) {
    let accessToken = localStorage.getItem('access_token');
  
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    });
  
    const data = await response.json();
  }
  
