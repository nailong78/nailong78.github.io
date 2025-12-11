navigator.serviceWorker.addEventListener('message', (event) => {
  if (event.data?.type === 'NEW_VERSION') {
    const msg = event.data.text;
    const notice = document.getElementById('notification');
    if (notice) {
      notice.querySelector('.message').textContent = msg;
      notice.classList.add('show');
    }
  }
});
