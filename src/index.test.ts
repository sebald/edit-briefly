import childProcess from 'child_process';
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

/**
 * Mock `spawn` so we can check arguments.
 */
jest.mock('child_process', () => {
  const cp = jest.requireActual('child_process');

  return {
    ...cp,
    spawn: jest.fn((...args: any[]) => cp.spawn(...args)),
  };
});

const spawn = childProcess.spawn as jest.Mock<typeof childProcess.spawn>;

const ORIGINAL_ENV = process.env;
const EDITOR_BIN = `node ${resolve(__dirname, './fixture/fake-editor.js')}`;
const file = tempy.file();
const readFile = promisify(fs.readFile);

beforeEach(() => {
  jest.resetModules();
  process.env = { ...ORIGINAL_ENV };
  delete process.env.EDITOR;

  process.env.VISUAL = EDITOR_BIN;

  spawn.mockClear();
});

afterEach(() => {
  process.env = ORIGINAL_ENV;
});

test('returns file contens', async () => {
  const contents = await edit();
  expect(contents).toMatchInlineSnapshot(`"Rainbows and Unicorns"`);
});

test('e2e', async () => {
  await edit('hello');
  const contents = await readFile(file, { encoding: 'utf8' });
  expect(contents).toMatchInlineSnapshot(`"Rainbows and Unicorns"`);
});

test('open editor with arguments', async () => {
  await edit('hello', { extension: 'md' });

  expect(spawn.mock.calls.pop()).toEqual([
    'node',
    [expect.stringContaining('fake-editor.js'), expect.any(String)],
    {
      detached: true,
      stdio: 'ignore',
    },
  ]);
});
