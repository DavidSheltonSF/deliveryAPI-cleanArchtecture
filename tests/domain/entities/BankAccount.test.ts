import { BankAccount } from '../../../src/domain/entities/bankAccount/BankAccount';
import { Cpf, Name } from '../../../src/domain/value-objects';
import { v4 as uuidv4 } from 'uuid';


describe('BankAccount Model', () => {
  const validProps = {
    holderName: Name.create('Gustavo').getRight(),
    cpf: Cpf.create('58744525214').getRight(),
    bankCode: '001',
    agency: '0001',
    accountNumber: '1234567',
    accountType: 'checking',
  };

  test('should create a bank account with valid properties', () => {
    const bankAccountId = uuidv4();
    const newBankAccount = new BankAccount(bankAccountId, validProps);
    
    expect(newBankAccount.holderName.get()).toBe(validProps.holderName.get());
    expect(newBankAccount.cpf.get()).toBe(validProps.cpf.get());
    expect(newBankAccount.bankCode).toBe(validProps.bankCode);
    expect(newBankAccount.agency).toBe(validProps.agency);
    expect(newBankAccount.accountNumber).toBe(validProps.accountNumber);
    expect(newBankAccount.accountType).toBe(validProps.accountType);
    expect(newBankAccount.id).toBe(bankAccountId);
  });

  test('should allow updating holderName', () => {
    const bankAccount = new BankAccount(uuidv4(), validProps);
    const newName = Name.create('Ana').getRight();
    bankAccount.holderName = newName;
    expect(bankAccount.holderName.get()).toBe('Ana');
  });

  test('should allow updating cpf', () => {
    const bankAccount = new BankAccount(uuidv4(), validProps);
    const newCpf = Cpf.create('12345678909').getRight();
    bankAccount.cpf = newCpf;
    expect(bankAccount.cpf.get()).toBe('12345678909');
  });

  test('should allow updating bankCode', () => {
    const bankAccount = new BankAccount(uuidv4(), validProps);
    bankAccount.bankCode = '237';
    expect(bankAccount.bankCode).toBe('237');
  });

  test('should allow updating agency', () => {
    const bankAccount = new BankAccount(uuidv4(), validProps);
    bankAccount.agency = '9999';
    expect(bankAccount.agency).toBe('9999');
  });

  test('should allow updating accountNumber', () => {
    const bankAccount = new BankAccount(uuidv4(), validProps);
    bankAccount.accountNumber = '7654321';
    expect(bankAccount.accountNumber).toBe('7654321');
  });

  test('should allow updating accountType', () => {
    const bankAccount = new BankAccount(uuidv4(), validProps);
    bankAccount.accountType = 'savings';
    expect(bankAccount.accountType).toBe('savings');
  });

  test('should return true for supported bank code', () => {
    const bankAccount = new BankAccount(uuidv4(), { ...validProps, bankCode: '001' });
    expect(bankAccount.bankIsSupported()).toBe(true);
  });

  test('should return false for unsupported bank code', () => {
    const bankAccount = new BankAccount(uuidv4(), { ...validProps, bankCode: '999' });
    expect(bankAccount.bankIsSupported()).toBe(false);
  });
});
