@ECHO OFF

for /f %%f in ( 'dir /b' ) do (
    if not "%%~xf" == ".bat" (
        if exist %%f\* (
            rmdir /s /q %%f
        ) else (
            del %%f
        )
    )
)