import React, { useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link, useRouteMatch } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';
import { Header, Issues, RepositoryInfo } from './styles';

interface RepositoryParams {
  repository: string;
}

interface Repository {
  fullName: string;
  description: string;
  starsCount: number; // stargazers_count
  forksCount: number;
  openIssuesCount: number;
  owner: {
    login: string;
    avatarUrl: string;
  };
}

interface Issue {
  id: number;
  title: string;
  htmlUrl: string;
  user: {
    login: string;
  };
}

interface ResponseIssue {
  id: number;
  title: string;
  html_url: string; // eslint-disable-line
  user: {
    login: string;
  };
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();
  const [repository, setRepository] = useState<Repository | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    api.get(`/repos/${params.repository}`).then(response => {
      const {
        full_name: fullName,
        stargazers_count: starsCount,
        forks_count: forksCount,
        open_issues_count: openIssuesCount,
        owner,
      } = response.data;

      const repositoryData: Repository = {
        ...response.data,
        fullName,
        starsCount,
        forksCount,
        openIssuesCount,
      };

      repositoryData.owner.avatarUrl = owner.avatar_url;

      setRepository(repositoryData);
    });

    api.get(`/repos/${params.repository}/issues`).then(response => {
      const issuesData = response.data.map((data: ResponseIssue) => ({
        ...data,
        htmlUrl: data.html_url,
      }));

      setIssues(issuesData);
    });
  }, [params.repository]);

  return (
    <>
      <Header>
        <img src={logoImg} alt="Github Explorer" />
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>

      {repository && (
        <RepositoryInfo>
          <header>
            <img
              src={repository.owner.avatarUrl}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.fullName}</strong>
              <p>{repository.description}</p>
            </div>
          </header>

          <ul>
            <li>
              <strong>{repository.starsCount}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{repository.forksCount}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repository.openIssuesCount}</strong>
              <span>Issues abertas</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}

      <Issues>
        {issues.map(issue => (
          <a href={issue.htmlUrl} key={issue.id}>
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>
            <FiChevronRight width={20} />
          </a>
        ))}
      </Issues>
    </>
  );
};

export default Repository;
