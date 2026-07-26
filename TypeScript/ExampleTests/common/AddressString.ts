
export class AddressString {
  street: string;
  city: string;
  state: string;
  zIP: string;

  constructor(street: string = "", city: string = "", state: string = "", zIP: string = "") {
    this.street = street;
    this.city = city;
    this.state = state;
    this.zIP = zIP;
  }

  static fromList(values: Iterable<string>): AddressString {
    const v = Array.from(values);
    return new AddressString(
      v[0] ?? "",
      v[1] ?? "",
      v[2] ?? "",
      v[3] ?? ""
    );
  }

  toString(): string {
    return `Street=${this.street}, City=${this.city}, State=${this.state}, ZIP=${this.zIP}`;
  }
}
