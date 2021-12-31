import { Utf8TextFileRepository } from "../repositories/Utf8TextFileRepository"
import { Serviceable } from "./Serviceable"

export class TextFileWriterService implements Serviceable<string, void> {
  constructor(private filename: string) {}

  private textFileRepository = new Utf8TextFileRepository(this.filename)

  public execute(data: string): void {
    this.textFileRepository.save(data)
  }
}
