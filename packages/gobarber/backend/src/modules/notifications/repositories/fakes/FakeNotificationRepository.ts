import ICreationNotificationDto from '@modules/notifications/dtos/ICreationNotificationDto';
import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';
import { ObjectId } from 'mongodb';
import INotificationsRepository from '../INotificationsRepository';

class FakeNotificationsRepository implements INotificationsRepository {
  private notifications: Notification[] = [];

  async create({
    content,
    recipientId,
  }: ICreationNotificationDto): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, {
      id: new ObjectId(),
      content,
      recipientId,
    });

    this.notifications.push(notification);

    return notification;
  }
}

export default FakeNotificationsRepository;
