import { Service } from "./Service";

export class IssueParserService implements Service<any, void> {
  constructor(writerService: Service<string, void>) {
    this.writerService = writerService
  }

  private writerService: Service<string, void>

  public execute(data: any): void {
    this.writerService.execute(data)
  }
}
