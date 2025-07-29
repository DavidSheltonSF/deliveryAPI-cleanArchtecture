export interface IdService {
  generate(): any
  validate(id: any): boolean
}