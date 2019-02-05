#!/usr/bin/env node

/**
 * Emulate the usage of an editor.
 */
(async () => {
  /* eslint-disable @typescript-eslint/no-var-requires */
  const fs = require('fs');
  const { promisify } = require('util');

  const writeFile = promisify(fs.writeFile);
  const file = process.argv[process.argv.length - 1];
  await writeFile(file, 'Rainbows and Unicorns', 'utf8');

  return new Promise(resolve => {
    setTimeout(() => resolve(), 15);
  });
})();
