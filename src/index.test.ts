import { resolve } from 'path';
import fs from 'fs';
import tempy from 'tempy';
import { promisify } from 'util';

import { edit } from '.';

/**
 * Mock `tempy` so we find the file in the OS.
 */
jest.mock('tempy', () => {
  const t = jest.requireActual('tempy');
  const file = t.file();

  return {
    file: () => file,
  };
});

const ORIGINAL_ENV = process.env;
const EDITOR_BIN = `node ${resolve(__dirname, './fixture/fake-editor.js')}`;
const file = tempy.file();
const readFile = promisify(fs.readFile);

beforeEach(() => {
  jest.resetModules();
  process.env = { ...ORIGINAL_ENV };
  delete process.env.EDITOR;

  process.env.VISUAL = EDITOR_BIN;
});

afterEach(() => {
  process.env = ORIGINAL_ENV;
});

test('e2e', async () => {
  await edit({ contents: 'hello' });
  const contents = await readFile(file, { encoding: 'utf8' });
  expect(contents).toMatchInlineSnapshot(`"Rainbows and Unicorns"`);
});
