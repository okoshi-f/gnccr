import { Validated } from "../utils"
import { Serviceable } from "./Serviceable"

export class ParametersValidationService
  implements Serviceable<void, Validated>
{
  constructor(private params: Gnccr.Params) {}

  private validated = new Validated()

  public execute(): Validated {
    this.validateOwner()
    this.validateRepo()
    this.validateKeywords()
    this.validateDestination()
    this.validateTemplate()
    this.validateSinceOffsetDaysBefore()

    return this.validated
  }

  private validateOwner(): void {
    const owner = this.params.owner

    if (!owner) {
      this.validated.addError("No owner found")
      return
    }

    if (typeof owner !== "string") {
      this.validated.addError("Owner must be a string")
      return
    }
  }

  private validateRepo(): void {
    const repo = this.params.repo

    if (!repo) {
      this.validated.addError("No repo found")
      return
    }

    if (typeof repo !== "string") {
      this.validated.addError("Repo must be a string")
      return
    }
  }

  private validateKeywords(): void {
    const keywords = this.params.keywords

    if (!keywords) {
      this.validated.addError("No keywords found")
      return
    }

    if (!(keywords instanceof Array)) {
      this.validated.addError("Keywords must be an array")
      return
    }

    if (keywords.length === 0) {
      this.validated.addError(
        "Keywords must be an array with at least one element"
      )
      return
    }

    if (keywords.some((keyword) => typeof keyword !== "string")) {
      this.validated.addError("Keywords must be an array of strings")
      return
    }
  }

  private validateDestination(): void {
    const destination = this.params.destination

    if (!destination) {
      this.validated.addError("No destination found")
      return
    }

    if (!(destination instanceof Object)) {
      this.validated.addError("Destination must be an Gnccr.Destination")
      return
    }

    if (!["file", "stdout"].includes(destination.type)) {
      this.validated.addError("Destination type must be either file or stdout")
      return
    }
  }

  private validateTemplate(): void {
    const template = this.params.template

    if (!template) {
      this.validated.addError("No template found")
      return
    }

    if (!(template instanceof Array || typeof template === "string")) {
      this.validated.addError("Template must be an array or string")
      return
    }

    if (template instanceof Array && template.length === 0) {
      this.validated.addError(
        "Template must be an array with at least one element"
      )
      return
    }

    if (
      template instanceof Array &&
      template.some((t) => typeof t !== "string")
    ) {
      this.validated.addError("Template must be an array of strings")
      return
    }
  }

  private validateSinceOffsetDaysBefore(): void {
    const sinceOffsetDaysBefore = this.params.sinceOffsetDaysBefore

    if (!sinceOffsetDaysBefore) {
      this.validated.addError("No sinceOffsetDaysBefore found")
      return
    }

    if (typeof sinceOffsetDaysBefore !== "number") {
      this.validated.addError("SinceOffsetDaysBefore must be a number")
      return
    }

    if (sinceOffsetDaysBefore < 0) {
      this.validated.addError("SinceOffsetDaysBefore must be a positive number")
      return
    }
  }
}
