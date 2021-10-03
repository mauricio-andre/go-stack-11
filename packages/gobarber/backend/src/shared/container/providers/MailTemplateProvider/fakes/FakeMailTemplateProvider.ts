import IParseMailTemplateDto from '../dtos/IParseMailTemplateDto';
import IMailTemplateProvider from '../interfaces/IMailTemplateProvider';

class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse({ template }: IParseMailTemplateDto): Promise<string> {
    return template;
  }
}

export default FakeMailTemplateProvider;
