import * as fs from "fs"
import { FindRepository } from "./FindRepository"

export class PackageJsonRepository implements FindRepository<void, string> {
  public constructor() {}

  public find(): string {
    return fs.readFileSync("./package.json", "utf8").toString()
  }
}
