
export class AddressString {
  static DNC_STRING = "?DNC?";

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

  equals(other) {
    if (!(other instanceof AddressString)) return false;
    return (this.street === AddressString.DNC_STRING || other.street === AddressString.DNC_STRING || this.street === other.street)
      && (this.city === AddressString.DNC_STRING || other.city === AddressString.DNC_STRING || this.city === other.city)
      && (this.state === AddressString.DNC_STRING || other.state === AddressString.DNC_STRING || this.state === other.state)
      && (this.zIP === AddressString.DNC_STRING || other.zIP === AddressString.DNC_STRING || this.zIP === other.zIP);
  }

  static equalLists(a, b) {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]));
  }
}
