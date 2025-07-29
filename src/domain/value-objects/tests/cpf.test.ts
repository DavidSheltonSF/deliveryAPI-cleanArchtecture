import { Cpf } from '..';

describe('Testing Cpf validator', () => {
  test('Trying to create a valid cpf', () => {
    const validCpf = '555.885.584-58';
    const cpfOrError = Cpf.create(validCpf);
    const gotCpf = cpfOrError.getRight();

    expect(cpfOrError.isRight()).toBeTruthy();
    expect(validCpf).toBe(gotCpf.getValue());
  });

  test('should create a valid Cpf from persistence', () => {
    const validCpf = '555.885.584-58';
    const cpf = Cpf.createFromPersistence(validCpf);

    expect(cpf.getValue()).toBe(validCpf);
  });

  test('Trying to create cpf without simbols', () => {
    const validCpf = '55588558458';
    const cpfOrError = Cpf.create(validCpf);
    const gotCpf = cpfOrError.getRight();

    expect(cpfOrError.isRight()).toBeTruthy();
    expect(validCpf).toBe(gotCpf.getValue());
  });

  test('Trying to create a cpf with more than 14 characteres', () => {
    let tooLongCpf = '';

    for (let i = 0; i < 256; i++) {
      tooLongCpf += '8';
    }

    const cpfOrError = Cpf.create(tooLongCpf);

    expect(cpfOrError.isLeft()).toBeTruthy();
  });

  test('Trying to create with special characteres', () => {
    let invalidCpf = '@555.555.777-56';

    const cpfOrError = Cpf.create(invalidCpf);

    expect(cpfOrError.isLeft()).toBeTruthy();
  });

  test('Trying to create cpf with wrong format', () => {
    let invalidCpf = '@555-555-777.56';

    const cpfOrError = Cpf.create(invalidCpf);

    expect(cpfOrError.isLeft()).toBeTruthy();
  });
});
