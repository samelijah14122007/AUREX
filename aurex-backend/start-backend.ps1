$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot '.env.local.ps1')
& (Join-Path $PSScriptRoot 'mvnw.cmd') spring-boot:run '-Dmaven.test.skip=true'
