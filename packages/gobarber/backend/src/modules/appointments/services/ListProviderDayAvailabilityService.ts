import { getHours, isAfter } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  providerId: string;
  day: number;
  month: number;
  year: number;
}

type Response = {
  hour: number;
  available: boolean;
};

interface IResponse extends Array<Response> {} // eslint-disable-line

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    providerId,
    day,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    const appointments =
      await this.appointmentsRepository.findAllInDayFromProvider({
        providerId,
        day,
        month,
        year,
      });

    const hourStar = 8;
    const currentDate = new Date(Date.now());
    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStar,
    );

    const availability = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointments.some(
        appointment => getHours(appointment.date) === hour,
      );
      const compareDate = new Date(year, month - 1, day, hour);

      const available =
        !hasAppointmentInHour && isAfter(compareDate, currentDate);

      return {
        hour,
        available,
      };
    });

    return availability;
  }
}

export default ListProviderDayAvailabilityService;
