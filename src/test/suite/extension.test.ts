import * as assert from "assert";
import * as vscode from "vscode";
import { atomToString, stringToAtom } from "../../extension";

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");
  test('atomToString: :this_is_an_atom -> "this_is_an_atom"', () => {
    const input = ":this_is_an_atom";
    const expected = '"this_is_an_atom"';
    const result = atomToString(input);
    assert.strictEqual(result, expected);
  });

  test('stringToAtom: "im_a_string" -> :im_a_string', () => {
    const input = '"im_a_string"';
    const expected = ":im_a_string";
    const result = stringToAtom(input);
    assert.strictEqual(result, expected);
  });

  test("atomToString: not_an_atom -> 'not_an_atom'", () => {
    const input = "not_an_atom";
    const expected = '"not_an_atom"';
    const result = atomToString(input);
    assert.strictEqual(result, expected);
  });

  test("stringToAtom: :already_an_atom -> :already_an_atom", () => {
    const input = ":already_an_atom";
    const expected = ":already_an_atom";
    const result = stringToAtom(input);
    assert.strictEqual(result, expected);
  });
});
