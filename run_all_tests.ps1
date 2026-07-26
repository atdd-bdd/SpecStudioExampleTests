# Run every language's tests and print a summary.
#
# For demos. Each language folder holds a run_tests.ps1 that does the real work;
# this walks all nine, records pass/fail, and exits non-zero if any failed.
#
#   .\run_all_tests.ps1                 # all nine
#   .\run_all_tests.ps1 -Language Rust  # just one
#   .\run_all_tests.ps1 -Quiet          # summary only
#
# A language whose toolchain is not installed reports "skipped (no toolchain)"
# and does not fail the run -- exit code 127 from run_tests.ps1 means the
# compiler is missing, which is not a test failure.

param(
    [string] $Language,
    [switch] $Quiet
)

$languages = @('Java','Python','CSharp','Go','Rust','Swift','JavaScript','TypeScript','CPlusPlus')
if ($Language) {
    if ($languages -notcontains $Language) {
        Write-Host "Unknown language '$Language'. Choose from: $($languages -join ', ')"
        exit 2
    }
    $languages = @($Language)
}

$results = @()
foreach ($lang in $languages) {
    $script = Join-Path $PSScriptRoot "$lang\run_tests.ps1"
    if (-not (Test-Path $script)) {
        $results += [pscustomobject]@{ Language = $lang; Result = 'no runner'; Tests = '' }
        continue
    }

    Write-Host ''
    Write-Host "===== $lang " -NoNewline -ForegroundColor Cyan
    Write-Host ('=' * (60 - $lang.Length)) -ForegroundColor Cyan

    $output = & powershell -NoProfile -ExecutionPolicy Bypass -File $script 2>&1
    $code = $LASTEXITCODE
    if (-not $Quiet) { $output | ForEach-Object { Write-Host $_ } }

    # Pull a test count out of whatever the runner printed, so the summary can
    # show it. Each framework words this differently.
    $text = $output -join "`n"
    $count = ''
    foreach ($pattern in @(
        'Tests run: (\d+), Failures',            # Maven / Surefire
        '(\d+) passed',                          # pytest, Jest
        'Passed:\s+(\d+)',                       # dotnet test / MSTest
        'test result: ok\. (\d+) passed',        # cargo
        'Executed (\d+) tests',                  # XCTest
        '\[  PASSED  \] (\d+) test'              # GoogleTest
    )) {
        $m = [regex]::Matches($text, $pattern)
        if ($m.Count -gt 0) {
            # A runner may print one line per suite or target as well as a grand
            # total (Surefire per class, XCTest per suite, cargo's empty doc-test
            # target). The largest number is the grand total in every case.
            $best = 0
            foreach ($hit in $m) {
                $n = [int]$hit.Groups[1].Value
                if ($n -gt $best) { $best = $n }
            }
            $count = $best
            break
        }
    }
    if (-not $count -and $lang -eq 'Go') {
        $count = ([regex]::Matches($text, '--- PASS')).Count
        if ($count -eq 0) { $count = '' }
    }

    if ($code -eq 0)         { $result = 'PASS' }
    elseif ($code -eq 127)   { $result = 'skipped (no toolchain)' }
    else                     { $result = "FAIL (exit $code)" }

    $results += [pscustomobject]@{ Language = $lang; Result = $result; Tests = $count }
}

Write-Host ''
Write-Host '===== Summary =====' -ForegroundColor Cyan
$results | Format-Table -AutoSize

$failed = @($results | Where-Object { $_.Result -like 'FAIL*' -or $_.Result -eq 'no runner' })
if ($failed.Count -gt 0) {
    Write-Host "$($failed.Count) of $($results.Count) failed." -ForegroundColor Red
    exit 1
}
Write-Host "All $($results.Count) passed." -ForegroundColor Green
exit 0
