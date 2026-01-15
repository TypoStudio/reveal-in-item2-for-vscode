import * as vscode from 'vscode';
import * as path from 'path';
import { exec } from 'child_process';

export function activate(context: vscode.ExtensionContext) {
    // Command: Open selected folder in iTerm2 (from explorer context menu)
    const openFolderCommand = vscode.commands.registerCommand(
        'reveal-in-iterm2.openFolder',
        async (uri: vscode.Uri) => {
            if (uri) {
                await openInITerm2(uri.fsPath);
            }
        }
    );

    // Command: Open current file's folder in iTerm2
    const openCurrentFileFolderCommand = vscode.commands.registerCommand(
        'reveal-in-iterm2.openCurrentFileFolder',
        async (uri?: vscode.Uri) => {
            let folderPath: string | undefined;

            if (uri) {
                // Called from editor tab context menu
                folderPath = path.dirname(uri.fsPath);
            } else {
                // Called from command palette
                const activeEditor = vscode.window.activeTextEditor;
                if (activeEditor) {
                    folderPath = path.dirname(activeEditor.document.uri.fsPath);
                }
            }

            if (folderPath) {
                await openInITerm2(folderPath);
            } else {
                vscode.window.showWarningMessage('No file is currently open.');
            }
        }
    );

    // Command: Open workspace root in iTerm2
    const openWorkspaceRootCommand = vscode.commands.registerCommand(
        'reveal-in-iterm2.openWorkspaceRoot',
        async () => {
            const workspaceFolders = vscode.workspace.workspaceFolders;
            if (workspaceFolders && workspaceFolders.length > 0) {
                await openInITerm2(workspaceFolders[0].uri.fsPath);
            } else {
                vscode.window.showWarningMessage('No workspace folder is open.');
            }
        }
    );

    context.subscriptions.push(openFolderCommand, openCurrentFileFolderCommand, openWorkspaceRootCommand);
}

async function openInITerm2(folderPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
        exec(`open -a iTerm "${folderPath}"`, (error) => {
            if (error) {
                vscode.window.showErrorMessage(
                    `Failed to open iTerm2. Make sure iTerm2 is installed. Error: ${error.message}`
                );
                reject(error);
            } else {
                resolve();
            }
        });
    });
}

export function deactivate() {}
