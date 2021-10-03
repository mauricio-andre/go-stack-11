import { v4 as uuid } from 'uuid';
import { isEqual, getYear, getMonth } from 'date-fns';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDto from '@modules/appointments/dtos/ICreateAppointmentDto';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IFindAllInMontFromProviderDto from '@modules/appointments/dtos/IFindAllInMontFromProviderDto';

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return findAppointment;
  }

  public async create({
    providerId,
    date,
  }: ICreateAppointmentDto): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, {
      id: uuid(),
      date,
      providerId,
    });

    this.appointments.push(appointment);

    return appointment;
  }

  public async findAllInMontFromProvider({
    providerId,
    month,
    year,
  }: IFindAllInMontFromProviderDto): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.providerId === providerId &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );

    return appointments;
  }
}

export default FakeAppointmentsRepository;
