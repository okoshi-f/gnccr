#!/usr/local/bin/node

import { MainController } from "./controllers/MainController";

MainController.execute()
  .then((exitCode) => {
    process.exit(exitCode ?? 0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
