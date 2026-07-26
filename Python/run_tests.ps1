# Run the Python tests from the command line.
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
    Write-Host "Python: $name not found. $hint" -ForegroundColor Yellow
    exit 127
}

$py = Need 'python' $null 'Install Python 3 and put it on PATH.'
& $py -m pytest -q
exit $LASTEXITCODE
