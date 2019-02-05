import childProcess from 'child_process';
import tempy from 'tempy';
import { openEditor } from './open-editor';

jest.mock('child_process');
const spawn = childProcess.spawn as jest.Mock<typeof childProcess.spawn>;
const file = tempy.file();

let cp = {
  on: jest.fn((_, callback) => callback(0)),
};

beforeEach(() => {
  cp.on.mockClear();
  spawn.mockImplementation(() => cp);
});

test('open in child process', async () => {
  await openEditor({
    file,
    bin: 'editor-bin',
    args: ['-w'],
    isTerminalEditor: false,
  });

  expect(spawn).toHaveBeenCalledWith(
    'editor-bin',
    ['-w', file],
    expect.any(Object)
  );
});

test('inherit stdio for terminal editors', async () => {
  await openEditor({
    file,
    bin: 'editor-bin',
    args: ['-w'],
    isTerminalEditor: false,
  });
  expect(spawn.mock.calls[0][2].stdio).toMatchInlineSnapshot(`"ignore"`);

  spawn.mockClear();

  await openEditor({
    file,
    bin: 'editor-bin',
    args: ['-w'],
    isTerminalEditor: true,
  });
  expect(spawn.mock.calls[0][2].stdio).toMatchInlineSnapshot(`"inherit"`);
});

test('resolve when process exists', async () => {
  await openEditor({
    file,
    bin: 'editor-bin',
    args: ['-w'],
    isTerminalEditor: false,
  });

  expect(cp.on).toHaveBeenCalledWith('exit', expect.any(Function));
});

test('reject with error code', async () => {
  cp.on = jest.fn((_, callback) => callback(1));

  await expect(
    openEditor({
      file,
      bin: 'editor-bin',
      args: ['-w'],
      isTerminalEditor: false,
    })
  ).rejects.toMatchInlineSnapshot(`1`);
});
