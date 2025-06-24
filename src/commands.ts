import { decodeBase64, encodeBase64 } from './features/base64';
import { hashString } from './features/crypto';
import { minifyJson } from './features/minify';
import { getUuidV4 } from './features/uuid';
import * as vscode from 'vscode';

interface Command {
  command: string;
  type: 'modify-selected-text' | 'insert-at-cursor';
  handler: CommandHandler;
}

interface CommandHandler {
  (selection?: string): string;
}

export const commandHandlers: Command[] = [
  // Minify JSON
  {
    command: 'vscode-text-utils.minifyJsonSelection',
    type: 'modify-selected-text',
    handler: minifyJson,
  },
  // Base64 Encode/Decode
  {
    command: 'vscode-text-utils.encodeBase64Selection',
    type: 'modify-selected-text',
    handler: encodeBase64,
  },
  {
    command: 'vscode-text-utils.decodeBase64Selection',
    type: 'modify-selected-text',
    handler: decodeBase64,
  },
  // Hashing
  {
    command: 'vscode-text-utils.hashMd5Selection',
    type: 'modify-selected-text',
    handler: (selection?: string) => {
      return hashString(selection, 'md5');
    },
  },
  {
    command: 'vscode-text-utils.hashSha1Selection',
    type: 'modify-selected-text',
    handler: (selection?: string) => {
      return hashString(selection, 'sha1');
    },
  },
  {
    command: 'vscode-text-utils.hashSha256Selection',
    type: 'modify-selected-text',
    handler: (selection?: string) => {
      return hashString(selection, 'sha256');
    },
  },
  // GUID Generation
  {
    command: 'vscode-text-utils.generateUuidV4',
    type: 'insert-at-cursor',
    handler: getUuidV4,
  },
];

export async function handleCommandOnSelectedText(
  commandKey: string,
  handler: CommandHandler,
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

export async function handleCommandInsertAtCursor(
  commandKey: string,
  handler: CommandHandler,
) {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showErrorMessage('No active editor found.');
    return;
  }

  const selections = editor.selections;

  for (const selection of selections) {
    const selectedText = editor.document.getText(selection);

    try {
      const modifiedText = handler(selectedText);

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
