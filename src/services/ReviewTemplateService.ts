import { Serviceable } from "./Serviceable"
import ejs from "ejs"

export class ReviewTemplateService
  implements Serviceable<{ [key: string]: any }, string>
{
  public execute(params: { [key: string]: any }): string {
    const template = `
## Body

<%= body %>

## Diff

\`\`\`
<%= diff_hunk %>
\`\`\`

## Link

- [%<= path %>](<%= html_url %>)
    `
    return ejs.render(template, params)
  }
}
