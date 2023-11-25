import { animated, useSpring } from '@react-spring/web';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '../../components/ui';
import { useApi } from '../../hooks/useApi';
import { useApp } from '../../hooks/useApp';
import { emailRegex } from '../../utils';
import './index.scss';
import dict from '../../dict';

const nullForm = {
  email: '',
  password: '',
  repeat: '',
  name: '',
};

const AuthModal = ({ open, closeModal, data: { view_ } }) => {
  const { login } = useApp();
  const [loading, api] = useApi();
  const navigate = useNavigate();

  // login | reg
  const [view, setView] = useState(view_ || 'login');

  const [form, setForm] = useState(nullForm);
  useEffect(() => {
    setForm(nullForm);
  }, [view, open]);

  const { x } = useSpring({
    x: view === 'login' ? 0 : -(window.innerWidth - 10),
  });

  const onChangeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onLogin = () => {
    const { email, password } = form;

    if (!email.length || !password.length) return toast.error('Заполните поля');
    if (!emailRegex(email)) return toast.error('Некорректный email');
    if (password.length < 6) return toast.error('Минимальная длина пароля 6 символов');

    api('auth/login', {
      body: {
        email,
        password,
      },
      success: ({ token }) => {
        closeModal();
        login(token);
      },
      error: (e) => {
        toast.error(dict[e.message]);
      },
    });
  };

  const onRegister = () => {
    const { email, password, repeat, name } = form;

    if (!email.length || !password.length || !repeat.length || !name.length)
      return toast.error('Заполните поля');
    if (!emailRegex(email)) return toast.error('Некорректный email');
    if (password.length < 6) return toast.error('Минимальная длина пароля 6 символов');
    if (password !== repeat) return toast.error('Пароли не совпадают');

    api('auth/register', {
      body: {
        email,
        password,
        name,
      },
      success: ({ token }) => {
        closeModal();
        login(token);
      },
      error: (e) => {
        toast.error(dict[e.message]);
      },
    });
  };

  return (
    <div className="auth-modal">
      <div className="auth-modal-title">
        <h1 style={{ transform: view === 'reg' && 'scaleX(0)' }}>Авторизация</h1>
        <h1 style={{ transform: view === 'login' && 'scaleX(0)' }}>Регистрация</h1>
      </div>

      <animated.div style={{ x }} className="auth-modal-wrap">
        <div className="auth-modal-view">
          <Input
            label="Почта"
            onChange={onChangeHandler}
            name="email"
            value={form.email}
            placeholder="example@gmail.com"
          />
          <Input
            label="Пароль"
            type="password"
            onChange={onChangeHandler}
            name="password"
            value={form.password}
            placeholder="********"
          />
          <Button
            style={{ marginTop: 30 }}
            onClick={onLogin}
            loading={loading}
            fullWidth
            label="Войти"
            icon="fi-rr-arrow-right"
            iconAlign="end"
          />
          <Button
            onClick={() => navigate('/')}
            loading={loading}
            style={{ marginTop: 10 }}
            fullWidth
            label="Продолжить с Google"
            type="neutral"
          />
          <Button
            onClick={() => setView('reg')}
            disabled={loading}
            style={{ marginTop: 10 }}
            fullWidth
            label="Создать аккаунт"
            type="text"
          />
        </div>
        <div className="auth-modal-view">
          <Input
            label="Имя"
            name="name"
            onChange={onChangeHandler}
            value={form.name}
            placeholder="Ильнур"
          />
          <Input
            label="Почта"
            name="email"
            index={1}
            onChange={onChangeHandler}
            value={form.email}
            placeholder="example@gmail.com"
          />
          <Input
            label="Пароль"
            name="password"
            index={1}
            onChange={onChangeHandler}
            value={form.password}
            type="password"
            placeholder="********"
          />
          <Input
            label="Подтвердите"
            name="repeat"
            onChange={onChangeHandler}
            value={form.repeat}
            type="password"
            placeholder="********"
          />
          <Button
            style={{ marginTop: 30 }}
            onClick={onRegister}
            loading={loading}
            fullWidth
            label="Создать аккаунт"
            icon="fi-rr-arrow-right"
            iconAlign="end"
          />
          <Button
            onClick={() => setView('login')}
            disabled={loading}
            style={{ marginTop: 10 }}
            fullWidth
            label="Войти в существующий аккаунт"
            type="text"
          />
        </div>
      </animated.div>
    </div>
  );
};

export default AuthModal;
