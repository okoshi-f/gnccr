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

  let params = (): Gnccr.Params => paramsOrigin
  const subject = () => new ParametersValidationService(params()).execute().getErrors()

  describe("when valid params specified", () => {
    it("returns empty array", () => {
      expect(subject()).toEqual([])
    })
  })

  describe("about owner", () => {
    describe("when owner is not specified", () => {
      it("throws Error with No owner found", () => {
        params = () => ({ ...paramsOrigin, owner: undefined as any })
        expect(subject()).toMatchObject(["No owner found"])
      })
    })

    describe("when invalid type specified", () => {
      it("throws Error with Owner must be a string", () => {
        params = () => ({ ...paramsOrigin, owner: 1 as any })
        expect(subject()).toMatchObject(["Owner must be a string"])
      })
    })
  })

  describe("about repo", () => {
    describe("when repo is not specified", () => {
      it("throws Error with No repo found", () => {
        params = () => ({ ...paramsOrigin, repo: undefined as any })
        expect(subject()).toMatchObject(["No repo found"])
      })
    })

    describe("when invalid type specified", () => {
      it("throws Error with Repo must be a string", () => {
        params = () => ({ ...paramsOrigin, repo: 1 as any })
        expect(subject()).toMatchObject(["Repo must be a string"])
      })
    })
  })

  describe("about sinceOffsetDaysBefore", () => {
    describe("when sinceOffsetDaysBefore is not specified", () => {
      it("throws Error with No sinceOffsetDaysBefore found", () => {
        params = () => ({ ...paramsOrigin, sinceOffsetDaysBefore: undefined as any })
        expect(subject()).toMatchObject(["No sinceOffsetDaysBefore found"])
      })
    })

    describe("when invalid type specified", () => {
      it("throws Error with SinceOffsetDaysBefore must be a number", () => {
        params = () => ({ ...paramsOrigin, sinceOffsetDaysBefore: "a" as any })
        expect(subject()).toMatchObject(["SinceOffsetDaysBefore must be a number"])
      })
    })
  })

  describe("about keywords", () => {
    describe("when keywords is not specified", () => {
      it("throws Error with No keywords found", () => {
        params = () => ({ ...paramsOrigin, keywords: undefined as any })
        expect(subject()).toMatchObject(["No keywords found"])
      })
    })

    describe("when invalid Keywords type specified", () => {
      it("throws Error with Keywords must be an array", () => {
        params = () => ({ ...paramsOrigin, keywords: {} as any })
        expect(subject()).toMatchObject(["Keywords must be an array"])
      })
    })

    describe("when empty Keywords specified", () => {
      it("throws Error with Keywords must be an array with at least one element", () => {
        params = () => ({ ...paramsOrigin, keywords: [] })
        expect(subject()).toMatchObject(["Keywords must be an array with at least one element"])
      })
    })

    describe("when not array of strings specified", () => {
      it("throws Error with Keywords must be an array of strings", () => {
        params = () => ({ ...paramsOrigin, keywords: [1, 2] as any })
        expect(subject()).toMatchObject(["Keywords must be an array of strings"])
      })
    })
  })

  describe("about destination", () => {
    describe("when destination is not specified", () => {
      it("throws Error with No destination is not specified", () => {
        params = () => ({ ...paramsOrigin, destination: undefined as any })
        expect(subject()).toMatchObject(["No destination found"])
      })
    })

    describe("when invalid destination type specified", () => {
      it("throws Error with Destination must be an Gnccr.Destination", () => {
        params = () => ({ ...paramsOrigin, destination: 1 as any })
        expect(subject()).toMatchObject(["Destination must be an Gnccr.Destination"])
      })
    })

    describe("when invalid type specified", () => {
      it("throws Error with Destination type must be either file or stdout", () => {
        params = () => ({ ...paramsOrigin, destination: { type: "invalid", path: "path", overwrite: false } })
        expect(subject()).toMatchObject(["Destination type must be either file or stdout"])
      })
    })
  })

  describe("about template", () => {
    describe("when template is not specified", () => {
      it("throws Error with No template is not specified", () => {
        params = () => ({ ...paramsOrigin, template: undefined as any })
        expect(subject()).toMatchObject(["No template found"])
      })
    })

    describe("when invalid template type specified", () => {
      it("throws Error with Template must be an array or string", () => {
        params = () => ({ ...paramsOrigin, template: 1 as any })
        expect(subject()).toMatchObject(["Template must be an array or string"])
      })
    })

    describe("when empty template specified", () => {
      it("throws Error with Template must be an array with at least one element", () => {
        params = () => ({ ...paramsOrigin, template: [] as any })
        expect(subject()).toMatchObject(["Template must be an array with at least one element"])
      })
    })

    describe("when not array of strings specified", () => {
      it("throws Error with Template must be an array of strings", () => {
        params = () => ({ ...paramsOrigin, template: [1, 2] as any })
        expect(subject()).toMatchObject(["Template must be an array of strings"])
      })
    })

    describe("when array of strings specified", () => {
      it("returns empty array", () => {
        params = () => ({ ...paramsOrigin, template: ["template1", "template2"] })
        expect(subject()).toEqual([])
      })
    })
  })
})
