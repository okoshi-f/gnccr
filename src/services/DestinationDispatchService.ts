import { Serviceable } from "./Serviceable"
import { StdOutWriterService, TextFileWriterService } from "./"

export class DestinationDispatchService
  implements Serviceable<Gnccr.Destination, Serviceable<string, void>>
{
  public execute(destination: Gnccr.Destination): Serviceable<string, void> {
    switch (destination.type) {
      case "file":
        if (destination.path) {
          return new TextFileWriterService(destination.path, destination.overwrite ?? false)
        }
        throw new Error("Destination path is required")
      case "stdout":
        return new StdOutWriterService()
      default:
        throw new Error(`Unknown destination type: ${destination.type}`)
    }
  }
}
