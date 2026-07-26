
export class AddressString {
  constructor(street = "", city = "", state = "", zIP = "") {
    this.street = street;
    this.city = city;
    this.state = state;
    this.zIP = zIP;
  }

  static fromList(values) {
    const v = Array.from(values);
    return new AddressString(
      v[0] ?? "",
      v[1] ?? "",
      v[2] ?? "",
      v[3] ?? ""
    );
  }

  toString() {
    return `Street=${this.street}, City=${this.city}, State=${this.state}, ZIP=${this.zIP}`;
  }
}
