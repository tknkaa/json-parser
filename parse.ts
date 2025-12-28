import { correctlyTokenize } from "./token";

const house = {
  table: 2,
  piano: 1,
  kitchen: 1,
  chair: 10,
};

const raw = JSON.stringify(house);

const tokens = correctlyTokenize(raw);

console.log(tokens);

function findStarts(raw: string[]): number[] {
  let starts: number[] = [];
  for (let i = 0; i < raw.length; i++) {
    const char = raw[i];
    if (char === "{" || char === "[") {
      starts.push(i);
    }
  }
  return starts;
}

export function parse(raw: string[]): any {
  const starts = findStarts(raw);
  let ans: Record<string, any> = {};
  for (const start of starts) {
    if (raw[start] === "{") {
      let key = raw[start + 1];
      let value = raw[start + 3];
      if (!key || !value) {
        throw new Error("Failed to get key or value");
      }
      key = key.replaceAll('"', "")
      value = value.replaceAll('"', "")

      ans[key] = value;
    }
  }
  return ans;
}

console.log(parse(tokens));
