import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDto from '@modules/appointments/dtos/ICreateAppointmentDto';
import IFindAllInMontFromProviderDto from '../dtos/IFindAllInMontFromProviderDto';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDto): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllInMontFromProvider(
    data: IFindAllInMontFromProviderDto,
  ): Promise<Appointment[]>;
}
