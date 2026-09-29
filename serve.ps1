# Minimal static file server for the MitsuCap reference site (no Node/Python needed).
# Usage:  double-click start-server.bat, then open http://localhost:3000/
param([int]$Port = 3000)
$Root = $PSScriptRoot
$types = @{ ".html"="text/html; charset=utf-8"; ".css"="text/css; charset=utf-8"; ".js"="application/javascript; charset=utf-8"; ".svg"="image/svg+xml"; ".png"="image/png"; ".jpg"="image/jpeg"; ".jpeg"="image/jpeg"; ".webp"="image/webp"; ".pdf"="application/pdf"; ".woff2"="font/woff2"; ".md"="text/plain; charset=utf-8" }
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
try { $listener.Start() } catch { Write-Host "Could not start on port $Port (already in use?). Try: serve.ps1 -Port 3001" -ForegroundColor Red; exit 1 }
Write-Host "MitsuCap site running at http://localhost:$Port/  (close this window or press Ctrl+C to stop)" -ForegroundColor Green
$rootFull = [IO.Path]::GetFullPath($Root)
while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  $path = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath).TrimStart('/')
  if ($path -eq "" -or $path.EndsWith("/")) { $path += "index.html" }
  $full = [IO.Path]::GetFullPath((Join-Path $Root $path))
  if ($full.StartsWith($rootFull) -and (Test-Path $full -PathType Leaf)) {
    $bytes = [IO.File]::ReadAllBytes($full)
    $ext = [IO.Path]::GetExtension($full).ToLower()
    $ctx.Response.ContentType = if ($types.ContainsKey($ext)) { $types[$ext] } else { "application/octet-stream" }
    $ctx.Response.ContentLength64 = $bytes.Length
    $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
  } else {
    $ctx.Response.StatusCode = 404
  }
  $ctx.Response.Close()
}
