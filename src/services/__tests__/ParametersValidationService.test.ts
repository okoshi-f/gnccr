import { ParametersValidationService } from "../"

describe("ParametersValidationService", () => {
  const paramsOrigin = {
    owner: "owner",
    repo: "repo",
    keywords: ["keywords"],
    sinceOffsetDaysBefore: 1,
    destination: { type: "file", path: "path", overwrite: false },
    template: "template",
  }
  let params = () => paramsOrigin
  const subject = () => new ParametersValidationService(params()).execute()

  describe("when valid params specified", () => {
    it("returns null", () => {
      expect(subject()).toBeNull()
    })
  })

  describe("about keywords", () => {
    describe("when keywords is not specified", () => {
      it("throws Error with No keywords found", () => {
        params = () => ({ ...paramsOrigin, keywords: undefined as any })
        expect(subject()).toMatchObject(new Error("No keywords found"))
      })
    })

    describe("when invalid Keywords type specified", () => {
      it("throws Error with Keywords must be an array", () => {
        params = () => ({ ...paramsOrigin, keywords: {} as any })
        expect(subject()).toMatchObject(new Error("Keywords must be an array"))
      })
    })

    describe("when empty Keywords specified", () => {
      it("throws Error with Keywords must be an array with at least one element", () => {
        params = () => ({ ...paramsOrigin, keywords: [] })
        expect(subject()).toMatchObject(new Error("Keywords must be an array with at least one element"))
      })
    })

    describe("when not array of strings specified", () => {
      it("throws Error with Keywords must be an array of strings", () => {
        params = () => ({ ...paramsOrigin, keywords: [1, 2] as any })
        expect(subject()).toMatchObject(new Error("Keywords must be an array of strings"))
      })
    })
  })

  describe("about destination", () => {
    describe("when destination is not specified", () => {
      it("throws Error with No destination is not specified", () => {
        params = () => ({ ...paramsOrigin, destination: undefined as any })
        expect(subject()).toMatchObject(new Error("No destination found"))
      })
    })

    describe("when invalid destination type specified", () => {
      it("throws Error with Destination must be an Gnccr.Destination", () => {
        params = () => ({ ...paramsOrigin, destination: 1 as any })
        expect(subject()).toMatchObject(new Error("Destination must be an Gnccr.Destination"))
      })
    })

    describe("when invalid type specified", () => {
      it("throws Error with Destination type must be either file or stdout", () => {
        params = () => ({ ...paramsOrigin, destination: { type: "invalid", path: "path", overwrite: false } })
        expect(subject()).toMatchObject(new Error("Destination type must be either file or stdout"))
      })
    })
  })
})
