# Load local runtime credentials when available; otherwise use the safe template.
# Usage: . .\start-local.ps1
$localEnvironment = Join-Path $PSScriptRoot ".env.local.ps1"
if (Test-Path $localEnvironment) {
    . $localEnvironment
} else {
    . .\.env.example
}
if ($env:DB_PASSWORD -eq "CHANGE_ME") {
    Write-Error "Set DB_PASSWORD in .env.example before starting AUREX."
    return
}
if ($env:JWT_SECRET -like "replace-with-*") {
    Write-Error "Set a long random JWT_SECRET in .env.example before starting AUREX."
    return
}
.\mvnw.cmd spring-boot:run
