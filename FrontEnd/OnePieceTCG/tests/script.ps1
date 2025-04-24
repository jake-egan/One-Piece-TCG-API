Set-Location -Path ".\tests"

$yamlFiles = Get-ChildItem -Filter "*.yaml" | Where-Object {
    $_.Name -match '^\d+\..+\.yaml$'
} | Sort-Object {
    [int]($_.Name -split '\.')[0]
}

# Run maestro test for each file
foreach ($file in $yamlFiles) {
    Write-Host "Running: maestro test $($file.Name)"
    maestro test $file.FullName
}
