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

test("string with spaces", () => {
	const data = {
		message: "Hello World",
		greeting: "Good Morning",
	};
	const raw = JSON.stringify(data);
	expect(tokenize(raw)).toEqual(correctlyTokenize(raw));
});

test("empty object", () => {
	const data = {};
	const raw = JSON.stringify(data);
	expect(tokenize(raw)).toEqual(correctlyTokenize(raw));
});

test("empty array", () => {
	const data = {
		items: [],
	};
	const raw = JSON.stringify(data);
	expect(tokenize(raw)).toEqual(correctlyTokenize(raw));
});

test("boolean values", () => {
	const data = {
		active: true,
		disabled: false,
	};
	const raw = JSON.stringify(data);
	expect(tokenize(raw)).toEqual(correctlyTokenize(raw));
});

test("null value", () => {
	const data = {
		value: null,
	};
	const raw = JSON.stringify(data);
	expect(tokenize(raw)).toEqual(correctlyTokenize(raw));
});

test("decimal numbers", () => {
	const data = {
		price: 19.99,
		rating: 4.5,
		pi: 3.14159,
	};
	const raw = JSON.stringify(data);
	expect(tokenize(raw)).toEqual(correctlyTokenize(raw));
});

test("negative numbers", () => {
	const data = {
		temperature: -10,
		debt: -500.75,
	};
	const raw = JSON.stringify(data);
	const tokens = tokenize(raw);
	// Negative numbers should be tokenized as single tokens
	expect(tokens).toEqual([
		"{",
		'"temperature"',
		":",
		"-10",
		",",
		'"debt"',
		":",
		"-500.75",
		"}",
	]);
});

test("array of arrays", () => {
	const data = {
		matrix: [
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9],
		],
	};
	const raw = JSON.stringify(data);
	expect(tokenize(raw)).toEqual(correctlyTokenize(raw));
});

test("deeply nested structure", () => {
	const data = {
		level1: {
			level2: {
				level3: {
					level4: {
						value: "deep",
					},
				},
			},
		},
	};
	const raw = JSON.stringify(data);
	expect(tokenize(raw)).toEqual(correctlyTokenize(raw));
});

test("array of objects", () => {
	const data = {
		users: [
			{ name: "Alice", age: 30 },
			{ name: "Bob", age: 25 },
			{ name: "Charlie", age: 35 },
		],
	};
	const raw = JSON.stringify(data);
	expect(tokenize(raw)).toEqual(correctlyTokenize(raw));
});

test("mixed types in array", () => {
	const data = {
		mixed: [1, "two", true, null, { key: "value" }, [5, 6]],
	};
	const raw = JSON.stringify(data);
	expect(tokenize(raw)).toEqual(correctlyTokenize(raw));
});

test("special characters in strings", () => {
	const data = {
		message: "Hello, World!",
		path: "/usr/bin/test",
		email: "test@example.com",
	};
	const raw = JSON.stringify(data);
	expect(tokenize(raw)).toEqual(correctlyTokenize(raw));
});

test("unicode characters", () => {
	const data = {
		emoji: "😊🎉",
		japanese: "こんにちは",
		chinese: "你好",
	};
	const raw = JSON.stringify(data);
	expect(tokenize(raw)).toEqual(correctlyTokenize(raw));
});

test("multiple properties", () => {
	const data = {
		id: 123,
		name: "Product",
		price: 99.99,
		inStock: true,
		tags: ["new", "featured", "sale"],
		metadata: {
			created: "2024-01-01",
			updated: "2024-01-15",
		},
	};
	const raw = JSON.stringify(data);
	expect(tokenize(raw)).toEqual(correctlyTokenize(raw));
});

test("large numbers", () => {
	const data = {
		small: 0,
		large: 999999999,
		billion: 1000000000,
	};
	const raw = JSON.stringify(data);
	expect(tokenize(raw)).toEqual(correctlyTokenize(raw));
});

test("string with quotes inside", () => {
	const data = {
		quote: 'She said "Hello"',
	};
	const raw = JSON.stringify(data);
	expect(tokenize(raw)).toEqual(correctlyTokenize(raw));
});

test("empty strings", () => {
	const data = {
		empty: "",
		notEmpty: "value",
	};
	const raw = JSON.stringify(data);
	expect(tokenize(raw)).toEqual(correctlyTokenize(raw));
});
