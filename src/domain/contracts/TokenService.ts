export interface TokenService {
  sign(payload: Record<string, any>): string
  verify(token: string): Record<string, any> | null
}