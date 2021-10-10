import { getDate, getDaysInMonth, isAfter } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  providerId: string;
  month: number;
  year: number;
}

type Response = {
  day: number;
  available: boolean;
};

interface IResponse extends Array<Response> {} // eslint-disable-line

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    providerId,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    const appointments =
      await this.appointmentsRepository.findAllInMontFromProvider({
        providerId,
        month,
        year,
      });

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    const eachDayArray = Array.from(
      {
        length: numberOfDaysInMonth,
      },
      (_, index) => index + 1,
    );

    const currentDate = new Date(Date.now());
    const availability = eachDayArray.map(day => {
      const compareDate = new Date(year, month - 1, day, 23, 59, 59);
      const appointmentsInDay = appointments.filter(
        appointment => getDate(appointment.date) === day,
      );

      const available =
        isAfter(compareDate, currentDate) && appointmentsInDay.length < 10;

      return {
        day,
        available,
      };
    });

    return availability;
  }
}

export default ListProviderMonthAvailabilityService;
