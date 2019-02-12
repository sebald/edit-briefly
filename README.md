# edit-briefly

[![buid][ci-badge]][ci] [![buid][coverage-badge]][coverage] [![version][version-badge]][package] [![MIT License][license-badge]][license]

> Edit content inside the users preferred editor (via `$VISUAL`/`$EDITOR`).

This module is inspired by [`external-editor`](https://github.com/mrkmg/node-external-editor).
Like the mentioned module, `edit-briefly` will also allow to you open the user's preferred editor to edit a string. In addition, you can:

- open the editor with some initial content (think commit message template)
- set an extension for the temporary file (to enable highliting)
- move cursor to end of file contents

## Install

_Requires node 8+._

```
$ yarn add -D edit-briefly
```

or

```
$ npm install -D edit-briefly
```

## Usage

```ts
import { edit } from 'edit-briefly';

(async () => {
  const contents = await edit();
  // -> resolves when file is closed and file contents is returned
})();
```

#### Prefill file and use certain file extension

```ts
import { edit } from 'edit-briefly';

(async () => {
  const contents = await edit('# Title\n\n', { extension: 'md' });
  // -> opens a temporary existing file with md extension and filled with contents.
})();
```

<!-- LINKS -->

[ci]: https://travis-ci.org/sebald/edit-briefly
[ci-badge]: https://img.shields.io/travis/sebald/edit-briefly.svg?style=flat-square
[coverage]: https://codecov.io/gh/sebald/edit-briefly
[coverage-badge]: https://img.shields.io/codecov/c/github/sebald/edit-briefly.svg?style=flat-square
[license]: https://github.com/sebald/edit-briefly/blob/master/LICENCE
[license-badge]: https://img.shields.io/npm/l/edit-briefly.svg?style=flat-square
[package]: https://www.npmjs.com/package/edit-briefly
[version-badge]: https://img.shields.io/npm/v/edit-briefly.svg?style=flat-square
