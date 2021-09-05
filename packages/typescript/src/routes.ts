import { Request, Response } from 'express';
import createUser from './services/CreateUser';

export function helloWord(request: Request, response: Response) {
  const user = createUser({
    email: 'exemplo@dominio.com',
    password: '123456',
    techs: ['Node', 'ReactJs', { title: 'Javascript', experience: 100 }],
  });

  return response.json({ message: 'Hello Word', user });
}
