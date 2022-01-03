import { MainController } from "./controllers"

MainController.execute()
  .then((exitCode) => {
    process.exit(exitCode ?? 0)
  })
  .catch((e) => {
    console.error(e.message)
    process.exit(1)
  })
