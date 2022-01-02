import * as fs from "fs"
import { Findable } from "./Findable"
import { Saveable } from "./Saveable"

export class Utf8TextFileRepository
  implements Findable<void, string>, Saveable<string, void>
{
  constructor(private filename: string, private overwrite: boolean = false) {}

  public find(): string {
    return fs.readFileSync(this.filename, "utf8").toString()
  }

  public save(data: string): void {
    fs.writeFileSync(this.filename, data, {
      encoding: "utf8",
      flag: this.overwrite ? "w" : "wx",
    })
  }
}
