#!/bin/bash

npx ts-node -e "require('./src/index.ts').edit({ contents: '# Hello World', extension: 'md' })"