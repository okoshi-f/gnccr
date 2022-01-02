import { Serviceable } from "./Serviceable"

export class StdOutWriterService implements Serviceable<string, void> {
  public execute(data: string): void {
    console.log(data)
  }
}
