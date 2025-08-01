require('dotenv').config();
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const PORT = process.env.PORT || 3000;

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: true });

app.use(express.static(__dirname));
app.use(express.json());

const users = new Map();

app.post('/complete-task', (req, res) => {
  const { userId, taskId } = req.body;
  if (!userId) return res.status(400).send({ error: 'userId required' });
  if (!users.has(userId)) users.set(userId, new Set());
  const tasks = users.get(userId);
  tasks.add(taskId);
  res.send({ success: true });

  if (tasks.size >= 5) {
    bot.sendMessage(userId, 'Поздравляем! Вы открыли 5 направлений в ВизаРан Бинго!');
  }
});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  users.set(String(chatId), new Set());
  bot.sendMessage(chatId, `Привет, ${msg.from.first_name}! Готов сыграть в ВизаРан Бинго? Перейди по ссылке: https://your.domain/?user=${chatId}`);
});

bot.onText(/\/progress/, (msg) => {
  const chatId = msg.chat.id;
  const progress = users.get(String(chatId));
  const count = progress ? progress.size : 0;
  bot.sendMessage(chatId, `Ты открыл ${count} направлений.`);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
