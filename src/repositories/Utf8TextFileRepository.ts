import * as fs from "fs"
import { Findable } from "repositories/Findable"
import { Saveable } from "repositories/Saveable"

export class Utf8TextFileRepository
  implements Findable<void, string>, Saveable<string, void>
{
  constructor(private filename: string) {}

  public find(): string {
    return fs.readFileSync(this.filename, "utf8").toString()
  }

  public save(data: string): void {
    fs.writeFileSync(this.filename, data, "utf8")
  }
}
