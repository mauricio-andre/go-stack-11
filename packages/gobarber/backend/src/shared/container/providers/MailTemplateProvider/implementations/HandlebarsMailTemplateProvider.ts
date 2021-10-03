import handlebars from 'handlebars';
import IParseMailTemplateDto from '../dtos/IParseMailTemplateDto';
import IMailTemplateProvider from '../interfaces/IMailTemplateProvider';

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  public async parse({
    template,
    variables,
  }: IParseMailTemplateDto): Promise<string> {
    const parseTemplate = handlebars.compile(template);
    return parseTemplate(variables);
  }
}

export default HandlebarsMailTemplateProvider;
