export interface Listable<P, R> {
  findAll(params: P): R
}
