import childProcess from 'child_process';
import { spawnify } from './spawnify';

jest.mock('child_process');
const spawn = childProcess.spawn as jest.Mock<typeof childProcess.spawn>;
let cp = {
  on: jest.fn((_, callback) => callback(0)),
};

beforeEach(() => {
  cp.on.mockClear();
  spawn.mockImplementation(() => cp);
});

test('promisified child process', async () => {
  await spawnify('bin', ['a', 'r', 'g', 's'], { detached: false });
  expect(spawn).toHaveBeenCalledWith('bin', ['a', 'r', 'g', 's'], {
    detached: false,
  });
});

test('resolve when process exists', async () => {
  await spawnify('bin', ['a', 'r', 'g', 's'], { detached: false });
  expect(cp.on).toHaveBeenCalledWith('exit', expect.any(Function));
});

test('reject with error code', async () => {
  cp.on = jest.fn((_, callback) => callback(1));
  await expect(spawnify('bin', [])).rejects.toMatchInlineSnapshot(`1`);
});
