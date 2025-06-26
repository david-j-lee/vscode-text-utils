import { registerCommands } from './commands';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  registerCommands(context);
}

export function deactivate() {}
