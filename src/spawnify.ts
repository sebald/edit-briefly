import { spawn } from 'child_process';

export const spawnify = (
  ...args: Parameters<typeof spawn>
): Promise<undefined> =>
  new Promise((resolve, reject) => {
    const cp = spawn(...args);
    cp.on('exit', code => {
      if (code === 0) {
        return resolve();
      }

      reject(code);
    });
  });
