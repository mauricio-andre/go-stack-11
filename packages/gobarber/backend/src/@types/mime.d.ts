/* eslint 'import/prefer-default-export': 'off' */
// definições da biblioteca não estão atualizadas
declare namespace mime {
  export function getType(path: string, fallback?: string): string;
}
