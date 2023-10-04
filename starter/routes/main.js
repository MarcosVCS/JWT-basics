const express = require('express');
const { dashboard, login } = require('../controllers/main');
const authMiddleware = require('../middleware/auth');

const mainRouter = express.Router();

// Middleware contendo função de autentificação deve ser declarado antes do controller
mainRouter.route('/dashboard').get(authMiddleware, dashboard);
mainRouter.route('/login').post(login);

module.exports = { mainRouter };
