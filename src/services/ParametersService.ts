import { parse } from "comment-json"
import { PackageJsonRepository, Utf8TextFileRepository } from "../repositories"
import { Serviceable } from "./Serviceable"

export class ParametersService
  implements Serviceable<void, Gnccr.Params | null>
{
  private params: Gnccr.Params | null = null

  public execute(): Gnccr.Params | null {
    this.merge(this.loadPackageJson())
    this.merge(this.overwriteByExternalParameterFile())
    return this.params
  }

  private merge(params: Gnccr.Params | null): void {
    if (!params) {
      return
    }

    if (!this.params) {
      this.params = params
      return
    }

    this.params = { ...this.params, ...params }
  }

  private loadPackageJson(): Gnccr.Params | null {
    try {
      const packageJsonRepository = new PackageJsonRepository()
      return (parse(packageJsonRepository.find()).gnccr as Gnccr.Params) || null
    } catch (e) {
      // In order to handle errors in MainController,
      // the error information is ignored and null is returned. 
      return null
    }
  }

  private overwriteByExternalParameterFile(): Gnccr.Params | null {
    try {
      const utf8TextFileRepository = new Utf8TextFileRepository("./.gnccr.js")
      const params = (parse(utf8TextFileRepository.find()) as Gnccr.Params) || null
      if (Object.keys(params).length == 0) {
        return null
      }
      return params
    } catch (e) {
      // Here, too, the error information is ignored
      // and null is returned in order to handle the error in MainController. 
      return null
    }
  }
}
