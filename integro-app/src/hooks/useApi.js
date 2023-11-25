import { useCallback, useState } from 'react';
import { useApp } from './useApp';

const SERVER = import.meta.env.VITE_SERVER;

export const useApi = (params = {}) => {
  const { initLoading } = {
    initLoading: params.initLoading || false,
  };

  const [loading, setLoading] = useState(initLoading);
  const { token: appToken } = useApp();

  const fetcher = useCallback(async (url, props) => {
    props = props || {};
    props.method = props.method || 'GET';
    props.body = props.body || null;
    props.headers = props.headers || {};
    props.type = props.type || 'json';
    props.token = props.token || appToken || null;
    props.success = props.success || undefined;
    props.error = props.error || (() => {});
    
    props.test = props.test || null;

    let { method, body, headers, type, token, success, error } = props;
    setLoading(true);

    if (props.test) {
      setTimeout(() => {
        success();
        setLoading(false);
      }, props.test);
      return;
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    if (method === 'GET' && body) {
      method = 'POST';
    }

    if (body && type === 'json') {
      body = JSON.stringify(body);
      headers['Content-Type'] = 'application/json';
    }

    try {
      const response = await fetch(`${SERVER}/api/${url}`, { method, body, headers });
      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        if (error) return error(data);
      }

      if (success) return success(data);
      return data;
    } catch (e) {
      error(e);
      console.warn('useApi Error', e);
      setLoading(false);
    }
  }, []);

  return [loading, fetcher];
};
