# Run the CPlusPlus tests from the command line.
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
    Write-Host "CPlusPlus: $name not found. $hint" -ForegroundColor Yellow
    exit 127
}

$cmake = Need 'cmake' 'C:\Qt\Tools\CMake_64\bin\cmake.exe' 'Install CMake.'

# GoogleTest is fetched by CMake on the first configure, so this needs network
# once and is then offline.
if (-not (Test-Path 'build\CMakeCache.txt')) {
    & $cmake -S . -B build
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}
& $cmake --build build --config Release
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

$exe = Join-Path $PWD 'build\Release\example_tests.exe'
if (-not (Test-Path $exe)) { $exe = Join-Path $PWD 'build\Debug\example_tests.exe' }
if (-not (Test-Path $exe)) {
    Write-Host "CPlusPlus: test binary not found under build\" -ForegroundColor Yellow
    exit 1
}
& $exe
exit $LASTEXITCODE
