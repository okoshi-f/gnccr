import * as fs from "fs";
import { Findable } from "./Findable";

export class Utf8TextFileRepository implements Findable<void, string> {
  public constructor(private filename: string) {}

  public find(): string {
    return fs.readFileSync(this.filename, "utf8").toString();
  }
}
