import ICreationNotificationDto from '../dtos/ICreationNotificationDto';
import Notification from '../infra/typeorm/schemas/Notification';

export default interface INotificationsRepository {
  create(date: ICreationNotificationDto): Promise<Notification>;
}
