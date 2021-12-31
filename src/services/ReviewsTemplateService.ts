import { Serviceable } from "./Serviceable"
import ejs from "ejs"

export class ReviewsTemplateService
  implements Serviceable<{ [key: string]: any }, string>
{
  public execute(params: { [key: string]: any }): string {
    const template = `
# Default Template

This is template.

<% reviews.forEach((value, key) => { %>
  <%= value %>
<% }) %>
    `
    return ejs.render(template, params)
  }
}
