# Scription Web

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

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
