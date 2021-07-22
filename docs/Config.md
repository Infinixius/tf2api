---
title: Config
---

# Config

tf2api uses `config.json` to configure parts of the server. In a freshly cloned repository, you'll need to rename `config.template.json` to `config.json`

- `port` - Port the server runs on. Can be replaced with "env" to use process.env.PORT, which is required if hosting on Heroku.

- `endpoints` - List of all endpoints. true/false denotes whether the endpoint will be avaliable or return an ENDPOINTDISABLED error.

- `logger.enabled` - Enables logging to a file and console
- `logger.format` - Format of log messages. Avaliable options: %time, %date, %type, %TYPE, %log
- `logger.fileFormat` - Format of log file names. Avaliable options: %time, %date

- `logger.info` - Basic information
- `logger.errors` - Any non-fatal errors
- `logger.warnings` - Any warnings that aren't serious enough to be considered an error
- `logger.debug` - Debugging information
