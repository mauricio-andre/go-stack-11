type TemplateVariables = {
  [key: string]: string | number;
};

export default interface IParseMailTemplateDto {
  template: string;
  variables: TemplateVariables;
}
