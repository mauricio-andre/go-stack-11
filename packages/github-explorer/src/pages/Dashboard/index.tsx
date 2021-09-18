import React, { FormEvent, useEffect, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';
import { Form, Repositories, Title, Error } from './styles';

interface Repository {
  fullName: string;
  description: string;
  owner: {
    login: string;
    avatarUrl: string;
  };
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>(
    (): Repository[] => {
      const storageRepositories = localStorage.getItem(
        '@GithubExplorer:repositories',
      );

      if (storageRepositories) {
        return JSON.parse(storageRepositories);
      }

      return [];
    },
  );

  useEffect(() => {
    localStorage.setItem(
      '@GithubExplorer:repositories',
      JSON.stringify(repositories),
    );
  }, [repositories]);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (!newRepo) {
      setInputError('Digite o autor/nome do repositório');
      return;
    }

    try {
      const response = await api.get(`repos/${newRepo}`);

      const repository: Repository = response.data;
      repository.fullName = response.data.full_name;
      repository.owner.avatarUrl = response.data.owner.avatar_url;

      setRepositories([...repositories, repository]);
      setNewRepo('');
      setInputError('');
    } catch (error) {
      setInputError('Erro na busca por esse repositório');
    }
  }

  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore repositórios no Github</Title>

      <Form hasError={!!inputError} onSubmit={e => handleAddRepository(e)}>
        <input
          type="text"
          placeholder="Digite o nome do repositório"
          value={newRepo}
          onChange={e => setNewRepo(e.target.value)}
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories.map(repository => (
          <Link
            to={`/repositories/${repository.fullName}`}
            key={repository.fullName}
          >
            <img
              src={repository.owner.avatarUrl}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.fullName}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight width={20} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
