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

export const getAll = async () => {
  return await User.find().sort({ createdAt: -1 });
}

export const getRating = async (req) => {
  const res = [];
  const users = await User.find().sort({ donations: -1 });

  let meIndex = -1;
  for (let i = 0; i < users.length; i++) {
    const user = users[i];

    if (user._id === req?.user?._id) {
      user.isMe = true;
      meIndex = i;
    }
    
    if (i < 20) {
      res.push(user);
    }
  }

  if (meIndex > 20) {
    res.push(users[meIndex - 1]);
    res.push(users[meIndex]);
    users[meIndex + 1] && res.push(users[meIndex + 1]);
  }

  return res;
}

export const checkRank = (newBalance) => {
  const ranks = [
    {
      slug: 'newbie',
      label: 'Новичок',
      icon: 'fi-rr-medical-star',
      value: 0,
    },
    {
      slug: 'empathy',
      label: 'Энтузиаст Эмпатии',
      icon: 'fi-rr-hand-heart',
      value: 10000,
    },
    {
      slug: 'angel',
      label: 'Бизнес Ангел',
      icon: 'fi-rr-angel',
      value: 50000,
    },
    {
      slug: 'star',
      label: 'Звезда Содействия',
      icon: 'fi-rr-star-christmas',
      value: 150000,
    },
    {
      slug: 'inspiration',
      label: 'Меценат Вдохновения',
      icon: 'fi-rr-star-shooting',
      value: 500000,
    },
  ];

  let result = 'newbie';

  for (let i = 0; i < ranks.length; i++) {
    const rank = ranks[i];
    
    if (newBalance >= rank.value) result = rank.slug;
  }

  return result;
}