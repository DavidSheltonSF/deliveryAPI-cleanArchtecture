import { v4 as uuidv4 } from 'uuid';

export const generateHexId =  () => {
  return uuidv4().replace(/-/g, "").slice(0, 24);
}