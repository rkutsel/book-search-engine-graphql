### MIT License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# [Link To Deployed App](https://booksearch-krn.herokuapp.com)

## Description

This repository holds the codebase for a refactored react app that initially used REST API that I converted to use GraphQL. I used Apollo client to handle the client-side of things with GraphQL package and ExpressJS to handle the server-side. It has all of the components to be deployed to heroku.

## Installation Instructions

> NOTE: Before installing local dependencies, make sure you have `Node.JS ~v16.14.2` && `NPM ~8.11.0` && `mongodb-community@6.0` installed. You can quickly check this by running `node -v` for Node.JS and `npm -v` for NPM in your terminal, `mongod --version | grep ver` for MongoDB.

### Install local dependencies

Once the above is confirmed, clone the repo `git clone git@github.com:rkutsel/book-search-engine-graphql.git` and install the dependencies by running `npm i` in your terminal. A successful installation should look somewhat similar to the one bellow:

```bash
npm WARN config production Use `--omit=dev` instead.
npm WARN deprecated core-js@2.6.12: core-js@<3.23.3 is no longer maintained and not recommended for usage due to the number of issues. Because of the V8 engine whims, feature detection in old core-js versions could cause a slowdown up to 100x even if nothing is polyfilled. Some versions have web compatibility issues. Please, upgrade your dependencies to the actual version of core-js.

>npm install

> googlebooks-app@1.0.0 install
> cd server && npm i && cd ../client && npm i


up to date, audited 259 packages in 562ms

13 packages are looking for funding
  run `npm fund` for details

1 moderate severity vulnerability

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.

up to date, audited 1931 packages in 3s

169 packages are looking for funding
  run `npm fund` for details

28 vulnerabilities (5 moderate, 15 high, 8 critical)

To address issues that do not require attention, run:
  npm audit fix

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.

up to date, audited 59 packages in 5s

5 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

## Usage

To get started, from the `root` directory run `npm run develop` which should build all components and start the client and server components and redirect you to http://localhost:3000.

```bash
> googlebooks-app@1.0.0 develop
> concurrently "cd server && npm run watch" "cd client && npm start"

[0]
[0] > server@1.0.0 watch
[0] > nodemon server.js
[0]
[1]
[1] > client@0.1.0 start
[1] > react-scripts start
[1]
[0] [nodemon] 2.0.19
[0] [nodemon] to restart at any time, enter `rs`
[0] [nodemon] watching path(s): *.*
[0] [nodemon] watching extensions: js,mjs,json
[0] [nodemon] starting `node server.js`
[0] API server running on port 3001!
[0] Use GraphQL at http://localhost:3001/graphql
[1] ℹ ｢wds｣: Project is running at http://192.168.1.43/
[1] ℹ ｢wds｣: webpack output is served from
[1] ℹ ｢wds｣: Content not from webpack is served from /Users/roman.kutsel/projects/book-search-engine-graphql/client/public
[1] ℹ ｢wds｣: 404s will fallback to /
[1] Starting the development server...
[1]
[1] Compiled with warnings.
[1]
[1] src/components/LoginForm.js
[1]   Line 11:18:  'error' is assigned a value but never used  no-unused-vars
[1]   Line 11:25:  'data' is assigned a value but never used   no-unused-vars
[1]
[1] src/components/SignupForm.js
[1]   Line 20:20:  'error' is assigned a value but never used  no-unused-vars
[1]   Line 20:27:  'data' is assigned a value but never used   no-unused-vars
[1]
[1] src/pages/SavedBooks.js
[1]   Line 19:19:  'data' is assigned a value but never used   no-unused-vars
[1]   Line 22:23:  'error' is assigned a value but never used  no-unused-vars
[1]
[1] src/pages/SearchBooks.js
[1]   Line 27:20:  'error' is assigned a value but never used  no-unused-vars
[1]   Line 27:27:  'data' is assigned a value but never used   no-unused-vars
[1]   Line 81:12:  'data' is assigned a value but never used   no-unused-vars
[1]
[1] Search for the keywords to learn more about each warning.
[1] To ignore, add // eslint-disable-next-line to the line before.
[1]
```

## Usage

To get started, form the `root` directory run `node server` or `npm start dev` which should fire up all of the components. Optionally you can run `npm run watch` that would provide you with a better dev experience. At this point you should be able to consume the API. You can use any API client.

## Deploy to Heroku

The functionality is provided out of the box. There's a few additional steps required in order to make it work with heroku upon deploy. This guide [Deploy With Heroku And MySQL](https://coding-boot-camp.github.io/full-stack/heroku/deploy-with-heroku-and-mysql) has a detailed walk-through on how to achieve that.
