param(
    [string]$Path = "src\lib\blog\posts\*.md",
    [switch]$IncludeFileName,
    [switch]$UniqueOnly,
    [switch]$ShowInvalid,
    [switch]$ValidateOnline,
    [string]$NodeScriptPath = "validate-links.js"
)

function Test-ValidUrl {
    param([string]$Url)
    
    if ([string]::IsNullOrWhiteSpace($Url)) { return $false }
    
    # Remove markdown syntax characters and common trailing characters
    $CleanUrl = $Url -replace '\]\([^)]*$', ''
    $CleanUrl = $CleanUrl.TrimEnd('.,;:!?)]}"''`').Trim()
    
    # Skip URLs with template variables or placeholders
    if ($CleanUrl -match '\$\{|yourdomain|example\.com|localhost|127\.0\.0\.1') {
        return $false
    }
    
    if ($CleanUrl -match '\{[^}]*\}|<[^>]*>') {
        return $false
    }
    
    # Skip obviously incomplete URLs
    if ($CleanUrl -match '^https?://$|^https?://\s*$') {
        return $false
    }
    
    if ($CleanUrl -match '^https?://`') {
        return $false
    }
    
    if ($CleanUrl -match '\.$|`$') {
        return $false
    }
    
    # Try to create URI object for validation
    try {
        $uri = [System.Uri]::new($CleanUrl)
        
        if (-not $uri.IsAbsoluteUri) { return $false }
        if ($uri.Scheme -notin @('http', 'https')) { return $false }
        if ([string]::IsNullOrWhiteSpace($uri.Host)) { return $false }
        if ($uri.Host -eq 'localhost' -or $uri.Host -eq '127.0.0.1') { return $false }
        
        if ($uri.Host -notmatch '\.[a-zA-Z]{2,}$' -and $uri.Host -notmatch '^[\d.]+$') {
            return $false
        }
        
        return $true
    }
    catch {
        return $false
    }
}

$mdFiles = Get-ChildItem -Path $Path -File

$patterns = @(
    # Standard markdown links [text](url)
    "\[([^\]]*)\]\(([^)\s]+)\)",
    # Reference-style links [ref]: url
    "^\s*\[([^\]]+)\]:\s*([^\s]+)",
    # Bare URLs - more restrictive, exclude markdown syntax
    "https?://[a-zA-Z0-9][a-zA-Z0-9\-._~:/?#@!$&'*+,;=%]*[a-zA-Z0-9/]",
    # HTML anchor tags
    "<a[^>]+href=[`"']([^`"'\s]+)[`"'][^>]*>",
    # Image links ![alt](url)
    "!\[([^\]]*)\]\(([^)\s]+)\)"
)

$allLinks = @()
$invalidLinks = @()

foreach ($file in $mdFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    
    foreach ($pattern in $patterns) {
        $matches = [regex]::Matches($content, $pattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase -bor [System.Text.RegularExpressions.RegexOptions]::Multiline)
        
        foreach ($match in $matches) {
            # Extract URL based on pattern type
            $url = ""
            if ($pattern -match "\([^)]+\)") {
                # Markdown link format - URL is in group 2
                $url = if ($match.Groups.Count -gt 2) { $match.Groups[2].Value } else { $match.Groups[1].Value }
            } elseif ($pattern -match "href=") {
                # HTML anchor tag - URL is in group 1
                $url = $match.Groups[1].Value
            } elseif ($pattern -match "^\s*\[") {
                # Reference link - URL is in group 2
                $url = $match.Groups[2].Value
            } else {
                # Bare URL - entire match is the URL
                $url = $match.Value
            }
            
            if ($url -match '^https?://') {
                $linkInfo = [PSCustomObject]@{
                    File = $file.Name
                    URL = $url.Trim()
                    FullMatch = $match.Value.Trim()
                }
                
                if (Test-ValidUrl $url) {
                    $allLinks += $linkInfo
                } else {
                    $invalidLinks += $linkInfo
                }
            }
        }
    }
}

# Output results
Write-Host "=== VALID EXTERNAL LINKS ===" -ForegroundColor Green
if ($UniqueOnly) {
    $results = $allLinks | Sort-Object URL -Unique
} else {
    $results = $allLinks | Sort-Object File, URL
}

if ($IncludeFileName) {
    $results | Format-Table File, URL -AutoSize
} else {
    $results | Select-Object -ExpandProperty URL | Sort-Object -Unique | ForEach-Object { Write-Output $_ }
}

# Show invalid links if requested
if ($ShowInvalid -and $invalidLinks.Count -gt 0) {
    Write-Host "`n=== INVALID/FILTERED LINKS ===" -ForegroundColor Yellow
    $invalidLinks | Select-Object -ExpandProperty URL | Sort-Object -Unique | ForEach-Object { 
        Write-Host $_ -ForegroundColor Red 
    }
}

# Summary
Write-Host "`nSummary:" -ForegroundColor Green
Write-Host "Files processed: $($mdFiles.Count)" -ForegroundColor Cyan
Write-Host "Total links found: $($allLinks.Count + $invalidLinks.Count)" -ForegroundColor Cyan
Write-Host "Valid external links: $($allLinks.Count)" -ForegroundColor Green
Write-Host "Invalid/filtered links: $($invalidLinks.Count)" -ForegroundColor Yellow
$uniqueValidCount = ($allLinks | Select-Object URL -Unique).Count
Write-Host "Unique valid links: $uniqueValidCount" -ForegroundColor Cyan

# Online validation if requested
if ($ValidateOnline -and $allLinks.Count -gt 0) {
    Write-Host "`n=== ONLINE VALIDATION ===" -ForegroundColor Magenta
    
    try {
        $nodeVersion = node --version 2>$null
        if (-not $nodeVersion) {
            Write-Host "Node.js not found. Please install Node.js to use online validation." -ForegroundColor Red
            return
        }
    } catch {
        Write-Host "Node.js not found. Please install Node.js to use online validation." -ForegroundColor Red
        return
    }
    
    if (-not (Test-Path $NodeScriptPath)) {
        Write-Host "Node.js validation script not found at: $NodeScriptPath" -ForegroundColor Red
        Write-Host "Please save the validate-links.js script in the same directory." -ForegroundColor Red
        return
    }
    
    $tempFile = [System.IO.Path]::GetTempFileName() + ".txt"
    $uniqueUrls = $allLinks | Select-Object -ExpandProperty URL | Sort-Object -Unique
    $uniqueUrls | Out-File -FilePath $tempFile -Encoding UTF8
    
    Write-Host "Starting online validation of $($uniqueUrls.Count) unique URLs..." -ForegroundColor Cyan
    Write-Host "This may take a while depending on the number of URLs..." -ForegroundColor Yellow
    
    try {
        $validationOutput = "link-validation-results.json"
        $nodeProcess = Start-Process -FilePath "node" -ArgumentList @($NodeScriptPath, $tempFile, $validationOutput) -NoNewWindow -Wait -PassThru -RedirectStandardOutput "validation-output.log" -RedirectStandardError "validation-error.log"
        
        if ($nodeProcess.ExitCode -eq 0 -and (Test-Path $validationOutput)) {
            $validationResults = Get-Content $validationOutput | ConvertFrom-Json
            
            Write-Host "`n=== ONLINE VALIDATION RESULTS ===" -ForegroundColor Magenta
            Write-Host "Total checked: $($validationResults.summary.total)" -ForegroundColor Cyan
            Write-Host "Online and valid: $($validationResults.summary.valid)" -ForegroundColor Green
            Write-Host "Offline or invalid: $($validationResults.summary.invalid)" -ForegroundColor Red
            Write-Host "Errors: $($validationResults.summary.errors)" -ForegroundColor Yellow
            
            # Show problematic links
            $problemLinks = $validationResults.results | Where-Object { -not $_.isValid }
            if ($problemLinks.Count -gt 0) {
                Write-Host "`n=== PROBLEMATIC LINKS ===" -ForegroundColor Red
                foreach ($link in $problemLinks) {
                    Write-Host "❌ $($link.url)" -ForegroundColor Red
                    if ($link.httpStatus) {
                        Write-Host "   HTTP $($link.httpStatus)" -ForegroundColor Yellow
                    }
                    if ($link.error) {
                        Write-Host "   Error: $($link.error)" -ForegroundColor Yellow
                    }
                    if ($link.hasErrorContent) {
                        Write-Host "   Page contains error content" -ForegroundColor Yellow
                    }
                }
            }
            
            Write-Host "`nDetailed results saved to: $validationOutput" -ForegroundColor Green
        } else {
            Write-Host "Online validation failed. Check validation-error.log for details." -ForegroundColor Red
            if (Test-Path "validation-error.log") {
                $errorContent = Get-Content "validation-error.log" -Raw
                if ($errorContent.Trim()) {
                    Write-Host "Error details:" -ForegroundColor Red
                    Write-Host $errorContent -ForegroundColor Yellow
                }
            }
        }
    } catch {
        Write-Host "Error running online validation: $($_.Exception.Message)" -ForegroundColor Red
    } finally {
        if (Test-Path $tempFile) {
            Remove-Item $tempFile -Force
        }
    }
}
