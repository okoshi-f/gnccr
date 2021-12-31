import { Serviceable } from "./Serviceable";

export class TextFileWriterService implements Serviceable<string, void> {
  constructor(private filename: string) {}

  public execute(data: string): void {
    console.log(`filename=${this.filename}, data=${JSON.stringify(data)}`)
  }
}
