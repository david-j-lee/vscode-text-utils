import {
  commandHandlers,
  handleCommandInsertAtCursor,
  handleCommandOnSelectedText,
} from './commands';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  console.debug('Activating "vscode-text-utils" extension...');

  for (const command of commandHandlers) {
    const disposable = vscode.commands.registerCommand(command.command, () => {
      switch (command.type) {
        case 'modify-selected-text':
          handleCommandOnSelectedText(command.command, command.handler);
          break;
        case 'insert-at-cursor':
          handleCommandInsertAtCursor(command.command, command.handler);
          break;
        default:
          vscode.window.showErrorMessage(
            `Unknown command type: ${command.type}`,
          );
      }
    });

    context.subscriptions.push(disposable);

    console.debug(`Registered command: ${command.command}`);
  }

  console.debug('Activated "vscode-text-utils" extension.');
}

export function deactivate() {}
