// Masukkan API Key YouTube anda di sini
const YOUTUBE_API_KEY = 'AIzaSyDExvx3xHuC7ZkCN7oznJCtzG99zhbgGFo'; // Gantikan dengan API Key anda

// URL untuk mencari video di YouTube
const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

// Paparkan senarai lagu pada halaman
const songListContainer = document.getElementById('song-list');

function renderSongs(songs) {
  // Kosongkan senarai lagu sebelum render semula
  songListContainer.innerHTML = '';

  if (songs.length === 0) {
    songListContainer.innerHTML = '<p>Tiada lagu ditemui!</p>';
    return;
  }

  songs.forEach((song) => {
    const songCard = document.createElement('div');
    songCard.classList.add('song-card');

    songCard.innerHTML = `
      <img src="${song.thumbnail}" alt="${song.title}">
      <h3>${song.title}</h3>
      <p>${song.artist}</p>
      <button onclick="playSong('${song.youtubeId}')">Mainkan</button>
    `;

    songListContainer.appendChild(songCard);
  });
}

// Fungsi untuk memainkan lagu dalam popup iframe
function playSong(youtubeId) {
  const popup = window.open('', 'Popup', 'width=600,height=400');
  popup.document.write(`
    <html>
      <head>
        <title>Memainkan Lagu</title>
      </head>
      <body style="margin:0;">
        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${youtubeId}?autoplay=1" frameborder="0" allowfullscreen></iframe>
      </body>
    </html>
  `);
}

// Fungsi untuk mencari lagu menggunakan API YouTube
document.getElementById('search-button').addEventListener('click', function () {
  const query = document.getElementById('search-input').value.trim();
  if (!query) {
    alert('Sila masukkan nama lagu atau artis!');
    return;
  }

  // Panggil API YouTube
  fetch(`${YOUTUBE_SEARCH_URL}?part=snippet&q=${encodeURIComponent(query)}&type=video&key=${YOUTUBE_API_KEY}`)
    .then((response) => response.json())
    .then((data) => {
      const songs = data.items.map((item) => ({
        title: item.snippet.title,
        artist: item.snippet.channelTitle,
        thumbnail: item.snippet.thumbnails.medium.url,
        youtubeId: item.id.videoId
      }));

      renderSongs(songs);
    })
    .catch((error) => {
      console.error('Ralat:', error);
      alert('Gagal mencari lagu. Sila cuba lagi.');
    });
});
