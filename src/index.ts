import fs from 'fs';
import tempy from 'tempy';
import { promisify } from 'util';

import { openEditor } from './open-editor';
import { getEditor } from './get-editor';

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

const encoding = 'utf8';

export type EditConfig = {
  contents: string;
  extension: string;
};

export const edit = async ({
  contents,
  extension,
}: EditConfig): Promise<string> => {
  const file = tempy.file({ extension });
  await writeFile(file, contents, { encoding });
  await openEditor({ file, ...getEditor() });
  return readFile(file, { encoding });
};
