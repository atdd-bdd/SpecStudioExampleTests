# SpecStudio Example Tests

Worked examples of SpecStudio™ specifications, generated into all nine supported
languages. If you want to see what a `.spectable` file looks like and what comes
out the other end, start here.

Every example is generated into Java, C#, C++, Go, JavaScript, Python, Rust,
Swift and TypeScript from the *same* specification. Reading one specification and
then its nine outputs is the fastest way to see what the format does and does not
commit you to.

> **This repository is for showing.** Its companion,
> [SpecStudioVariousTests](https://github.com/atdd-bdd/SpecStudioVariousTests),
> is for testing — that is where new SpecStudio features get exercised, including
> the awkward cases. Examples here are meant to be read.

## What is here

| Specification | What it demonstrates |
|---|---|
| `Calculator.spectable` | The smallest useful thing: one `Calculation`, one `Examples:` table, one `Attributes` block describing its columns. Start here. |
| `Types.spectable` | `DataType` — a value with its own rules. Two of them, each stating validity by example through the built-in `ValidValues` set, with `Description`, `Details`, `Constraint` and `Uses` as named comments that travel into the generated code. |
| `RecordFilterExample.spectable` | A `Calculation`, a `DataType`, an `Entity` and three `Scenario`s that filter records — including `Vertical`, which turns a wide one-row table on its side. |
| `Shopping Cart.spectable` | The full picture: four `Entity`s, two `Collection`s, a `DataType`, three `BusinessRule`s, four `Scenario`s, a `Background`, and five `Define`s keeping long tables out of the scenarios. |
| `json.spectable` | Converting an object and a table to and from JSON, all four directions, with the expected JSON given as a docstring. |
| `AddressCorrection.spectable` | Testing a **live API** rather than a class. No production code at all: the US Census address geocoder is the thing under test, and the glue only builds the call, flattens the answer and compares. Shows `CompareOnly`, a set comparison over several returned rows, and why every expected value is a real one. |

They live in `StandardExamplesTests/`, alongside one `.specconfig` per language.

**`AddressCorrection.spectable` is generated into Java only so far.** It is the
one example that calls a network service, and each language needs its own
transport and JSON navigation written before it can join in; the other eight are
outstanding. It also needs the internet — with no connection its five tests fail
naming the URL they could not reach, which is the transport saying so rather
than an assertion failing.

## Layout

```
StandardExamplesTests/     the specifications and the nine configurations
Java/    CSharp/    CPlusPlus/
Go/      JavaScript/ Python/
Rust/    Swift/     TypeScript/
```

Each `.specconfig` names the language, its test framework, and where generated
code goes — for example `Java.specconfig` writes to
`../Java/SpectableJavaExamplesTest/src/test/java/spectable`. The paths are
relative to the configuration file, so the repository works wherever it is
cloned.

The specifications sit in one folder and the generated code in another, which is
a small demonstration in itself: specifications need not live beside the code
generated from them. See `Configuration Guide.md` in the SpecStudio repository
for putting them in a different repository entirely.

## Which files are generated, and which are not

This matters if you edit anything here.

| | |
|---|---|
| `*_Test.*`, `*Tests.*`, `test_*.*` | **Generated.** Overwritten on every build. |
| `common/` | **Generated** — the `*String` and `*Typed` classes, `Json`, table helpers. |
| `*_glue.*` | **Hand written.** New steps are appended; nothing is rewritten. |
| `RestCall.java` | **Hand written.** The transport for `AddressCorrection`. It sits beside the glue rather than in `common/`, which every build rewrites. |
| `production/` | **Hand written.** A stub is written only if the type is not found. |
| copied `*.spectable` | Generated copy, placed beside the tests for reference. |

The glue is the interesting part to read. It should contain no business logic at
all — its job is to move values between the test's tables and the production
objects, which is where the real work lives. `json.spectable`'s glue is a good
short example: two mapping helpers and eight one-line steps, with every decision
about JSON inside the `SimpleJson` production class.

## Running the tests

```powershell
.\run_all_tests.ps1                 # all nine, with a summary
.\run_all_tests.ps1 -Language Rust  # just one
.\run_all_tests.ps1 -Quiet          # summary only
```

Each language also has its own `<Language>\run_tests.ps1` that handles that
toolchain's setup. You need the toolchain for whichever languages you want to
run — a JDK and Maven, .NET, Go, Cargo, Python with pytest, Node, Swift, and a
C++ compiler with CMake. Nothing here installs them for you.

Two toolchain requirements are worth stating because the failure they produce
does not name the real cause:

- **Java 17 or later.** A docstring in a specification generates a Java text
  block, which needs 15 or later. On an older `maven.compiler.source` the build
  stops at `text blocks are not supported in -source 11`, pointing at generated
  code rather than at the `pom.xml`.
- **The `python` on your PATH is the one used**, and it must have `pytest`
  installed. If several Pythons are installed, the first on PATH wins, and the
  failure is a bare `No module named pytest` rather than anything about the
  tests.

## Regenerating

Open `ExampleTests.sspec` in SpecStudio and use **Build → Solution**, or run the
converter directly:

```powershell
SpecTableConverter --language Java --framework JUnit --namespace spectable `
    "StandardExamplesTests\Calculator.spectable" `
    "Java\SpectableJavaExamplesTest\src\test\java\spectable"
```

A regenerated scaffold with no glue is **all red** by design: every generated
stub ends in a failure so that an unimplemented step cannot quietly report
success. The glue in this repository is already written, so the tests pass.

## Licence

Same as SpecStudio: MIT. SpecStudio™ is a trademark of Ken Pugh; the licence
covers the code, not the name.
