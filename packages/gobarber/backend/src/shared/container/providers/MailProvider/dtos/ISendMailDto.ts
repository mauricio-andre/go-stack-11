import IParseMailTemplateDto from '../../MailTemplateProvider/dtos/IParseMailTemplateDto';

type MailContact = {
  name: string;
  email: string;
};

export default interface ISendMailDto {
  to: MailContact;
  from?: MailContact;
  subject: string;
  templateData: IParseMailTemplateDto;
}
