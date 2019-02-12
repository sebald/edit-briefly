import fs from 'fs';
import tempy from 'tempy';
import { promisify } from 'util';

import { getEditor } from './get-editor';
import { spawnify } from './spawnify';
import { getLastCursorFromString, parseCursorArgs } from './parse-cursor-args';

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const encoding = 'utf8';

export type EditConfig = {
  extension?: string;
};

export const edit = async (
  contents: string = '',
  { extension }: EditConfig = {}
): Promise<string> => {
  const editor = getEditor();
  const cursor = getLastCursorFromString(contents);
  const file = tempy.file({ extension: extension || '' });
  const args = parseCursorArgs(editor.bin, file, cursor);

  await writeFile(file, contents || '', { encoding });
  await spawnify(editor.bin, [...editor.args, ...args], {
    detached: true,
    stdio: editor.isTerminalEditor ? 'inherit' : 'ignore',
  });
  return readFile(file, { encoding });
};
