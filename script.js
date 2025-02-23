// Data senarai lagu (anda boleh tambah lebih banyak lagu)
const songs = [
  {
    title: "Shape of You",
    artist: "Ed Sheeran",
    thumbnail: "https://img.youtube.com/vi/JGwWNGJdvx8/0.jpg",
    youtubeId: "JGwWNGJdvx8"
  },
  {
    title: "Blinding Lights",
    artist: "The Weeknd",
    thumbnail: "https://img.youtube.com/vi/4NRXx6U8ABQ/0.jpg",
    youtubeId: "4NRXx6U8ABQ"
  },
  {
    title: "Levitating",
    artist: "Dua Lipa",
    thumbnail: "https://img.youtube.com/vi/TUVcZfQe-Kw/0.jpg",
    youtubeId: "TUVcZfQe-Kw"
  }
];

// Paparkan senarai lagu pada halaman
const songListContainer = document.getElementById('song-list');

function renderSongs() {
  songs.forEach((song, index) => {
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

// Render senarai lagu apabila halaman dimuatkan
document.addEventListener('DOMContentLoaded', renderSongs);
