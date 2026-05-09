$dirs = @(
  "frontend/src/app/(auth)",
  "frontend/src/app/(dashboard)",
  "frontend/src/app/api",
  "frontend/src/features/document-processing/components",
  "frontend/src/features/document-processing/hooks",
  "frontend/src/features/document-processing/services",
  "frontend/src/features/document-processing/stores",
  "frontend/src/features/document-processing/types",
  "frontend/src/features/document-processing/utils",
  "frontend/src/features/auth/components",
  "frontend/src/features/auth/hooks",
  "frontend/src/features/auth/services",
  "frontend/src/features/auth/stores",
  "frontend/src/features/auth/types",
  "frontend/src/components/ui",
  "frontend/src/components/layout",
  "frontend/src/components/forms",
  "frontend/src/components/feedback",
  "frontend/src/hooks",
  "frontend/src/lib",
  "frontend/src/services",
  "frontend/src/stores",
  "frontend/src/types",
  "frontend/src/utils",
  "frontend/src/constants",
  "frontend/src/config",
  "frontend/src/styles",
  "frontend/public",
  "frontend/tests/unit",
  "frontend/tests/integration",
  "frontend/tests/e2e",
  "backend/src/main/java/com/luminex/domain/document/entity",
  "backend/src/main/java/com/luminex/domain/document/repository",
  "backend/src/main/java/com/luminex/domain/document/service",
  "backend/src/main/java/com/luminex/domain/document/event",
  "backend/src/main/java/com/luminex/domain/document/exception",
  "backend/src/main/java/com/luminex/domain/auth/entity",
  "backend/src/main/java/com/luminex/domain/auth/repository",
  "backend/src/main/java/com/luminex/domain/auth/service",
  "backend/src/main/java/com/luminex/application/document/command",
  "backend/src/main/java/com/luminex/application/document/query",
  "backend/src/main/java/com/luminex/application/document/dto",
  "backend/src/main/java/com/luminex/application/document/mapper",
  "backend/src/main/java/com/luminex/application/auth/command",
  "backend/src/main/java/com/luminex/application/auth/dto",
  "backend/src/main/java/com/luminex/application/auth/mapper",
  "backend/src/main/java/com/luminex/infrastructure/persistence",
  "backend/src/main/java/com/luminex/infrastructure/messaging",
  "backend/src/main/java/com/luminex/infrastructure/cache",
  "backend/src/main/java/com/luminex/infrastructure/email",
  "backend/src/main/java/com/luminex/infrastructure/storage",
  "backend/src/main/java/com/luminex/presentation/document/controller",
  "backend/src/main/java/com/luminex/presentation/document/request",
  "backend/src/main/java/com/luminex/presentation/document/response",
  "backend/src/main/java/com/luminex/presentation/auth/controller",
  "backend/src/main/java/com/luminex/presentation/auth/request",
  "backend/src/main/java/com/luminex/presentation/auth/response",
  "backend/src/main/java/com/luminex/shared/config",
  "backend/src/main/java/com/luminex/shared/security",
  "backend/src/main/java/com/luminex/shared/exception",
  "backend/src/main/java/com/luminex/shared/util",
  "backend/src/main/java/com/luminex/shared/constant",
  "shared/api-spec",
  "shared/types",
  "docker",
  "scripts",
  "docs/architecture",
  "docs/adr",
  ".github/workflows"
)

foreach ($dir in $dirs) {
    $targetPath = Join-Path "d:\Project\Luminex" $dir
    if (-not (Test-Path -Path $targetPath)) {
        Write-Host "Creating directory: $targetPath"
        New-Item -ItemType Directory -Force -Path $targetPath | Out-Null
    }
    
    # Create .gitkeep to ensure empty folders are tracked
    $gitkeepPath = Join-Path $targetPath ".gitkeep"
    if (-not (Test-Path -Path $gitkeepPath)) {
        Set-Content -Path $gitkeepPath -Value ""
    }
}

# Create index.ts files for barrel exports in features
$indexDirs = @(
    "frontend/src/features/document-processing",
    "frontend/src/features/auth",
    "frontend/src/features/document-processing/components",
    "frontend/src/features/document-processing/hooks",
    "frontend/src/features/document-processing/services",
    "frontend/src/features/auth/components",
    "frontend/src/features/auth/hooks",
    "frontend/src/features/auth/services",
    "frontend/src/features/auth/types"
)

foreach ($dir in $indexDirs) {
    $indexPath = Join-Path "d:\Project\Luminex" "$dir\index.ts"
    if (-not (Test-Path -Path $indexPath)) {
        Write-Host "Creating file: $indexPath"
        Set-Content -Path $indexPath -Value "// Public API for this module`r`n"
    }
}

Write-Host "Scaffolding completed successfully!"
