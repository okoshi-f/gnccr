import * as fs from "fs"
import { Findable } from "./Findable"
import { Saveable } from "./Saveable"

export class Utf8TextFileRepository
  implements Findable<void, string>, Saveable<string, void>
{
  public constructor(private filename: string) {}

  public find(): string {
    return fs.readFileSync(this.filename, "utf8").toString()
  }

  public save(data: string): void {
    fs.writeFileSync(this.filename, data, "utf8")
  }
}
