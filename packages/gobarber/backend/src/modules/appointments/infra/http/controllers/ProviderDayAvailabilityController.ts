import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';
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

export default class ProviderDayAvailabilityController {
  public async index(request: IRequest, response: Response): Promise<Response> {
    const { providerId } = request.params;
    const { day, month, year } = request.query;
    const parsedDay = parseInt(day, 10);
    const parsedMonth = parseInt(month, 10);
    const parsedYear = parseInt(year, 10);
    const listProviderDayAvailabilityService = container.resolve(
      ListProviderDayAvailabilityService,
    );

    const availability = await listProviderDayAvailabilityService.execute({
      providerId,
      day: parsedDay,
      month: parsedMonth,
      year: parsedYear,
    });

    return response.json(availability);
  }
}
