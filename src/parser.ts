import { correctlyTokenize } from "./lexer";

const person = {
	name: "John Doe",
	age: 43,
	langs: ["English", "Japanese"],
};

const raw = JSON.stringify(person);

const tokens = correctlyTokenize(raw);

console.log(tokens);

/*
[
  "{", "\"name\"", ":", "\"John Doe\"", ",", "\"age\"", ":", "43", ",", "\"langs\"", ":", "[", "\"English\"", ",", "\"Japanese\"",
  "]", "}"
]
*/

// Type definitions for JSON values
type JsonValue = string | JsonObject | JsonArray;
type JsonObject = { [key: string]: JsonValue };
type JsonArray = JsonValue[];

export function parse(tokens: string[]): any {
	// Shared cursor to track current position in token array
	let cursor = 0;

	// Parse any JSON value (object, array, or primitive)
	function parseValue(): JsonValue {
		const token = tokens[cursor];
		if (!token) {
			throw new Error("Failed to access token");
		}

		if (token === "{") {
			return parseObject();
		} else if (token === "[") {
			return parseArray();
		} else {
			// Primitive value (string/number/boolean)
			cursor += 1;
			const unquoted = token.replaceAll('"', "");

			// Try to parse as number
			if (!isNaN(Number(unquoted)) && unquoted !== "") {
				return Number(unquoted);
			}

			// Parse boolean values
			if (unquoted === "true") return true;
			if (unquoted === "false") return false;
			if (unquoted === "null") return null;

			// Return as string
			return unquoted;
		}
	}

	// Parse JSON object: { "key": value, ... }
	function parseObject(): JsonObject {
		const obj: JsonObject = {};
		cursor += 1; // Skip opening '{'

		while (cursor < tokens.length && tokens[cursor] !== "}") {
			// Parse key
			const key = tokens[cursor]?.replaceAll('"', "");
			if (!key) {
				throw new Error("Failed to get key");
			}
			cursor += 1;

			// Skip colon
			if (tokens[cursor] === ":") {
				cursor += 1;
			}

			// Parse value
			const value = parseValue();
			obj[key] = value;

			// Skip comma if present
			if (tokens[cursor] === ",") {
				cursor += 1;
			}
		}

		cursor += 1; // Skip closing '}'
		return obj;
	}

	// Parse JSON array: [ value, value, ... ]
	function parseArray(): JsonArray {
		const arr: JsonArray = [];
		cursor += 1; // Skip opening '['

		while (cursor < tokens.length && tokens[cursor] !== "]") {
			const value = parseValue();
			arr.push(value);

			// Skip comma if present
			if (tokens[cursor] === ",") {
				cursor += 1;
			}
		}

		cursor += 1; // Skip closing ']'
		return arr;
	}

	return parseValue();
}
console.log(parse(tokens));
