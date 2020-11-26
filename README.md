# Scription Web

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Pipeline

This application uses a simplified version of Git-Flow to prevent environment variables being baked into the production environment. All new development should be branched off `develop`, which will automatically deploy to the staging server once merged. When changes have been tested, they should be merged into `main` which will deploy to production.

## Running locally

This app is dockerised, so setup should be standardised. Running:

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

By default the app connects to the staging API for development purposes to avoid needing a local server running as well. If you need to change this for whatever reason, then run the API locally on port 3000 and update the `docker-compose` file to point to this URL instead.

## Testing

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
  $ docker-compose run web npm test
    > ...
    > Test Suites: x passed, x total
    > Tests:       y passed, y total
    > Snapshots:   z total
    > Time:        0.00s
    > ...
```

*This doesn't have the live reloading that running `npm test` outside of Docker has, but pressing `Enter` will manually rerun any tests that could have changed*
