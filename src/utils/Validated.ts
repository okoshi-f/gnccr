export class Validated {
  constructor(private errors: Array<string> = []) {}

  public isValid(): boolean {
    return this.errors.length === 0
  }

  public getErrors(): Array<string> {
    return [...this.errors]
  }

  public addError(error: string): void {
    this.errors.push(error)
  }
}
