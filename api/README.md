# starter-deno-web

A [Deno](https://deno.land/) web project stater template.

## Features

- [Oak](https://oakserver.github.io/oak/), with middleware Logger, CORS and JWT

## Environment variables

The following are configurable environment variables:

```shell
# timezone offset in minutes, default: 0.
TIMEZONE_OFFSET = ""

# base64 encoded ES256 key pair for JWT.
# If you need to use the `jwt()` middleware, please run `deno task keygen` to generate them.
JWT_KEY_PUBLIC = ""
JWT_KEY_PRIVATE = ""
```

You can create an file named `.env` in the root directory of this project, and set these environment variables in it. `src/config.ts` will load environment variables from the file `.env`.

## Tasks

Execute task `run` to run this project:

```shell
deno task run
```

All available tasks:

- run
- run:watch
- cache
- cache:lock
- keygen

You can see `deno.jsonc` for details.

## License

MIT License © 2023 mys1024
