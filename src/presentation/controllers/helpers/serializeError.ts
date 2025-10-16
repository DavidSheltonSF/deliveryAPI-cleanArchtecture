export function serializeError(error: Error): {name: string , message: string} {
  return {
    name: error.name,
    message: error.message
  }
}