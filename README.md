# Scription Web Application

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Pipeline

This application uses a simplified version of Git-Flow to prevent environment variables being baked into the production environment. All new development should be branched off `develop`, which will automatically deploy to the staging server once merged. When changes have been tested, they should be merged into `main` which will deploy to production.

All tests are run on PR to develop or main branches using GitHub actions. Any failures will be flagged & should not be merged.

## Running Locally

This app is dockerised, so setup should be standard. Running:

```docker
$ docker-compose-build
  > ...
  > Successfully built ___________
  > Successfully tagged scription-web_web:latest
```

will install all dependencies. Use

```docker
$ docker-compose up
  > ...
  > Compiled successfully!
```

to run the server, and navigate to [localhost:3001](localhost:3001) in your browser to use the app.

## API Connections

The API url is set using environment variables at `src/http-common.js:4`, and the environment variable for local environment is injected into the build at `docker-compose.yml:14`.

The app connects by default to a local API running on port 3000, as set by the `scription-api` Docker config.

## Linting Code

The `Prettier` VSCode extension has been used to apply a standardised, opinionated format to all JS code in the application.

## Running Tests

Tests are stored under the `src/__test__` directory, aiming to mirror the `src/components` structure to ensure each component is tested.

To stub API responses in tests Jest is used to `spy` on a module that makes API requests - in this instance, the `http-common.js` defaults defined at `src\http-common.js`. Therefore code similar to the following will watch the `http` module for any `get` requests:

```js
jest.spyOn(http, "get").mockImplementation(() =>
  Promise.resolve({
    data: mockJsonData,
  })
);
```

Once more to standardise environments, the tests can be run in Docker:

```bash
  $ docker-compose run web yarn test
    > ...
    > Test Suites: x passed, x total
    > Tests:       y passed, y total
    > Snapshots:   z total
    > Time:        0.00s
    > ...
```

_This doesn't have the live reloading that running `yarn test` outside of Docker has, but pressing `Enter` will manually rerun any tests that could have changed_
