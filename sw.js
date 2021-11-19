self.addEventListener('fetch', () => {
  // ここは空でもOK
})

// ファイブラリのインポート
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js')

// ファイルのキャッシュ
workbox.precaching.precacheAndRoute([
  {
    url: '/cmc/index.html',
    revision: '12345'
  },
  {
    url: '/cmc/bootstrap.min.css',
    revision: '12345'
  },
  {
  url: '/cmc/confusion-matrix-calculator.js',
    revision: '12345'
  },
])
