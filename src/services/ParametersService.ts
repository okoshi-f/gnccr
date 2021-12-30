import { parse } from "comment-json"
import { PackageJsonRepository } from "../repositories/PackageJsonRepository"
import { Service } from "./Service"

export class ParametersService implements Service<void, Gnccr.Params | null> {
  private packageJsonRepository = new PackageJsonRepository()

  public execute(): Gnccr.Params | null {
    const params = parse(this.packageJsonRepository.find())
      .gnccr as Gnccr.Params
    return params
  }
}
