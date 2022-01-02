import { DestinationDispatchService, StdOutWriterService, TextFileWriterService } from "../"

describe("DestinationDispatchService", () => {
  let destination = () => ({} as Gnccr.Destination)
  const subject = () => new DestinationDispatchService().execute(destination())

  describe("when stdout type specified", () => {
    it("returns StdOutWriterService", () => {
      destination = () => ({ type: "stdout" })
      expect(subject()).toBeInstanceOf(StdOutWriterService)
    })
  })

  describe("when file type specified", () => {
    describe("and path is specified", () => {
      it("returns TextFileWriterService", () => {
        destination = () => ({ type: "file", path: "foo" })
        expect(subject()).toBeInstanceOf(TextFileWriterService)
      })
    })

    describe("and path is not specified", () => {
      it("throws Error with Destination path is required", () => {
        destination = () => ({ type: "file" })
        expect(() => subject()).toThrowError("Destination path is required")
      })
    })
  })

  describe("when invalid type specified", () => {
    it("throws Error with Unknown destination type: invalid", () => {
      destination = () => ({ type: "invalid" })
      expect(() => subject()).toThrowError("Unknown destination type: invalid")
    })
  })
})
