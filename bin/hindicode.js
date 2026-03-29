#!/usr/bin/env node

const { runCli } = require("../src/cli/main");

process.exitCode = runCli(process.argv, console);
