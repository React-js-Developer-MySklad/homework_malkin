export class Contragent {
  private readonly _name: string;
  private _id: number | undefined;
  private readonly _itn: string;   // ИНН
  private readonly _address: string;
  private readonly _trrc: string;  // КПП

  constructor(
    id: number | undefined,
    name: string,
    itn: string,
    address: string,
    trrc: string
  ) {
    this._id = id;
    this._name = name;
    this._itn = itn;
    this._address = address;
    this._trrc = trrc;
  }

  static emptyContragent = () => {
    return new Contragent(undefined, '', '', '', '');
  };

  get name(): string {
    return this._name;
  }

  get id(): number | undefined {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get itn(): string {
    return this._itn;
  }

  get address(): string {
    return this._address;
  }

  get trrc(): string {
    return this._trrc;
  }
}
