const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('user') || 'guest';

const cells = document.querySelectorAll('.cell');
let openCount = 0;

cells.forEach((cell, idx) => {
  cell.addEventListener('click', () => {
    if (!cell.classList.contains('open')) {
      cell.classList.add('open');
      openCount++;
      document.getElementById('message').textContent = `Открыто: ${openCount}`;

      fetch('/complete-task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, taskId: idx })
      });

      if (openCount >= 5) {
        document.getElementById('message').textContent =
          'Поздравляем! Вы собрали 5 направлений!';
      }
    }
  });
});
