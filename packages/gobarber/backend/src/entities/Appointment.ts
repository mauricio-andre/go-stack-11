import { v4 as uuid } from 'uuid';

class Appointment {
  Id: string;

  provider: string;

  date: Date;

  constructor(provider: string, date: Date) {
    this.Id = uuid();
    this.provider = provider;
    this.date = date;
  }
}

export default Appointment;
