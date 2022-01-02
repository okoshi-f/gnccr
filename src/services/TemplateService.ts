import ejs from "ejs"
import { Serviceable } from "./Serviceable"

export class TemplateService
  implements Serviceable<{ [key: string]: any }, string>
{
  constructor(private template: string) {}

  public execute(params: { [key: string]: any }): string {
    return ejs.render(this.template, params)
  }
}
