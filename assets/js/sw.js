self.addEventListener('message', (e) => {
  if (!e.data) return;

  switch (e.data.type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
  }
});

// 当检测到新版本时给前端发送消息
self.addEventListener('install', () => {
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage({
        type: 'NEW_VERSION',
        text: '🔄 内容更新啦！点击更新查看最新内容～'
      });
    });
  });
});
