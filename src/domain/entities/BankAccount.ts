export class BankAccount {
  private _id: string;
  private _holderName: string;
  private _cpf: string;
  private _bankCode: string;
  private _agency: string;
  private _accountNumber: string;
  private _accountType: string;
  private static suportedBanks: Record<string, string> = {
    BancoDoBrasil: '001',
    Bradesco: '237',
    Nubank: '260',
    Itau: '341',
  };

  constructor(
    id: string,
    holderName: string,
    cpf: string,
    bankCode: string,
    agency: string,
    accountNumber: string,
    accountType: string
  ) {
    this._id = id;
    this._holderName = holderName;
    this._cpf = cpf;
    this._bankCode = bankCode;
    this._agency = agency;
    this._accountNumber = accountNumber;
    this._accountType = accountType;
  }

  get id(): string {
    return this._id;
  }

  get holderName(): string {
    return this._holderName;
  }

  set holderName(name: string) {
    this._holderName = name;
  }

  get cpf(): string {
    return this._cpf;
  }

  set cpf(cpf: string) {
    this._cpf = cpf;
  }

  get bankCode(): string {
    return this._bankCode;
  }

  set bankCode(bankCode: string) {
    this._bankCode = bankCode;
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

  public bankIsSupported() {
    return Object.values(BankAccount.suportedBanks).includes(this._bankCode);
  }
}
