import ListProviderAppointmentService from '@modules/appointments/services/ListProviderAppointmentService';
import { classToClass } from 'class-transformer';
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
    const listProviderAppointment = container.resolve(
      ListProviderAppointmentService,
    );

    const appointment = await listProviderAppointment.execute({
      providerId: userId,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return response.json(classToClass(appointment));
  }
}
