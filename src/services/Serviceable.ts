export interface Serviceable<P, R> {
  execute(params: P): R
}
