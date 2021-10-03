import { container } from 'tsyringe';
import IStorageProvider from './StorageProvider/interfaces/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';
// import IMailProvider from './MailProvider/interfaces/IMailProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

// container.registerSingleton<IMailProvider>(
//   'StorageProvider',
//   DiskStorageProvider,
// );
