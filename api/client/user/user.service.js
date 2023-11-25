import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from '../../../db/models';
import { badRequest, forbidden, notFound } from '../../../utils/response-utils';

export const login = async (body) => {
  const { email, password } = body;
  if (!email || !password) throw badRequest('AUTH.ERROR.BAD_DATA');

  const user = await User.findOne({ email });

  console.log(user);
  if (!user) throw notFound('AUTH.ERROR.CREDENTIALS');

  if (user.validation) throw forbidden('AUTH.ERROR.VALIDATION');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw forbidden('AUTH.ERROR.CREDENTIALS');

  const token = jwt.sign({ userId: user._id }, process.env['JWTSECRET'], { expiresIn: '48h' });


  return {
    token,
  };
};

export const register = async (body) => {
  const { email, password, name } = body;
  if (!email || !password || !name)
    throw badRequest('AUTH.ERROR.BAD_DATA');

  //# Check unique
  const existUser = await User.findOne({ email });
  if (existUser) throw badRequest('AUTH.ERROR.USER_EXIST');

  //# Generate activation and save
  // const validation = crypto.randomBytes(16).toString('hex');
  // await sendEmail('activation', email, { name, link: `https://app.jaryq-academy.kz/auth/?verify=${hashActivation}` });

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = new User({
    email,
    password: hashedPassword,
    name,
  });

  await newUser.save();

  const token = jwt.sign({ userId: newUser._id }, process.env['JWTSECRET'], { expiresIn: '48h' });

  return {
    token,
  };
};
