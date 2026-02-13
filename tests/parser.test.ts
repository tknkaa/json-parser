import { expect, test } from "bun:test";
import { correctlyTokenize } from "../src/lexer";
import { parse } from "../src/parser";

test("string", () => {
	const house = {
		table: "big",
	};
	const raw = JSON.stringify(house);
	const tokens = correctlyTokenize(raw);
	const obj = parse(tokens);
	expect(obj).toEqual(house);
});

test("nested object", () => {
	const house = {
		table: {
			mine: "big",
		},
	};
	const raw = JSON.stringify(house);
	const tokens = correctlyTokenize(raw);
	const obj = parse(tokens);
	expect(obj).toEqual(house);
});
