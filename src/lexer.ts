import jsTokens from "js-tokens";

const person = {
  name: "John Doe",
  age: 43,
  langs: ["English", "Japanese"]
}

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

  for (let cursor = 0; cursor < raw.length; cursor++) {
    const current = raw.charAt(cursor);
    switch (current) {
      case "{":
        tokens.push(current);
        break;
      case "}":
        tokens.push(buffer);
        buffer = current;
        break;
      case "[":
        tokens.push(current);
        break;
      case "]":
        tokens.push(buffer);
        buffer = current;
        break;
      case ":":
        tokens.push(buffer);
        tokens.push(current);
        buffer = "";
        break;
      case ",":
        tokens.push(buffer);
        tokens.push(current);
        buffer = "";
        break;
      default:
        buffer += current;
    }
  }
  const lastChar = raw.at(raw.length - 1);
  if (!lastChar) {
    throw new Error("Failed to get the last character");
  }
  tokens.push(lastChar);

  return tokens;
}

console.log(tokenize(raw));
/*
[
  "{", "\"name\"", ":", "\"John Doe\"", ",", "\"age\"", ":", "43", ",", "\"langs\"", ":", "[", "\"English\"", ",", "\"Japanese\"",
  "]", "}"
]
*/
