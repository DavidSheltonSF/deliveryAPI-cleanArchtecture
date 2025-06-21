export interface Comparer {
  compare(raw: string, hashed: string): Promise<boolean>
}