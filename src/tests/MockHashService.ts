import { HashService } from "../domain/contracts/HashService";

export class MockHashService implements HashService {
  async hash(raw: string): Promise<string> {
    const promise: Promise<string> =  new Promise((resolve, reject) => {
      try {
        resolve(raw + '-hashed');

      } catch (error) {
        reject('Something wen wrong')
      }
    });
    
    return promise
  }

  compare(raw: string, hash: string): Promise<boolean> {
    const promise: Promise<boolean> =  new Promise((resolve, reject) => {
      try {
        const hashedString = raw + '-hashed';
        resolve(hashedString === hash);

      } catch (error) {
        reject('Something wen wrong');
      }    
    })

    return promise
  }
}