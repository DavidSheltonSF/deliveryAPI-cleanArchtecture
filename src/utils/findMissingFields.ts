export function findMissingFields(
  data: Record<string, any>,
  requiredFields: Array<string>
): Array<string> {
  const missingFields = [];

  for (let i in requiredFields) {
    if (!Object.keys(data).includes(requiredFields[i])) {
      missingFields.push(requiredFields[i]);
    }
  }

  return missingFields;
}
