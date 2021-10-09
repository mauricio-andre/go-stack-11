import ListProviderAppointmentService from '@modules/appointments/services/ListProviderAppointmentService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

type RequestQuery = {
  day: string;
  month: string;
  year: string;
};

interface IRequest extends Request {
  query: RequestQuery;
}

export default class ProviderAppointmentsController {
  public async index(request: IRequest, response: Response): Promise<Response> {
    const userId = request.user.id;
    const { day, month, year } = request.query;
    const parsedDay = parseInt(day, 10);
    const parsedMonth = parseInt(month, 10);
    const parsedYear = parseInt(year, 10);

    const listProviderAppointment = container.resolve(
      ListProviderAppointmentService,
    );

    const appointment = await listProviderAppointment.execute({
      providerId: userId,
      day: parsedDay,
      month: parsedMonth,
      year: parsedYear,
    });

    return response.json(appointment);
  }
}
