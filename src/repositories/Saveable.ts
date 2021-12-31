export interface Saveable<P, R> {
  save(data: P): R
}
