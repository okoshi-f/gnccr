import { Utf8TextFileRepository } from "../repositories"
import { Serviceable } from "./Serviceable"

export class TextFileWriterService implements Serviceable<string, void> {
  constructor(private filename: string, private overwrite: boolean) {}

  private textFileRepository = new Utf8TextFileRepository(
    this.filename,
    this.overwrite
  )

  public execute(data: string): void {
    this.textFileRepository.save(data)
  }
}
