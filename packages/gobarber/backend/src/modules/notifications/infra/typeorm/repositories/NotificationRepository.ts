import ICreationNotificationDto from '@modules/notifications/dtos/ICreationNotificationDto';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import { getMongoRepository, MongoRepository } from 'typeorm';
import Notification from '../schemas/Notification';

class NotificationsRepository implements INotificationsRepository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }

  async create({
    content,
    recipientId,
  }: ICreationNotificationDto): Promise<Notification> {
    const notification = this.ormRepository.create({
      content,
      recipientId,
    });

    await this.ormRepository.save(notification);

    return notification;
  }
}

export default NotificationsRepository;
