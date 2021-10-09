import { container } from 'tsyringe';
import DiskStorageProvider from './implementations/DiskStorageProvider';
import IStorageProvider from './interfaces/IStorageProvider';

const providers = {
  disk: DiskStorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers.disk,
);
