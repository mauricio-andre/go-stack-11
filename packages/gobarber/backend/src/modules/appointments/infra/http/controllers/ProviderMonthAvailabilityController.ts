import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

type RequestQuery = {
  month: string;
  year: string;
};

interface IRequest extends Request {
  query: RequestQuery;
}

export default class ProviderMonthAvailabilityController {
  public async index(request: IRequest, response: Response): Promise<Response> {
    const { providerId } = request.params;
    const { month, year } = request.query;
    const parsedMonth = parseInt(month, 10);
    const parsedYear = parseInt(year, 10);
    const listProviderMonthAvailabilityService = container.resolve(
      ListProviderMonthAvailabilityService,
    );

    const availability = await listProviderMonthAvailabilityService.execute({
      providerId,
      month: parsedMonth,
      year: parsedYear,
    });

    return response.json(availability);
  }
}
