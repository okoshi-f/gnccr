import { Serviceable } from "services/Serviceable"
import ejs from "ejs"

export class TemplateService
  implements Serviceable<{ [key: string]: any }, string>
{
  constructor(private template: string) {}

  public execute(params: { [key: string]: any }): string {
    return ejs.render(this.template, params)
  }
}
