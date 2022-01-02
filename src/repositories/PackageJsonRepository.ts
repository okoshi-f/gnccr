import { Findable } from "./Findable"
import { Utf8TextFileRepository } from "./"

export class PackageJsonRepository implements Findable<void, string> {
  private utf8TextFileRepository = new Utf8TextFileRepository("./package.json")

  public find(): string {
    return this.utf8TextFileRepository.find()
  }
}
