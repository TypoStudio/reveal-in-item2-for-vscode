# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A VS Code extension that reveals folders in iTerm2 from the VS Code explorer or editor. macOS only.

## Build Commands

```bash
npm run compile    # Compile TypeScript to out/
npm run watch      # Watch mode for development
```

To package as a VSIX for distribution:
```bash
npx vsce package
```

## Architecture

Single-file extension (`src/extension.ts`) providing three commands:
- `reveal-in-iterm2.openFolder` - Opens folder from explorer context menu
- `reveal-in-iterm2.openCurrentFileFolder` - Opens current file's parent folder
- `reveal-in-iterm2.openWorkspaceRoot` - Opens workspace root folder

All commands use `open -a iTerm` to launch iTerm2 with the target directory.

Menu contributions are defined in `package.json` under `contributes.menus`.
