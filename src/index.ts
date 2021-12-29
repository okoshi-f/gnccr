import { parse } from "comment-json"
import * as fs from "fs"

const params = parse(fs.readFileSync("./package.json", "utf8").toString()).gncc as Gncc.Params
console.log(JSON.stringify(params))
