import { Serviceable } from "./Serviceable"

export class ParametersValidationService
  implements Serviceable<void, Error | null>
{
  constructor(private params: Gnccr.Params) {}

  public execute(): Error | null {
    try {
      this.validateOwner()
      this.validateRepo()
      this.validateKeywords()
      this.validateDestination()
      this.validateTemplate()
      this.validateSinceOffsetDaysBefore()
    } catch (e) {
      if (e instanceof Error) {
        return e
      }
      throw e
    }
    return null
  }

  private validateOwner(): void {
    const owner = this.params.owner

    if (!owner) {
      throw new Error("No owner found")
    }

    if (typeof owner !== "string") {
      throw new Error("Owner must be a string")
    }
  }

  private validateRepo(): void {
    const repo = this.params.repo

    if (!repo) {
      throw new Error("No repo found")
    }

    if (typeof repo !== "string") {
      throw new Error("Repo must be a string")
    }
  }

  private validateKeywords(): void {
    const keywords = this.params.keywords

    if (!keywords) {
      throw new Error("No keywords found")
    }

    if (!(keywords instanceof Array)) {
      throw new Error("Keywords must be an array")
    }

    if (keywords.length === 0) {
      throw new Error("Keywords must be an array with at least one element")
    }

    if (keywords.some((keyword) => typeof keyword !== "string")) {
      throw new Error("Keywords must be an array of strings")
    }
  }

  private validateDestination(): void {
    const destination = this.params.destination

    if (!destination) {
      throw new Error("No destination found")
    }

    if (!(destination instanceof Object)) {
      throw new Error("Destination must be an Gnccr.Destination")
    }

    if (!(["file", "stdout"].includes(destination.type))) {
      throw new Error("Destination type must be either file or stdout")
    }
  }

  private validateTemplate(): void {
    const template = this.params.template

    if (!template) {
      throw new Error("No template found")
    }

    if (!(template instanceof Array || typeof template === "string")) {
      throw new Error("Template must be an array or string")
    }

    if (template instanceof Array && template.length === 0) {
      throw new Error("Template must be an array with at least one element")
    }

    if (template instanceof Array && template.some((t) => typeof t !== "string")) {
      throw new Error("Template must be an array of strings")
    }
  }

  private validateSinceOffsetDaysBefore(): void {
    const sinceOffsetDaysBefore = this.params.sinceOffsetDaysBefore

    if (!sinceOffsetDaysBefore) {
      throw new Error("No sinceOffsetDaysBefore found")
    }

    if (typeof sinceOffsetDaysBefore !== "number") {
      throw new Error("SinceOffsetDaysBefore must be a number")
    }

    if (sinceOffsetDaysBefore < 0) {
      throw new Error("SinceOffsetDaysBefore must be a positive number")
    }
  }
}
