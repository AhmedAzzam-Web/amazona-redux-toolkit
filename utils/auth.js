import jwt from 'jsonwebtoken';

export const signToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '30d', })
}

export const isAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.slice(7, authorization.length) //get rid of the first 7 chars (Bearer)
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Token is not valid' });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'Token is not suppiled' });
  }
}