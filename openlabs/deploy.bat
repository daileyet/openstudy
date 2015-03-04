::This is deploy script for copy all project to php apache directory
@echo off
::define global variable
set PROJECT_NAME=openlabs
set PROJECT_DIR=%CD%
set PHP_DRIVE=D:
set PHP_HTDOCS=D:\Program Files\XAMPP\htdocs\
set PHP_TARGET=%PHP_HTDOCS%%PROJECT_NAME%

if exist "%PHP_TARGET%" (goto :copy)
MKDIR "%PHP_TARGET%"
:copy
xcopy "%PROJECT_DIR%" "%PHP_TARGET%" /e /i /y /q

echo deploy success