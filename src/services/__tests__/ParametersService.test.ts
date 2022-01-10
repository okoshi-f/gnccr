import { ParametersService } from "../"

let packageJson = () => ""
let gnccrJs = () => ""
jest.mock("fs", () => ({
  readFileSync: jest.fn((filename) => {
    if (filename === "./package.json") {
      return packageJson()
    }

    if (filename === "./.gnccr.js") {
      return gnccrJs()
    }
  }),
}));

describe("ParametersService", () => {
  let subject = () => new ParametersService().execute()

  describe("when gnccr entry in package.json", () => {
    it("returns {\"repo\": \"test\"}", () => {
      packageJson = () => "{\"gnccr\": {\"repo\": \"test\"}}"
      gnccrJs = () => null as any
      expect(subject()).toEqual({"repo": "test"})
    })
  })

  describe("when gnccr entry not in package.json", () => {
    it("returns null", () => {
      packageJson = () => "{}"
      gnccrJs = () => null as any
      expect(subject()).toBeNull()
    })
  })

  describe("when gnccr entry in .gnccr.js", () => {
    it("returns {\"repo\": \"test\"}", () => {
      packageJson = () => null as any
      gnccrJs = () => "{\"repo\": \"test\"}"
      expect(subject()).toEqual({"repo": "test"})
    })
  })

  describe("when gnccr entry not in .gnccr.js", () => {
    it("returns null", () => {
      packageJson = () => null as any
      gnccrJs = () => "{}"
      expect(subject()).toBeNull()
    })
  })
})
