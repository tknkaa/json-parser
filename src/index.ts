import { tokenize } from "./lexer";
import { parse } from "./parser";

const normalPerson = {
	name: "John Doe",
	age: 21,
	hobby: ["mahjong", "programming", "gymming"],
	languages: ["C", "TypeScript", "Python"],
};

const raw = JSON.stringify(normalPerson);

console.log(raw);

const tokens = tokenize(raw);
const obj = parse(tokens);

console.log(obj);
