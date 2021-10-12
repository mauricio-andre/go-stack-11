import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { ChangeEvent, useCallback, useRef } from 'react';
import { FiArrowLeft, FiCamera, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import api from '../../services/api';
import getValidationsErrors from '../../utils/getValidationsErrors';
import { AvatarInput, Container, Content } from './styles';

interface ProfileFromData {
  name: string;
  email: string;
  password: string;
  oldPassword: string;
  passwordConfirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { addToast } = useToast();
  const { user, updateUser } = useAuth();

  const handleSubmit = useCallback(
    async (data: ProfileFromData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um e-mail válido'),
          oldPassword: Yup.string(),
          password: Yup.string().when('oldPassword', {
            is: (val: string) => !!val.length,
            then: Yup.string().required('Campo obrigatório'),
          }),
          passwordConfirmation: Yup.string()
            .when('oldPassword', {
              is: (val: string) => !!val.length,
              then: Yup.string().required('Campo obrigatório'),
            })
            .oneOf(
              [Yup.ref('password'), null],
              'Confirmação de senha incorreta',
            ),
        });

        await schema.validate(data, { abortEarly: false });

        const { name, email, password, oldPassword, passwordConfirmation } =
          data;

        const formData = {
          name,
          email,
          ...(oldPassword
            ? {
                oldPassword,
                password,
                passwordConfirmation,
              }
            : {}),
        };

        const response = await api.put('profile', formData);

        updateUser(response.data);

        addToast({
          type: 'success',
          title: 'Perfil atualizado',
          description:
            'Suas informações do perfil foram atualizadas com sucesso!',
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
          title: 'Erro na atualização',
          description: 'Ocorreu um erro ao atualizar o perfil, tente novamente',
        });
      }
    },
    [history, addToast],
  );

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const file = e.target.files[0];
        const data = new FormData();
        data.append('avatar', file);

        api.patch('/users/avatar', data).then(response => {
          updateUser(response.data);

          addToast({
            type: 'success',
            title: 'Avatar atualizado',
          });
        });
      }
    },
    [addToast, updateUser],
  );

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>

      <Content>
        <Form
          ref={formRef}
          initialData={{ name: user.name, email: user.email }}
          onSubmit={handleSubmit}
        >
          <AvatarInput>
            <img src={user.avatarUrl} alt={user.name} />
            <label htmlFor="avatar">
              <FiCamera />
              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
          </AvatarInput>

          <h1>Meu perfil</h1>

          <Input type="text" icon={FiUser} name="name" placeholder="Nome" />
          <Input type="text" icon={FiMail} name="email" placeholder="Email" />

          <Input
            containerStyle={{ marginTop: '24px' }}
            type="password"
            icon={FiLock}
            name="oldPassword"
            placeholder="Senha Atual"
          />

          <Input
            type="password"
            icon={FiLock}
            name="password"
            placeholder="Nova Senha"
          />

          <Input
            type="password"
            icon={FiLock}
            name="passwordConfirmation"
            placeholder="Confirmar Senha"
          />

          <Button type="submit">Confirmar mudanças</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;
