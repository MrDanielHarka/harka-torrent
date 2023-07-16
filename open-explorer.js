import WebTorrent from 'webtorrent';
import { exec } from 'child_process';
const magnetURI =
  'magnet:?xt=urn:btih:225013277101E5EAB78E85B881EDCA3D540BEC0E&dn=Artistic+Minimalist+Wallpapers+Pack-1&tr=http%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=udp%3A%2F%2F47.ip-51-68-199.eu%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.me%3A2780%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2710%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2730%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2920%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.cyberia.is%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Ftracker.pirateparty.gr%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce';
const client = new WebTorrent();
const downloadsFolderPath = '.\\downloads';
const torrent = client.add(magnetURI, { path: downloadsFolderPath });
// const openFileExplorer = () => exec(`explorer.exe "${downloadsFolderPath}"`);
let lastProgress = 0;

torrent.on('download', () => {
  const percent = Math.floor(torrent.progress * 100);
  if (percent !== lastProgress) {
    console.log(`Downloading: ${percent}%`);
    lastProgress = percent;
  }
});

torrent.on('done', () => {
  console.log('Download complete!');
  client.destroy(err => {
    if (err) throw err;
    // openFileExplorer();
    setTimeout(() => process.exit(0), 100);
  });
});

torrent.on('error', err => {
  console.log('Error:', err);
  client.destroy(err => {
    if (err) throw err;
    process.exit(1);
  });
});
