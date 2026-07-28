# One-command admin deploy: build locally, then upload only the build to the VPS.
# Run from the admin folder:  npm run deploy
$ErrorActionPreference = "Stop"

$IP   = "147.93.105.119"
$DEST = "/Aquabrim_cms/admin"          # where the built dashboard lives on the server

Write-Host "==> Building admin (production)..." -ForegroundColor Cyan
npm run build

Write-Host "==> Zipping build..." -ForegroundColor Cyan
Compress-Archive -Path dist\* -DestinationPath dist.zip -Force

Write-Host "==> Uploading to $IP ..." -ForegroundColor Cyan
ssh "root@$IP" "mkdir -p $DEST"
scp dist.zip "root@${IP}:$DEST/dist.zip"

Write-Host "==> Deploying on server (replace old build)..." -ForegroundColor Cyan
ssh "root@$IP" "cd $DEST && rm -rf assets index.html *.svg *.png *.ico && unzip -o dist.zip && rm -f dist.zip && echo '--- deployed files ---' && ls"

Remove-Item dist.zip -ErrorAction SilentlyContinue
Write-Host "==> Done. Admin build is live at $DEST on the server." -ForegroundColor Green
