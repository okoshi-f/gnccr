import { Service } from "./Service";

export class TextFileWriterService implements Service<string, void> {
  constructor(filename: string) {
    this.filename = filename
  }

  private filename: string

  public execute(data: string): void {
    console.log(`filename=${this.filename}, data=${data}`)
  }
}
