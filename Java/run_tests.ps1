# Run the Java tests from the command line.
#
# Written for demos -- day to day you would run these from your IDE. Every
# language folder in this repo has a run_tests.ps1 with the same contract:
# no arguments, prints the runner's own output, exits 0 only if all tests pass.
#
#   .\run_tests.ps1
#
# ..\..\run_all_tests.ps1 runs all nine and prints a summary.

$ErrorActionPreference = 'Stop'
Set-Location (Join-Path $PSScriptRoot 'SpectableJavaExamplesTest')

function Need($name, $fallback, $hint) {
    # Prefer the .cmd shim. Windows PowerShell 5.1 resolves a bare 'npm' to
    # npm.ps1, which then mis-forwards its arguments -- 'npm test' arrives as
    # the command "npm" and npm rejects it. npm.cmd passes them through.
    if (Get-Command "$name.cmd" -ErrorAction SilentlyContinue) { return "$name.cmd" }
    if (Get-Command $name -ErrorAction SilentlyContinue) { return $name }
    if ($fallback -and (Test-Path $fallback)) { return $fallback }
    Write-Host "Java: $name not found. $hint" -ForegroundColor Yellow
    exit 127
}

$mvn = Need 'mvn' 'C:\Program Files\Apache\bin\mvn.cmd' 'Install Maven, or add it to PATH.'

# Maven itself runs on an older JDK here, but the pom targets 17. Point
# JAVA_HOME at a new enough JDK for this invocation only.
$jdk = Get-ChildItem 'C:\Program Files\Java' -Directory -Filter 'jdk-*' -ErrorAction SilentlyContinue |
       Sort-Object Name -Descending | Select-Object -First 1
if ($jdk) { $env:JAVA_HOME = $jdk.FullName }

# clean, not just test: Maven skips recompiling when nothing is newer than
# target/, so after generated sources are deleted -- which a project or solution
# build in SpecStudio now does on purpose -- surefire would happily run stale
# .class files and report green.
& $mvn -B clean test
exit $LASTEXITCODE
