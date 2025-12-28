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

type JsonValue = string | JsonObject | JsonArray;
type JsonObject = { [key: string]: JsonValue };
type JsonArray = JsonValue[];

export function parse(tokens: string[]): any {
  // 現在の読み込み位置を管理するオブジェクト
  const cursor = { i: 0 };

  // メインの解析関数
  function parseValue(): JsonValue {
    const token = tokens[cursor.i];
    if (!token) {
      throw new Error("Failed to access token");
    }

    if (token === "{") {
      return parseObject();
    } else if (token === "[") {
      return parseArray();
    } else {
      // 文字列や数値などのリテラル（引用符の除去）
      cursor.i++;
      return token.replaceAll('"', "");
    }
  }

  // オブジェクト { ... } の解析
  function parseObject(): JsonObject {
    const obj: JsonObject = {};
    cursor.i++; // "{" をスキップ

    while (cursor.i < tokens.length && tokens[cursor.i] !== "}") {
      // 1. キーを取得
      const key = tokens[cursor.i]?.replaceAll('"', "");
      if (!key) {
        throw new Error("Failed to get key")
      }
      cursor.i++;

      // 2. ":" をスキップ
      if (tokens[cursor.i] === ":") {
        cursor.i++;
      }

      // 3. 値を取得（再帰）
      const value = parseValue();
      obj[key] = value;

      // 4. "," があればスキップ（JSON標準対応用、不要なら削除可）
      if (tokens[cursor.i] === ",") {
        cursor.i++;
      }
    }

    cursor.i++; // "}" をスキップ
    return obj;
  }

  // 配列 [ ... ] の解析
  function parseArray(): JsonArray {
    const arr: JsonArray = [];
    cursor.i++; // "[" をスキップ

    while (cursor.i < tokens.length && tokens[cursor.i] !== "]") {
      // 値を取得（再帰）
      const value = parseValue();
      arr.push(value);

      // "," があればスキップ
      if (tokens[cursor.i] === ",") {
        cursor.i++;
      }
    }

    cursor.i++; // "]" をスキップ
    return arr;
  }

  return parseValue();
}
console.log(parse(tokens));
