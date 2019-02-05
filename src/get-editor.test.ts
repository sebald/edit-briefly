import os from 'os';
import { getEditor } from './get-editor';

jest.mock('os');

const ORIGINAL_ENV = process.env;

beforeEach(() => {
  jest.resetModules();
  process.env = { ...ORIGINAL_ENV };
  delete process.env.VISUAL;
  delete process.env.EDITOR;
});

afterEach(() => {
  process.env = ORIGINAL_ENV;
});

test('get editor via $VISUAL', () => {
  process.env.VISUAL = 'foobar';
  expect(getEditor().bin).toMatchInlineSnapshot(`"foobar"`);
});

test('get editor via $EDITOR', () => {
  process.env.EDITOR = 'unicorn';
  expect(getEditor().bin).toMatchInlineSnapshot(`"unicorn"`);
});

test('get editor $VISUAL before $EDITOR', () => {
  process.env.EDITOR = 'loser';
  process.env.VISUAL = 'winner';
  expect(getEditor().bin).toMatchInlineSnapshot(`"winner"`);
});

test('use fallbacks if no $VISUAL and $EDITOR is set', () => {
  (os as any).platform = jest.fn(() => 'darwin');
  expect(getEditor().bin).toMatchInlineSnapshot(`"vim"`);

  (os as any).platform = jest.fn(() => 'win32');
  expect(getEditor().bin).toMatchInlineSnapshot(`"notepad"`);
});

test.each([
  ['emacs', true],
  ['nano', true],
  ['neovim', true],
  ['vim', true],
  ['code', false],
  ['notepad', false],
])('detect if is terminal editor (%s)', (editor, expected) => {
  process.env.VISUAL = editor;
  expect(getEditor().isTerminalEditor).toEqual(expected);
});

test('allow additional arguments', () => {
  process.env.VISUAL = 'code -w';
  const r1 = getEditor();

  expect(r1.bin).toMatchInlineSnapshot(`"code"`);
  expect(r1.args).toMatchInlineSnapshot(`
Array [
  "-w",
]
`);

  process.env.VISUAL = 'code -w -r';
  const r2 = getEditor();
  expect(r2.bin).toMatchInlineSnapshot(`"code"`);
  expect(r2.args).toMatchInlineSnapshot(`
Array [
  "-w",
  "-r",
]
`);
});
