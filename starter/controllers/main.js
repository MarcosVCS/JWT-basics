const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors/custom-error');

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new CustomAPIError('Please provide email and password', 400);
  }
  // Três valores são fornecidos no método sign():
  // Payload: objeto contendo dados que serão criptografados, ex: id do usuário (obs: enviar poucos dados, nenhum confidencial)
  // Secret: string contendo segredo (armazenada no .ENV) - deve ser longa e de difícil descoberta
  // Options
  const token = jwt.sign(
    { username: username, id: 30 }, //Dummy ID (deveria ser ofertado pelo DB)
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
  // Enviar resposta com token
  res.status(200).json({ msg: 'user created', token });
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
