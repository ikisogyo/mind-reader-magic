param(
  [Parameter(Mandatory = $true)]
  [ValidatePattern('^https://github\.com/[^/]+/[^/]+(?:\.git)?$')]
  [string]$RepositoryUrl
)
$ErrorActionPreference = 'Stop'
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  throw 'Git is not installed. Install Git for Windows, then reopen PowerShell.'
}
$required = @('.github/workflows/android-build.yml', 'app/build.gradle', 'settings.gradle', 'build.gradle')
foreach ($file in $required) {
  if (-not (Test-Path $file -PathType Leaf)) { throw "Run this script from the extracted project root. Missing: $file" }
}
function Invoke-GitChecked {
  param([Parameter(Mandatory = $true)][string[]]$GitArgs)
  $output = & git @GitArgs 2>&1
  $code = $LASTEXITCODE
  if ($code -ne 0) {
    $detail = ($output | Out-String).Trim()
    throw "Git command failed (exit $code): git $($GitArgs -join ' ')`n$detail"
  }
  return $output
}
if (-not (Test-Path '.git')) { Invoke-GitChecked -GitArgs @('init') | Out-Null }
Invoke-GitChecked -GitArgs @('branch', '-M', 'main') | Out-Null
# A fresh Windows machine may not have Git author identity configured. Set a
# repository-local build identity only when either field is missing; do not alter
# the user's global Git configuration.
$gitName = & git config --local user.name 2>$null
$gitEmail = & git config --local user.email 2>$null
if (-not $gitName) { Invoke-GitChecked -GitArgs @('config', '--local', 'user.name', 'MindMagic Build') | Out-Null }
if (-not $gitEmail) { Invoke-GitChecked -GitArgs @('config', '--local', 'user.email', 'mindmagic-build@users.noreply.github.com') | Out-Null }
$remoteOutput = Invoke-GitChecked -GitArgs @('remote')
$hasOrigin = ($remoteOutput -join "`n") -match '(?m)^origin$'
if ($hasOrigin) {
  $origin = (Invoke-GitChecked -GitArgs @('remote', 'get-url', 'origin') | Out-String).Trim()
  if ($origin -and $origin -ne $RepositoryUrl) {
    throw "Existing origin points to $origin, not $RepositoryUrl. Fix it deliberately before continuing."
  }
} else {
  Invoke-GitChecked -GitArgs @('remote', 'add', 'origin', $RepositoryUrl) | Out-Null
}
Invoke-GitChecked -GitArgs @('add', '.') | Out-Null
$changes = & git status --porcelain
if ($LASTEXITCODE -ne 0) { throw 'Git status failed; stopping before commit.' }
if ($changes) { Invoke-GitChecked -GitArgs @('commit', '-m', 'MindMagic source update') | Out-Null }
# The checked push is equivalent to git push -u origin main and triggers CI.
Invoke-GitChecked -GitArgs @('push', '-u', 'origin', 'main') | Out-Null
Write-Host 'Source upload finished. The push to main automatically triggers the Android debug APK build.' -ForegroundColor Green
Write-Host 'Open Actions to monitor the build and download the mindmagic-debug-apk artifact after success.' -ForegroundColor Cyan
