export function thereIsBody(body: any): boolean {
  return body && Object.keys(body).length > 0;
}