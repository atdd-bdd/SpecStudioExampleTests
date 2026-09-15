import { execFileSync } from "node:child_process";

/**
 * The transport for a specification that tests a live service.
 *
 * It lives beside the glue rather than in common/, which every build rewrites.
 * It knows nothing about addresses: give it the pieces of a call and it returns
 * the status and the body. Deciding what the answer should be is the
 * specification's job, and comparing is the glue's.
 *
 * The call is synchronous, because the generated test calls each step and moves
 * on without awaiting -- an async step would let the test finish before the
 * response arrived. Node has no synchronous HTTP, so the fetch runs in a child
 * node process and execFileSync waits for it. That is a cost this file pays so
 * the generated test does not have to change shape.
 *
 * A call that cannot be made at all throws, naming the URL. That is a broken
 * test rather than a failed assertion, and the two should not look alike in the
 * output.
 */
export class RestCall {
  constructor(
    readonly status: number,
    readonly body: string,
    readonly url: string,
  ) {}

  /**
   * Sends one request and returns the result.
   *
   * A parameter beginning with '?' is a query string and is appended as it
   * stands; anything else is a path segment and is joined with a slash. So
   * posts/1 is page "posts" with parameter "1", and a search is page "search"
   * with parameter "?q=hat".
   */
  static send(method: string, baseUrl: string, page: string,
              parameter: string, request: string): RestCall {
    const url = RestCall.buildUrl(baseUrl, page, parameter);
    const verb = String(method ?? "").trim().toUpperCase();
    const payload = String(request ?? "").trim();

    try {
      // The child writes the status, a newline, then the body, so the first
      // line is always the status however many lines the body has.
      const output = execFileSync(
        process.execPath,
        ["--input-type=module", "-e", RestCall.child],
        {
          encoding: "utf8",
          timeout: 40000,
          maxBuffer: 32 * 1024 * 1024,
          env: { ...process.env, RC_METHOD: verb, RC_URL: url, RC_BODY: payload },
        },
      );

      const newline = output.indexOf("\n");
      return new RestCall(Number(output.substring(0, newline)),
                          output.substring(newline + 1), url);
    } catch (error) {
      const detail = (error as { stderr?: string; message?: string });
      throw new Error(`Could not call ${url} -- ${detail.stderr || detail.message}`);
    }
  }

  private static readonly child = `
    const options = {
      method: process.env.RC_METHOD,
      headers: { "Accept": "application/json",
                 "Content-Type": "application/json; charset=UTF-8" },
    };
    if (process.env.RC_BODY) options.body = process.env.RC_BODY;

    const response = await fetch(process.env.RC_URL, options);
    process.stdout.write(String(response.status) + "\\n" + await response.text());
  `;

  /** Joins the pieces with exactly one slash, dropping any that are empty. */
  private static buildUrl(baseUrl: string, page: string, parameter: string): string {
    const trim = (s: string) => String(s ?? "").trim().replace(/^\/+|\/+$/g, "");

    let url = trim(baseUrl);
    const cleanPage = trim(page);
    if (cleanPage !== "") url += "/" + cleanPage;

    if (parameter) {
      if (parameter.startsWith("?")) url += parameter;
      else url += "/" + trim(parameter);
    }
    return url;
  }
}
