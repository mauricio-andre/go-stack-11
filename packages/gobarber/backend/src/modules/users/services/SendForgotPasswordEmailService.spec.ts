import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

describe('SendForgotPasswordEmail', () => {
  it('Should be able to recover the password using the email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();
    const sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
    );

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johnDoe@example.com.br',
      password: '123456',
    });

    await sendForgotPasswordEmailService.execute({
      email: 'johnDoe@example.com.br',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  // it('Should not be able to create a new user with same email from another', async () => {
  //   const fakeUsersRepository = new FakeUsersRepository();
  //   const sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
  //     fakeUsersRepository,
  //   );

  //   await sendForgotPasswordEmailService.execute({
  //     email: 'johnDoe@example.com.br',
  //   });

  //   expect(
  //     createUser.execute({
  //       name: 'john Doe',
  //       email: 'johnDoe@example.com.br',
  //       password: '123456',
  //     }),
  //   ).rejects.toBeInstanceOf(AppError);
  // });
});
