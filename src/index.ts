#!/usr/bin/env node

import * as fs from "fs"

const productionPath = `${ process.cwd() }/node_modules/gnccr/dist/controllers`
const developPath = "controllers"
const path = fs.existsSync(productionPath) ? productionPath : developPath
const { MainController } = require(path)

MainController.execute()
  // @ts-ignore
  .then((exitCode) => {
    process.exit(exitCode ?? 0)
  })
  // @ts-ignore
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
