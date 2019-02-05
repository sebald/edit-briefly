import { spawn } from 'child_process';
import { EditorConfig } from './get-editor';

export type OpenEditorConfig = {
  file: string;
} & EditorConfig;

export const openEditor = ({
  file,
  ...editor
}: OpenEditorConfig): Promise<{}> =>
  new Promise((resolve, reject) => {
    const cp = spawn(editor.bin, [...editor.args, file], {
      detached: true,
      stdio: editor.isTerminalEditor ? 'inherit' : 'ignore',
    });
    cp.on('exit', (code = 0) => {
      if (code === 0) {
        return resolve();
      }

      reject(code);
    });
  });
