export interface HashService {
  hash(raw: string): Promise<string>;
  comparer(raw: string, hash: string): Promise<boolean>;
}
