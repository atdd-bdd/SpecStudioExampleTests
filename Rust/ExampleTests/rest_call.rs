use std::process::Command;

/// The transport for a specification that tests a live service.
///
/// It lives beside the glue rather than in common/, which every build rewrites.
/// It knows nothing about addresses: give it the pieces of a call and it returns
/// the status and the body. Deciding what the answer should be is the
/// specification's job, and comparing is the glue's.
///
/// The transport is curl rather than a crate. Rust has no HTTP in its standard
/// library, and this repository builds nine languages from one specification; a
/// dependency added here would have to be fetched before the Rust tests could
/// run at all, which is a heavier thing to ask of a reader than a program every
/// supported platform already ships. The two JavaScripts spawn a child process
/// for the same reason.
///
/// A call that cannot be made at all returns an error naming the URL. That is a
/// broken test rather than a failed assertion, and the two should not look alike
/// in the output.
#[derive(Debug, Clone)]
pub struct RestCall {
    pub status: u16,
    pub body: String,
    pub url: String,
}

impl RestCall {
    /// Sends one request and returns the result.
    ///
    /// A parameter beginning with '?' is a query string and is appended as it
    /// stands; anything else is a path segment and is joined with a slash. So
    /// posts/1 is page "posts" with parameter "1", and a search is page
    /// "search" with parameter "?q=hat".
    pub fn send(method: &str, base_url: &str, page: &str, parameter: &str,
                request: &str) -> Result<RestCall, String> {
        let url = build_url(base_url, page, parameter);
        let verb = method.trim().to_uppercase();

        // -s silences the progress meter, and -w writes the status after the
        // body so the last line is always the status however many lines the
        // body has.
        let mut command = Command::new("curl");
        command
            .arg("-s")
            .arg("-X").arg(&verb)
            .arg("-H").arg("Accept: application/json")
            .arg("-H").arg("Content-Type: application/json; charset=UTF-8")
            .arg("--max-time").arg("30")
            .arg("-w").arg("\n%{http_code}")
            .arg(&url);

        if !request.trim().is_empty() {
            command.arg("--data-binary").arg(request);
        }

        let output = command
            .output()
            .map_err(|e| format!("Could not call {} -- {}", url, e))?;
        if !output.status.success() {
            return Err(format!("Could not call {} -- curl exited {}", url, output.status));
        }

        let text = String::from_utf8_lossy(&output.stdout).to_string();
        let split = text
            .rfind('\n')
            .ok_or_else(|| format!("{} returned nothing", url))?;

        let status: u16 = text[split + 1..]
            .trim()
            .parse()
            .map_err(|_| format!("{} returned no status", url))?;

        Ok(RestCall { status, body: text[..split].to_string(), url })
    }
}

/// Joins the pieces with exactly one slash, dropping any that are empty.
fn build_url(base_url: &str, page: &str, parameter: &str) -> String {
    let mut url = base_url.trim().trim_matches('/').to_string();

    let clean_page = page.trim().trim_matches('/');
    if !clean_page.is_empty() {
        url.push('/');
        url.push_str(clean_page);
    }

    if !parameter.is_empty() {
        if parameter.starts_with('?') {
            url.push_str(parameter);
        } else {
            url.push('/');
            url.push_str(parameter.trim().trim_matches('/'));
        }
    }
    url
}
