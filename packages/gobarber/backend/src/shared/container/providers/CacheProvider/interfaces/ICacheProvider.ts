export default interface ICacheProvider {
  save<T>(key: string, value: T): Promise<void>;
  recover<T>(key: string): Promise<T | null>;
  invalidade(key: string): Promise<void>;
}
