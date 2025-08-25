# Robust Unicode Quote Cleaner
# This script is 100% ASCII and builds target characters from their numeric codes
# to be completely immune to script-file encoding issues.

Write-Host "Starting Failsafe Quote Cleaner..." -ForegroundColor Green

# --- Characters by their unchangeable numeric codes ---
$rightSingleQuote = [char]8217 # This is ’
$leftSingleQuote  = [char]8216 # This is ‘
$rightDoubleQuote = [char]8221 # This is ”
$leftDoubleQuote  = [char]8220 # This is “

$processed = 0
$changesMade = 0
$mdFiles = Get-ChildItem -Path "." -Filter "*.md" -Recurse -Force

if ($mdFiles.Count -eq 0) {
    Write-Host "No Markdown files found." -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit
}

foreach ($file in $mdFiles) {
    Write-Host "Processing: $($file.FullName)" -ForegroundColor Cyan
    
    # --- Use a robust StreamReader to read the file ---
    # Most reliable way to handle unknown file encodings.
    $stream = New-Object System.IO.StreamReader($file.FullName, $true)
    $content = $stream.ReadToEnd()
    $stream.Close()
    $stream.Dispose()
    
    $originalContent = $content
    
    # --- Perform Replacements ---
    # Replacing the characters it built in memory. This is reliable.
    $content = $content -replace $rightSingleQuote, "'"
    $content = $content -replace $leftSingleQuote,  "'"
    $content = $content -replace $rightDoubleQuote, '"'
    $content = $content -replace $leftDoubleQuote,  '"'
    
    # --- Add back the less common variants for completeness ---
    $content = $content -replace "`u{201A}", "'" # ‚ SINGLE LOW-9 QUOTATION MARK
    $content = $content -replace "`u{201B}", "'" # ‛ SINGLE HIGH-REVERSED-9 QUOTATION MARK
    $content = $content -replace "`u{2039}", "'" # ‹ SINGLE LEFT-POINTING ANGLE QUOTATION MARK
    $content = $content -replace "`u{203A}", "'" # › SINGLE RIGHT-POINTING ANGLE QUOTATION MARK
    $content = $content -replace "`u{201E}", '"' # „ DOUBLE LOW-9 QUOTATION MARK
    $content = $content -replace "`u{201F}", '"' # ‟ DOUBLE HIGH-REVERSED-9 QUOTATION MARK
    $content = $content -replace "`u{00AB}", '"' # « LEFT-POINTING DOUBLE ANGLE QUOTATION MARK
    $content = $content -replace "`u{00BB}", '"' # » RIGHT-POINTING DOUBLE ANGLE QUOTATION MARK
    
    # --- Write file ONLY if changes were made ---
    if ($content -ne $originalContent) {
        Write-Host "  -> Found and replaced quotes. Saving changes." -ForegroundColor Yellow
        $changesMade++
        # Write back as standard UTF-8 without a BOM, which is best for web/markdown.
        $utf8EncodingNoBOM = New-Object System.Text.UTF8Encoding($false)
        [System.IO.File]::WriteAllText($file.FullName, $content, $utf8EncodingNoBOM)
    }
    
    $processed++
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Cleaning complete."
Write-Host "Files processed: $processed"
Write-Host "Files changed: $changesMade" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Read-Host "Press Enter to exit"
