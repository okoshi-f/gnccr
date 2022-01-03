import { StdOutWriterService } from "../"

jest.spyOn(console, "log")

describe("StdOutWriterService", () => {
  const subject = () => new StdOutWriterService().execute("Lorem ipsum")

  it("prints Lorem ipsum text", () => {
    subject()
    expect(console.log).toBeCalledWith("Lorem ipsum")
  })
})
