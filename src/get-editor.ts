import os from 'os';

const TERMINAL_EDITORS = ['emacs', 'nano', 'neovim', 'vim'];

const isTerminalEditor = (editor: string): boolean =>
  TERMINAL_EDITORS.includes(editor);

/**
 * Editor configuration, including
 * - name of binary
 * - additional arguments
 * - if editor is used in terminal
 */
export type EditorConfig = {
  bin: string;
  args: string[];
  isTerminalEditor: boolean;
};

/**
 * Get configured editor from ENV vars or use fallback editor.
 *
 * @returns Editor configuration.
 */
export const getEditor = (): EditorConfig => {
  const { env } = process;

  const editor = env.VISUAL
    ? env.VISUAL
    : env.EDITOR
    ? env.EDITOR
    : os.platform() === 'win32'
    ? 'notepad'
    : 'vim';

  const [bin, ...args] = editor.trim().split(' ');

  return {
    bin,
    args: args.filter(Boolean),
    isTerminalEditor: isTerminalEditor(editor),
  };
};
