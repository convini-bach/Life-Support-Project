# llm_task.ps1: NVIDIA NIM API Runner (Debug Mode)

# 1. Load .env.local
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$envFile = Join-Path $scriptDir ".env.local"
if (Test-Path $envFile) {
    Get-Content $envFile | ForEach-Object {
        if ($_ -match '^(?![#\s])(.+?)=(.*)$') {
            $key = $matches[1].Trim()
            $value = $matches[2].Trim()
            [System.Environment]::SetEnvironmentVariable($key, $value)
            # Write-Host "Loaded $key"
        }
    }
}

# 2. Configuration
$nvidiaKey = [System.Environment]::GetEnvironmentVariable("NVIDIA_API_KEY")
$backend = [System.Environment]::GetEnvironmentVariable("LLM_BACKEND") -or "nim"

# 3. Arguments
$rawArgs = [System.Environment]::GetEnvironmentVariable("LLM_ARGS")
if ([string]::IsNullOrWhiteSpace($rawArgs)) {
    Write-Host "[Usage] llm_task.bat `"prompt`""
    exit 1
}

$targetModel = "qwen/qwen2.5-coder-32b-instruct"
# Strip quotes and potential backslash escapes from CMD
$targetPrompt = $rawArgs.Trim().Trim('"').Trim('\').Trim()

# 4. API Setup
if ($backend -eq "nim") {
    $baseUrl = "https://integrate.api.nvidia.com/v1/chat/completions"
    $auth = "Bearer $nvidiaKey"
} else {
    $baseUrl = "http://127.0.0.1:11434/v1/chat/completions"
    $auth = "Bearer ollama"
}

# 5. Request Body
$bodyObj = @{
    model = $targetModel
    messages = @(@{ role = "user"; content = $targetPrompt })
    max_tokens = 4096
    stream = $false
}
$bodyJson = $bodyObj | ConvertTo-Json -Depth 10

$headers = @{
    "Content-Type" = "application/json"
    "Authorization" = $auth
}

# 6. Execute
try {
    $response = Invoke-RestMethod -Uri $baseUrl -Method Post -Headers $headers -Body ([System.Text.Encoding]::UTF8.GetBytes($bodyJson)) -TimeoutSec 120
    Write-Output $response.choices[0].message.content
} catch {
    Write-Error $_.Exception.Message
    exit 1
}
