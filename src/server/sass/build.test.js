/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { resolve } from 'path';
import { readFileSync } from 'fs';

import del from 'del';

import { Build } from './build';

const TMP = resolve(__dirname, '__tmp__');
const FIXTURE = resolve(__dirname, '__fixtures__/index.scss');

afterEach(async () => {
  await del(TMP);
});

it('builds light themed SASS', async () => {
  const targetPath = resolve(TMP, 'style.css');
  await new Build({
    sourcePath: FIXTURE,
    log: {
      info: () => {},
      warn: () => {},
      error: () => {},
    },
    theme: 'light',
    targetPath
  }).build();

  expect(
    readFileSync(targetPath, 'utf8').replace(/(\/\*# sourceMappingURL=).*( \*\/)/, '$1...$2')
  ).toMatchInlineSnapshot(`
"foo bar {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  background: #e6f0f8; }
/*# sourceMappingURL=... */"
`);
});

it('builds dark themed SASS', async () => {
  const targetPath = resolve(TMP, 'style.css');
  await new Build({
    sourcePath: FIXTURE,
    log: {
      info: () => {},
      warn: () => {},
      error: () => {},
    },
    theme: 'dark',
    targetPath
  }).build();

  expect(
    readFileSync(targetPath, 'utf8').replace(/(\/\*# sourceMappingURL=).*( \*\/)/, '$1...$2')
  ).toMatchInlineSnapshot(`
"foo bar {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  background: #191919; }
/*# sourceMappingURL=... */"
`);
});
