import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef } from 'react';
import { FiLock } from 'react-icons/fi';
import { useHistory, useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import logoImg from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useToast } from '../../context/ToastContext';
import api from '../../services/api';
import getValidationsErrors from '../../utils/getValidationsErrors';
import { AnimationContainer, Background, Container, Content } from './styles';

interface ResetPasswordFormData {
  password: string;
  passwordConfirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const location = useLocation();
  const { addToast } = useToast();
  const useQuery = useCallback(
    () => new URLSearchParams(location.search),
    [location],
  );

  const query = useQuery();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required('Senha obrigatória'),
          passwordConfirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'Confirmação de senha incorreta',
          ),
        });

        await schema.validate(data, { abortEarly: false });

        const token = query.get('token');

        if (!token) {
          throw new Error();
        }

        await api.post('/password/reset', {
          password: data.password,
          passwordConfirmation: data.passwordConfirmation,
          token,
        });

        history.push('/');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const erros = getValidationsErrors(error as Yup.ValidationError);
          formRef.current?.setErrors(erros);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro ao recuperar senha',
          description:
            'Ocorreu um erro ao recuperar sua senha, tente novamente',
        });
      }
    },
    [addToast, history, query],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recuperar senha</h1>

            <Input
              type="password"
              icon={FiLock}
              name="password"
              placeholder="Nova senha"
            />

            <Input
              type="password"
              icon={FiLock}
              name="passwordConfirmation"
              placeholder="Confirmação de senha"
            />

            <Button type="submit">Alterar senha</Button>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ResetPassword;
