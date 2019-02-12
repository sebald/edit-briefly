/**
 * Mapping for editor <> line/colum is stolen from `react-dev-utils`
 * https://github.com/facebook/create-react-app
 */
/* eslint-disable complexity */
import { basename } from 'path';
import { EOL } from 'os';

/**
 * Type that holds cursor information. Line and column number or EOF.
 */
export type Cursor = { line: number; column: number };

export const getLastCursorFromString = (s: string): Cursor => {
  const lines = s.split(EOL);

  return {
    line: lines.length,
    column: (lines.pop() || ' ').length,
  };
};

export const parseCursorArgs = (
  editor: string,
  file: string,
  cursor: Cursor
): string[] => {
  const name = basename(editor).replace(/\.(exe|cmd|bat)$/i, '');
  switch (name) {
    case 'atom':
    case 'Atom':
    case 'Atom Beta':
    case 'subl':
    case 'sublime':
    case 'sublime_text':
      return [`${file}:${cursor.line}:${cursor.column}`];
    case 'wstorm':
    case 'charm':
      return [`${file}:${cursor.line}`];
    case 'notepad++':
      return [`-n${cursor.line}`, `-c${cursor.column}`, file];
    case 'vim':
    case 'mvim':
    case 'joe':
    case 'gvim':
      return [`+${cursor.line}`, file];
    case 'emacs':
    case 'emacsclient':
      return [`+${cursor.line}:${cursor.column}`, file];
    case 'rmate':
    case 'mate':
    case 'mine':
      return ['--line', `${cursor.line}`, file];
    case 'code':
    case 'Code':
    case 'code-insiders':
    case 'Code - Insiders':
      return ['-g', `${file}:${cursor.line}:${cursor.column}`];
    case 'appcode':
    case 'clion':
    case 'clion64':
    case 'idea':
    case 'idea64':
    case 'phpstorm':
    case 'phpstorm64':
    case 'pycharm':
    case 'pycharm64':
    case 'rubymine':
    case 'rubymine64':
    case 'webstorm':
    case 'webstorm64':
    case 'goland':
    case 'goland64':
      return ['--line', `${cursor.line}`, file];
    default:
      return [file];
  }
};
