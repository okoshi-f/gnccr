import { parse } from "comment-json"
import { PackageJsonRepository } from "../repositories"
import { Serviceable } from "./Serviceable"

export class ParametersService
  implements Serviceable<void, Gnccr.Params | null>
{
  private packageJsonRepository = new PackageJsonRepository()

  public execute(): Gnccr.Params | null {
    return parse(this.packageJsonRepository.find()).gnccr as Gnccr.Params
  }
}
