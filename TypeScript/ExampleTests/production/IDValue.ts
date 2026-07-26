export class IDValue {
  iD: IDForm;
  value: number;

  constructor(iD: IDForm, value: number = 0) {
    this.iD = iD;
    this.value = value;
  }
}
