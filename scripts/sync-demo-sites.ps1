<#
Rebuilds all four standalone demo sites in static-export mode and re-copies
their output into this project's public/ folder, so /aurelia,
/lumiere-dental, /nova-performance, and /vivelle-beauty stay in sync with
each demo's own source repo.

Run this whenever one of the demo projects is updated. It does not touch
North Frame's own homepage/components.

Usage (from anywhere):
  powershell -File scripts\sync-demo-sites.ps1
#>

$ErrorActionPreference = "Stop"

$env:Path = [System.Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [System.Environment]::GetEnvironmentVariable('Path','User')

$publicDir = Join-Path $PSScriptRoot "..\public"

$demos = @(
    @{ Name = "aurelia-restaurant";     Path = "C:\Users\alenp\aurelia-restaurant";     Slug = "aurelia" },
    @{ Name = "lumiere-dental-studio";  Path = "C:\Users\alenp\lumiere-dental-studio";  Slug = "lumiere-dental" },
    @{ Name = "nova-performance";       Path = "C:\Users\alenp\nova-performance";       Slug = "nova-performance" },
    @{ Name = "vivelle-beauty";         Path = "C:\Users\alenp\vivelle-beauty";         Slug = "vivelle-beauty" }
)

foreach ($demo in $demos) {
    Write-Host "==> Building $($demo.Name) (export mode) ..." -ForegroundColor Cyan
    Push-Location $demo.Path
    try {
        $env:BUILD_TARGET = "export"
        npm run build
        Remove-Item Env:\BUILD_TARGET
    } finally {
        Pop-Location
    }

    $dest = Join-Path $publicDir $demo.Slug
    Write-Host "==> Syncing output to $dest" -ForegroundColor Cyan
    Remove-Item -Recurse -Force $dest -ErrorAction SilentlyContinue
    Copy-Item -Recurse (Join-Path $demo.Path "out") $dest
}

Write-Host "All demo sites synced." -ForegroundColor Green
