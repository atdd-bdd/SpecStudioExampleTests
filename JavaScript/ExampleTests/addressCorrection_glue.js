import { MatchTyped, ResponseTyped, StatusTyped } from "./common/index.js";
import { RestCall } from "./rest_call.js";

/**
 * Glue for a specification that tests a live service.
 *
 * There are no production classes: the Census Bureau geocoder is the thing
 * under test. So this file does only three things -- build the call, hand the
 * reply to the generated fromJSON, and compare. It never touches the JSON
 * itself.
 *
 * That is possible because the attribute sets in the specification mirror the
 * shape of the reply, so ResponseTyped.fromJSON reads all of it. Glue
 * navigating a reply is a sign the specification is not describing it honestly.
 */
export class AddressCorrectionGlue {
  static DNC_STRING = "?DNC?";

  #baseUrl = "";
  #response;

  givenBasePageIs(values) {
    this.#baseUrl = values[0][0];
  }

  whenSendingRequest(values) {
    const request = values[0];
    this.#response = RestCall.send(request.method, this.#baseUrl, request.page,
                                   query(request), "");
  }

  thenResponseStatusIs(values) {
    const call = this.#requireCall();
    const want = StatusTyped.fromStringObj(values[0]).code;
    expect(`status from ${call.url}: ${call.status}`)
      .toBe(`status from ${call.url}: ${want}`);
  }

  thenTheMatchedAddressesAre(values) {
    const actual = this.#matches();
    expect(`matches: ${actual.length}`).toBe(`matches: ${values.length}`);

    // Compared as a set rather than in order: each expected row must find an
    // actual row it has not already claimed. A test that fails because a
    // service reordered its results is testing the wrong thing.
    //
    // The comparison is on the String form, not the Typed one. Only the String
    // classes skip a field marked ?DNC?, which is what makes a CompareOnly
    // table check its own columns and no others.
    const remaining = [...actual];
    for (const expected of values) {
      const found = remaining.findIndex((candidate) => candidate.equals(expected));
      expect(`matched ${expected}: ${found >= 0}`).toBe(`matched ${expected}: true`);
      if (found >= 0) remaining.splice(found, 1);
    }
  }

  thenThereAreNoMatchedAddresses() {
    expect(`matches: ${this.#matches().length}`).toBe("matches: 0");
  }

  // ---- the two translations ---------------------------------------------

  /** The reply, read by the generated reader, as the rows a table compares. */
  #matches() {
    const reply = ResponseTyped.fromJSON(this.#requireCall().body);
    return MatchTyped.toStringList(reply.result.addressMatches);
  }

  #requireCall() {
    expect(`a request was sent: ${this.#response !== undefined}`)
      .toBe("a request was sent: true");
    return this.#response;
  }
}

/** The query string the geocoder expects, from the fields of the table. */
function query(request) {
  return "?address=" + encodeURIComponent(request.address)
       + "&benchmark=" + encodeURIComponent(request.benchmark)
       + "&format=" + encodeURIComponent(request.format);
}
