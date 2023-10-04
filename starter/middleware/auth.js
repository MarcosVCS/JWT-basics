const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors/custom-error');

const authenticationMiddleware = async (req, res, next) => {
  //Visualizar o header da requisição, contendo o token de autorização
  //console.log(req.headers); // autorizações começam com "Bearer <token>"

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomAPIError('Invalid credentials to access this route', 401);
  }
  const token = authHeader.split(' ')[1];

  //Descriptografar o token (recolher as informações enviadas)
  try {
    // Primeiro parâmetro do método verify(): token
    // Segundo parâmetro: o segredo utilizado para criptografar
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Para fins didáticos, visualizar objeto descriptografado
    //console.log(decoded);

    // Recolher informações do objeto decoded e inseri-las na requisição
    // (que será lida pelo próximo middleware, após o next())
    const { id, username } = decoded;
    req.user = { id, username };
  } catch (error) {
    // Erros como token não corresponde ao segredo ou token expirado
    throw new CustomAPIError('Not authorized to access this route', 401);
  }
  next();
};

module.exports = authenticationMiddleware;
