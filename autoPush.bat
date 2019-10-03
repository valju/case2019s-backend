echo off
echo "Automatic push to remote master, with hard-coded commit message"
git add -A
git commit -m "Auto push while e.g. editing Dia file. Do not do this at home."
git push
echo "Auto push done(?)"
echo on
pause