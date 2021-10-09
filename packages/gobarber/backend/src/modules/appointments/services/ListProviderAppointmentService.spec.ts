import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentService from './ListProviderAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointmentService: ListProviderAppointmentService;

describe('ListProviderAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointmentService = new ListProviderAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('Should be able to list appointments on a specific day', async () => {
    const appointmentOne = await fakeAppointmentsRepository.create({
      providerId: 'provider-id',
      userId: 'user-id',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    const appointmentTwo = await fakeAppointmentsRepository.create({
      providerId: 'provider-id',
      userId: 'user-id',
      date: new Date(2020, 4, 20, 9, 0, 0),
    });

    const appointments = await listProviderAppointmentService.execute({
      providerId: 'provider-id',
      day: 20,
      month: 5,
      year: 2020,
    });

    expect(appointments).toEqual(
      expect.arrayContaining([appointmentOne, appointmentTwo]),
    );
  });
});
