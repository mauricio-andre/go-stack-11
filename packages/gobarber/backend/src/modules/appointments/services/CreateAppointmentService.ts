import { format, getHours, isBefore, startOfHour } from 'date-fns';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequestDto {
  providerId: string;
  userId: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
  ) {}

  public async execute({
    providerId,
    userId,
    date,
  }: IRequestDto): Promise<Appointment> {
    const appointmentDate = startOfHour(date);
    const dateFormatted = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'");

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError(`You can't create an appointment on a past date`);
    }

    if (userId === providerId) {
      throw new AppError(`You can't create an appointment with yourself`);
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError('You can only create appointment between 8am and 5pm');
    }

    const findAppointmentInSameDate =
      await this.appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      providerId,
      userId,
      date: appointmentDate,
    });

    await this.notificationsRepository.create({
      recipientId: providerId,
      content: `Novo agendamento para ${dateFormatted}`,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
