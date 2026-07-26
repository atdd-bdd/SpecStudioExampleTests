// swift-tools-version:5.9
import PackageDescription

// The generated glue, common and production files sit alongside the test files in
// this one folder, so they all belong to a single test target — a target's
// sources are compiled together, which is what lets the tests see the glue.
// The copied .spectable files are excluded so SwiftPM does not treat them as
// unhandled resources.
let package = Package(
    name: "ExampleTests",
    targets: [
        .testTarget(
            name: "ExampleTests",
            path: ".",
            exclude: [
                "Calculator.spectable",
                "RecordFilterExample.spectable",
                "Shopping Cart.spectable",
                "Types.spectable",
            ]
        )
    ]
)
