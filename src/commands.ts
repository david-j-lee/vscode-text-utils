import { base64 } from './features/base64';
import { hash } from './features/hash';
import { json } from './features/json';
import { uri } from './features/uri';
import { uuid } from './features/uuid';
import { CursorCommand } from './types/CursorCommand';
import { SelectionCommand } from './types/SelectionCommand';
import * as vscode from 'vscode';

const features = {
  base64,
  hash,
  json,
  uri,
  uuid,
};

const handlers = {
  selection: handleCommandOnSelection,
  cursor: handleCommandOnCursor,
};

export function registerCommands(context: vscode.ExtensionContext) {
  console.debug('Activating "vscode-text-utils" extension...');

  for (const [featureKey, feature] of typedEntries(features)) {
    console.debug(`Registering feature: ${featureKey}`);

    for (const [commandType, commands] of typedEntries(feature)) {
      console.debug(`Registering commands for type: ${commandType}`);

      if (commands === undefined) {
        continue;
      }

      for (const [commandName, commandHandler] of typedEntries(commands)) {
        var commandKey = `vscode-text-utils.${featureKey}.${commandType}.${commandName}`;

        const command = vscode.commands.registerCommand(
          commandKey,
          async () => {
            console.debug(`Executing command: ${commandKey}`);

            await handlers[commandType](
              commandKey as string,
              commandHandler as any,
            );
          },
        );

        context.subscriptions.push(command);

        console.debug(`Registered command: ${commandKey}`);
      }
    }
  }

  console.debug('Activated "vscode-text-utils" extension.');
}

function typedEntries<T>(obj: T): [keyof T, T[keyof T]][] {
  return Object.entries(obj as object) as [keyof T, T[keyof T]][];
}

async function handleCommandOnSelection(
  commandKey: string,
  handler: SelectionCommand,
) {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showErrorMessage('No active editor found.');
    return;
  }

  if (editor.selections.length === 0) {
    vscode.window.showErrorMessage('No text selected.');
    return;
  }

  const selections = editor.selections;

  for (const selection of selections) {
    const selectedText = editor.document.getText(selection);

    if (!selectedText) {
      continue;
    }

    try {
      const modifiedText = handler(selectedText);

      await editor.edit((editBuilder) => {
        editBuilder.replace(selection, modifiedText);
      });
    } catch (error: any) {
      vscode.window.showErrorMessage(
        'Failed to ' + commandKey + ': ' + error.message,
      );
      return;
    }
  }
}

async function handleCommandOnCursor(
  commandKey: string,
  handler: CursorCommand,
) {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showErrorMessage('No active editor found.');
    return;
  }

  const selections = editor.selections;

  for (const selection of selections) {
    try {
      const modifiedText = handler();

      await editor.edit((editBuilder) => {
        editBuilder.insert(selection.start, modifiedText);
      });
    } catch (error: any) {
      vscode.window.showErrorMessage(
        'Failed to ' + commandKey + ': ' + error.message,
      );
      return;
    }
  }
}
