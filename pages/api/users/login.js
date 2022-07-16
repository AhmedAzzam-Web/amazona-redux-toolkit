import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import { client } from '../../../utils/client';
import { getError } from '../../../utils/error';
import { signToken } from '../../../utils/auth';

const handler = nc();

handler.post(async (req, res) => {
  const user = await client.fetch(`*[_type=='user' && email==$email][0]`, { email: req.body.email })
  try {
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = signToken({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token
      });
    } else {
      res.status(401).send({ message: 'Invalid email or password' })
    }
  } catch (error) {
    console.log(error);
    enqueueSnackbar(getError(error), { variant: 'error' })
  }
});

export default handler;