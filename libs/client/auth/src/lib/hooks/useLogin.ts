import { useMutation } from 'react-query';
import { loginRequest } from '../authService';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuthorizedContext } from '@toptal-calories/client-shared';
import { trans } from '@toptal-calories/utils';
import { AxiosError } from 'axios';

export const useLogin = () => {
  const [error, setError] = useState('');
  const { setAuth } = useAuthorizedContext();

  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation(loginRequest, {
    onSuccess: (response) => {
      setAuth(response);
      navigate('/food');
    },
    onError: (err: AxiosError) => {
      if (err.response?.status === 401) {
        setError(trans('incorrectLogin'));
      }
    }
  });

  return { isLoading, submit: mutate, error };
};
