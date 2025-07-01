import { Cpf, Name } from '../../value-objects';
import { BankAccountProps } from './BankAccountProps';

export class BankAccount {
  private _id: string;
  private _holderName: Name;
  private _cpf: Cpf;
  private _bank: string;
  private _agency: string;
  private _accountNumber: string;
  private _accountType: string;

  constructor(id: string, bankAccountData: BankAccountProps) {
    this._id = id;
    this._holderName = bankAccountData.holderName;
    this._cpf = bankAccountData.cpf;
    this._bank = bankAccountData.bank;
    this._agency = bankAccountData.agency;
    this._accountNumber = bankAccountData.accountNumber;
    this._accountType = bankAccountData.accountType;
  }

  get id(): string {
    return this._id;
  }

  get holderName(): Name {
    return this._holderName;
  }

  set holderName(name: Name) {
    this._holderName = name;
  }

  get cpf(): Cpf {
    return this._cpf;
  }

  set cpf(cpf: Cpf) {
    this._cpf = cpf;
  }

  get bank(): string {
    return this._bank;
  }

  set bank(bank: string) {
    this._bank = bank;
  }

  get agency(): string {
    return this._agency;
  }

  set agency(agency: string) {
    this._agency = agency;
  }

  get accountNumber(): string {
    return this._accountNumber;
  }

  set accountNumber(accountNumber: string) {
    this._accountNumber = accountNumber;
  }

  get accountType(): string {
    return this._accountType;
  }

  set accountType(accountType: string) {
    this._accountType = accountType;
  }
}
