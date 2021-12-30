export interface Service<P, R> {
  execute(params: P): R
}
