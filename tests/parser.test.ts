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

test("number", () => {
	const data = {
		count: 42,
		price: 19.99,
	};
	const raw = JSON.stringify(data);
	const tokens = correctlyTokenize(raw);
	const obj = parse(tokens);
	expect(obj).toEqual(data);
});

test("array of strings", () => {
	const data = {
		colors: ["red", "green", "blue"],
	};
	const raw = JSON.stringify(data);
	const tokens = correctlyTokenize(raw);
	const obj = parse(tokens);
	expect(obj).toEqual(data);
});

test("array of numbers", () => {
	const data = {
		numbers: [1, 2, 3, 4, 5],
	};
	const raw = JSON.stringify(data);
	const tokens = correctlyTokenize(raw);
	const obj = parse(tokens);
	expect(obj).toEqual(data);
});

test("mixed array", () => {
	const data = {
		items: ["apple", 5, "banana", 10],
	};
	const raw = JSON.stringify(data);
	const tokens = correctlyTokenize(raw);
	const obj = parse(tokens);
	expect(obj).toEqual(data);
});

test("empty object", () => {
	const data = {
		empty: {},
	};
	const raw = JSON.stringify(data);
	const tokens = correctlyTokenize(raw);
	const obj = parse(tokens);
	expect(obj).toEqual(data);
});

test("empty array", () => {
	const data = {
		list: [],
	};
	const raw = JSON.stringify(data);
	const tokens = correctlyTokenize(raw);
	const obj = parse(tokens);
	expect(obj).toEqual(data);
});

test("deeply nested object", () => {
	const data = {
		level1: {
			level2: {
				level3: {
					value: "deep",
				},
			},
		},
	};
	const raw = JSON.stringify(data);
	const tokens = correctlyTokenize(raw);
	const obj = parse(tokens);
	expect(obj).toEqual(data);
});

test("array of objects", () => {
	const data = {
		users: [
			{ name: "Alice", age: 30 },
			{ name: "Bob", age: 25 },
		],
	};
	const raw = JSON.stringify(data);
	const tokens = correctlyTokenize(raw);
	const obj = parse(tokens);
	expect(obj).toEqual(data);
});

test("object with nested arrays", () => {
	const data = {
		matrix: [
			[1, 2],
			[3, 4],
			[5, 6],
		],
	};
	const raw = JSON.stringify(data);
	const tokens = correctlyTokenize(raw);
	const obj = parse(tokens);
	expect(obj).toEqual(data);
});

test("complex nested structure", () => {
	const data = {
		name: "Project",
		version: 1.5,
		tags: ["new", "featured"],
		config: {
			enabled: true,
			settings: {
				theme: "dark",
				notifications: ["email", "push"],
			},
		},
	};
	const raw = JSON.stringify(data);
	const tokens = correctlyTokenize(raw);
	const obj = parse(tokens);
	expect(obj).toEqual(data);
});

test("string with spaces", () => {
	const data = {
		message: "Hello World",
		greeting: "Good Morning Everyone",
	};
	const raw = JSON.stringify(data);
	const tokens = correctlyTokenize(raw);
	const obj = parse(tokens);
	expect(obj).toEqual(data);
});

test("multiple properties", () => {
	const data = {
		id: 123,
		name: "Test Item",
		active: true,
		tags: ["test", "sample"],
		metadata: {
			created: "2024-01-01",
			updated: "2024-01-02",
		},
	};
	const raw = JSON.stringify(data);
	const tokens = correctlyTokenize(raw);
	const obj = parse(tokens);
	expect(obj).toEqual(data);
});
