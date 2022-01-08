import { ParametersService } from "../"

let gnccr = () => ""
jest.mock("fs", () => ({
  readFileSync: jest.fn(() => gnccr()),
}));

describe("ParametersService", () => {
  let subject = () => new ParametersService().execute()

  describe("when gnccr entry in package.json", () => {
    it("returns {\"repo\": \"test\"}", () => {
      gnccr = () => "{\"gnccr\": {\"repo\": \"test\"}}"
      expect(subject()).toEqual({"repo": "test"})
    })
  })

  describe("when gnccr entry not in package.json", () => {
    it("returns undefined", () => {
      gnccr = () => "{}"
      expect(subject()).toBeNull()
    })
  })
})
