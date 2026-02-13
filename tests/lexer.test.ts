import { expect, test } from "bun:test";
import { tokenize, correctlyTokenize } from "../src/lexer";

test("numbers", () => {
	const house = {
		chair: 2,
		people: 10,
	};
	const raw = JSON.stringify(house);
	expect(tokenize(raw)).toEqual(correctlyTokenize(raw));
});

test("number and string", () => {
	const house = {
		chair: 2,
		people: "me",
	};
	const raw = JSON.stringify(house);
	expect(tokenize(raw)).toEqual(correctlyTokenize(raw));
});

test("array", () => {
	const house = {
		chair: 2,
		people: ["me", "ghost"],
	};
	const raw = JSON.stringify(house);
	expect(tokenize(raw)).toEqual(correctlyTokenize(raw));
});

test("nested object", () => {
	const house = {
		chair: 2,
		people: {
			me: 1,
		},
	};
	const raw = JSON.stringify(house);
	expect(tokenize(raw)).toEqual(correctlyTokenize(raw));
});
