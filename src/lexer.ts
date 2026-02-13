import jsTokens from "js-tokens";

const person = {
	name: "John Doe",
	age: 43,
	langs: ["English", "Japanese"],
};

const raw = JSON.stringify(person);

export function correctlyTokenize(raw: string): string[] {
	const ans = [];
	for (const token of jsTokens(raw)) {
		ans.push(token.value);
	}
	return ans;
}

export function tokenize(raw: string): string[] {
	let buffer = "";
	let tokens: string[] = [];
	let inString = false;

	for (let cursor = 0; cursor < raw.length; cursor++) {
		const current = raw.charAt(cursor);

		// Handle quote character - toggle string mode
		if (current === '"') {
			buffer += current;
			inString = !inString;
			continue;
		}

		// If we're inside a string, add everything to buffer
		if (inString) {
			buffer += current;
			continue;
		}

		// Outside of strings, process tokens normally
		switch (current) {
			case "{":
			case "[":
				tokens.push(current);
				break;
			case "}":
			case "]":
			case ":":
			case ",":
				if (buffer.length > 0) {
					tokens.push(buffer);
					buffer = "";
				}
				tokens.push(current);
				break;
			case "\n":
			case " ":
				if (buffer.length == 0) {
					continue;
				}
				buffer += current;
				break;
			default:
				buffer += current;
		}
	}
	if (buffer.length > 0) {
		tokens.push(buffer);
	}

	return tokens;
}

console.log(tokenize(raw));
/*
[
  "{", "\"name\"", ":", "\"John Doe\"", ",", "\"age\"", ":", "43", ",", "\"langs\"", ":", "[", "\"English\"", ",", "\"Japanese\"",
  "]", "}"
]
*/
