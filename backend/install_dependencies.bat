@echo off
echo Instalando dependencias del backend...
echo.

echo Instalando dependencias de Python...
pip install -r requirements.txt

echo.
echo Verificando instalacion de Tesseract...
tesseract --version

echo.
echo Configuracion completada!
echo Para ejecutar el servidor, usa: python main.py
pause 