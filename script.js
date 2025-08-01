const directions = [
  'Джохор',
  'Бангкок',
  'Куала Лумпур',
  'Сингапур',
  'Алматы',
  'Дубай'
];

const tasks = [
  'Подпишись на канал.',
  'Добавь бота в закреп.',
  'Пригласи друга.',
  'Отправь свой обычный маршрут.',
  'Пройди мини-квиз.'
];

const grid = document.getElementById('grid');
const messageEl = document.getElementById('message');
const taskModal = document.getElementById('taskModal');
const taskText = document.getElementById('taskText');
const completeBtn = document.getElementById('completeTask');
let currentCell = null;

function createGrid() {
  directions.forEach(dir => {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.textContent = dir;
    cell.addEventListener('click', () => onCellClick(cell));
    grid.appendChild(cell);
  });
}

function onCellClick(cell) {
  if (cell.classList.contains('opened')) return;
  currentCell = cell;
  showTask();
}

function showTask() {
  const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
  taskText.textContent = randomTask;
  taskModal.classList.remove('hidden');
}

function completeTask() {
  if (currentCell) {
    currentCell.classList.add('opened');
    currentCell = null;
  }
  taskModal.classList.add('hidden');
  checkCompletion();
}

function checkCompletion() {
  const opened = document.querySelectorAll('.cell.opened').length;
  if (opened === directions.length) {
    messageEl.classList.remove('hidden');
  }
}

completeBtn.addEventListener('click', completeTask);
createGrid();
