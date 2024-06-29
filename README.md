# FartMap API

## Production

Run `bun run build:bin` and you'll have a `bin` executable in the root of the project.

Running this executable will start the server on port 8024.
You can use whatever you want to run this binary in the background, like `systemd` (an example service is available at [`service/fartmap-api.service`](./service/fartmap-api.service)).
