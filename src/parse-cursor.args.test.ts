import { getLastCursorFromString, parseCursorArgs } from './parse-cursor-args';

test.each([
  ['', { column: 1, line: 1 }],
  ['foo', { column: 3, line: 1 }],
  ['\n', { column: 1, line: 2 }],
  ['\n\n', { column: 1, line: 3 }],
  ['\n\nfoobar', { column: 6, line: 3 }],
  ['\n\n      ', { column: 6, line: 3 }],
])('get last position (text: %s)', (text, expected) => {
  expect(getLastCursorFromString(text)).toEqual(expected);
});

test.each([
  ['atom', ['file/path.ts:1:1']],
  ['atom', ['file/path.ts:1:1']],
  ['Atom Beta', ['file/path.ts:1:1']],
  ['subl', ['file/path.ts:1:1']],
  ['sublime', ['file/path.ts:1:1']],
  ['sublime_text', ['file/path.ts:1:1']],

  ['wstorm', ['file/path.ts:1']],
  ['charm', ['file/path.ts:1']],

  ['notepad++', ['-n1', '-c1', 'file/path.ts']],

  ['vim', ['+1', 'file/path.ts']],
  ['mvim', ['+1', 'file/path.ts']],
  ['joe', ['+1', 'file/path.ts']],
  ['gvim', ['+1', 'file/path.ts']],

  ['emacs', ['+1:1', 'file/path.ts']],
  ['emacsclient', ['+1:1', 'file/path.ts']],

  ['rmate', ['--line', '1', 'file/path.ts']],
  ['mate', ['--line', '1', 'file/path.ts']],
  ['mine', ['--line', '1', 'file/path.ts']],

  ['code', ['-g', 'file/path.ts:1:1']],
  ['Code', ['-g', 'file/path.ts:1:1']],
  ['code-insiders', ['-g', 'file/path.ts:1:1']],
  ['Code - Insiders', ['-g', 'file/path.ts:1:1']],

  ['appcode', ['--line', '1', 'file/path.ts']],
  ['clion', ['--line', '1', 'file/path.ts']],
  ['clion64', ['--line', '1', 'file/path.ts']],
  ['idea', ['--line', '1', 'file/path.ts']],
  ['idea64', ['--line', '1', 'file/path.ts']],
  ['phpstorm', ['--line', '1', 'file/path.ts']],
  ['phpstorm64', ['--line', '1', 'file/path.ts']],
  ['pycharm', ['--line', '1', 'file/path.ts']],
  ['pycharm64', ['--line', '1', 'file/path.ts']],
  ['rubymine', ['--line', '1', 'file/path.ts']],
  ['rubymine64', ['--line', '1', 'file/path.ts']],
  ['webstorm', ['--line', '1', 'file/path.ts']],
  ['webstorm64', ['--line', '1', 'file/path.ts']],
  ['goland', ['--line', '1', 'file/path.ts']],
  ['goland64', ['--line', '1', 'file/path.ts']],

  ['notepad', ['file/path.ts']],
  ['unsupported', ['file/path.ts']],
])('parse cursor args (editor: %s)', (editor, expected) => {
  expect(
    parseCursorArgs(editor, 'file/path.ts', { line: 1, column: 1 })
  ).toEqual(expected);
});
