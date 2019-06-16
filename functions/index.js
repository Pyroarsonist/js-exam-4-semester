const functions = require('firebase-functions');
const admin = require('firebase-admin');
const Telegraf = require('telegraf');

const commands = require('./commands').default;

console.info('Starting telegram bot');

admin.initializeApp(functions.config().firebase);

const BOT_TOKEN = functions.config().bot.token;

const bot = new Telegraf(BOT_TOKEN);

const db = admin.firestore();

commands(bot, db);

bot.startPolling();

exports.bot = functions.https.onRequest((req, res) => {
  bot.handleUpdate(req.body, res);
});
