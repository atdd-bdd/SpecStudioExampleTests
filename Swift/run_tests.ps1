# Run the Swift tests from the command line.
#
# Written for demos -- day to day you would run these from your IDE. Every
# language folder in this repo has a run_tests.ps1 with the same contract:
# no arguments, prints the runner's own output, exits 0 only if all tests pass.
#
#   .\run_tests.ps1
#
# ..\..\run_all_tests.ps1 runs all nine and prints a summary.

$ErrorActionPreference = 'Stop'
Set-Location (Join-Path $PSScriptRoot 'ExampleTests')

function Need($name, $fallback, $hint) {
    # Prefer the .cmd shim. Windows PowerShell 5.1 resolves a bare 'npm' to
    # npm.ps1, which then mis-forwards its arguments -- 'npm test' arrives as
    # the command "npm" and npm rejects it. npm.cmd passes them through.
    if (Get-Command "$name.cmd" -ErrorAction SilentlyContinue) { return "$name.cmd" }
    if (Get-Command $name -ErrorAction SilentlyContinue) { return $name }
    if ($fallback -and (Test-Path $fallback)) { return $fallback }
    Write-Host "Swift: $name not found. $hint" -ForegroundColor Yellow
    exit 127
}

$swiftRoot = "$env:LOCALAPPDATA\Programs\Swift"

# swift.exe needs the runtime DLLs on PATH and SDKROOT pointing at the Windows
# SDK, or it starts up and then cannot find the standard library. Do this before
# looking for swift at all -- a stock install is not on PATH.
$toolchain = Get-ChildItem (Join-Path $swiftRoot 'Toolchains') -Directory -ErrorAction SilentlyContinue |
             Sort-Object Name -Descending | Select-Object -First 1
$runtime   = Get-ChildItem (Join-Path $swiftRoot 'Runtimes') -Directory -ErrorAction SilentlyContinue |
             Sort-Object Name -Descending | Select-Object -First 1
$platform  = Get-ChildItem (Join-Path $swiftRoot 'Platforms') -Directory -ErrorAction SilentlyContinue |
             Sort-Object Name -Descending | Select-Object -First 1
if ($runtime)  { $env:PATH = (Join-Path $runtime.FullName 'usr\bin') + ';' + $env:PATH }
if ($toolchain){ $env:PATH = (Join-Path $toolchain.FullName 'usr\bin') + ';' + $env:PATH }
if ($platform) {
    $sdk = Join-Path $platform.FullName 'Windows.platform\Developer\SDKs\Windows.sdk'
    if (Test-Path $sdk) { $env:SDKROOT = $sdk }
}

$swift = Need 'swift' $null 'Install the Swift toolchain (winget install Swift.Toolchain).'
& $swift test
exit $LASTEXITCODE
