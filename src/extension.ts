import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand('atom-string-converter.atomToString', () => {
            convertSelectedText(atomToString);
        }),
        vscode.commands.registerCommand('atom-string-converter.stringToAtom', () => {
            convertSelectedText(stringToAtom);
        })
    );
}

// function convertSelectedText(conversionFunction: (input: string) => string) {
//     const editor = vscode.window.activeTextEditor;
//     if (!editor) {
//         return;
//     }

//     const document = editor.document;
//     const selections = editor.selections;

//     editor.edit((editBuilder) => {
//         for (const selection of selections) {
//             const text = document.getText(selection);
//             const convertedText = conversionFunction(text);
//             editBuilder.replace(selection, convertedText);
//         }
//     });
// }
function convertSelectedText(conversionFunction: (input: string) => string) {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }

    const document = editor.document;
    const selections = editor.selections;

    editor.edit((editBuilder) => {
        for (const selection of selections) {
            let rangeToReplace: vscode.Range;
            if (selection.isEmpty) {
                // If no text is selected, find the word at the cursor position.
                const wordRange = document.getWordRangeAtPosition(selection.active);
                if (!wordRange) {
                    continue;
                }
                rangeToReplace = wordRange;
            } else {
                rangeToReplace = selection;
            }
            const text = document.getText(rangeToReplace);
            const convertedText = conversionFunction(text);
            editBuilder.replace(rangeToReplace, convertedText);
        }
    });
}

export function atomToString(input: string): string {
    return `"${input.replace(/^:/, '')}"`;
}


export function stringToAtom(input: string): string {
    if (input.startsWith(':')) {
        return input;
    }
    return ':' + input.replace(/^"|"$/g, '');
}



export function deactivate() {}
