# Errors

Command failures and integration errors.

---

## [ERR-20260420-003] flutter-path

**Logged**: 2026-04-20T22:52:56.5305132+07:00
**Priority**: low
**Status**: pending
**Area**: config

### Summary
`flutter` is not available on PATH in this shell session even though a working SDK exists locally.

### Error
```text
Get-Command : The term 'flutter' is not recognized as the name of a cmdlet, function, script file, or operable program.
```

### Context
- Command attempted: `Get-Command flutter`
- Workspace: `D:\CODEEEEE\16per\mobile_app`
- Working SDK later found at: `C:\Users\mrdee\tools\flutter\bin\flutter.bat`

### Suggested Fix
Add `C:\Users\mrdee\tools\flutter\bin` to PATH for this shell profile, or continue invoking Flutter via its absolute path on this machine.

### Metadata
- Reproducible: yes
- Related Files: D:\CODEEEEE\16per\mobile_app

---

## [ERR-20260419-001] rg.exe

**Logged**: 2026-04-19T00:00:00+07:00
**Priority**: medium
**Status**: pending
**Area**: docs

### Summary
`rg --files` is not executable in this Windows environment, so repo discovery must fall back to PowerShell file enumeration.

### Error
```text
Program 'rg.exe' failed to run: Access is denied
```

### Context
- Command attempted: `rg --files`
- Workspace: `D:\CODEEEEE\16per`
- Fallback used successfully: `Get-ChildItem -Recurse -File`

### Suggested Fix
Check why `rg.exe` is blocked in this shell profile, or keep a PowerShell fallback for file discovery on this machine.

### Metadata
- Reproducible: yes
- Related Files: D:\CODEEEEE\16per

---

## [ERR-20260419-002] git

**Logged**: 2026-04-19T00:00:00+07:00
**Priority**: medium
**Status**: pending
**Area**: docs

### Summary
`git` is not available on PATH in this session, so repository status checks could not be used during the audit.

### Error
```text
git : The term 'git' is not recognized as the name of a cmdlet, function, script file, or operable program.
```

### Context
- Command attempted: `git status --short`
- Workspace: `D:\CODEEEEE\16per`
- Audit proceeded with direct filesystem inspection instead

### Suggested Fix
Add Git to PATH for the Codex desktop shell environment or invoke Git via its absolute install path if present.

### Metadata
- Reproducible: yes
- Related Files: D:\CODEEEEE\16per

---
