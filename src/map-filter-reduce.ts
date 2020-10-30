import { output } from "./utils";
import json from "./meteorites.json";

const strings = ["one", "two", "three"];

const stringLength = (s: string) => s.length;

const lengths = strings.map(stringLength);

const something = strings.map((s) => `${s}-${s}`);

type Meteorite = {
  name: string;
  id: string;
  nametype: string;
  recclass: string;
  mass?: string;
  fall: string;
  year?: string;
  reclat?: string;
  reclong?: string;
  geolocation?: {
    type: string;
    coordinates: number[];
  };
};

const meteorites: Meteorite[] = json;

const meteoriteNames = meteorites.map((m) => m.name);

const isString = (x: any): x is string => {
  return typeof x === "string";
};

// [1, 2, 3]
// 0 1 -> 1 2 -> 3 3 -> 6

const totalMass = meteorites
  .map((m) => m.mass)
  .filter(isString)
  .map(Number)
  .reduce((previous, current) => previous + current, 0);

const nulls = meteorites.map((m) => m.mass).filter((m) => !isString(m)).length;

const years = meteorites
  .map((m) => m.year)
  .filter(isString)
  .map((s) => s.slice(0, 4))
  .map(Number)
  .sort();

type StrictMeteorite = Required<Meteorite>;

const isStrictMeteorite = (m: Meteorite): m is StrictMeteorite => {
  return (
    m.mass !== undefined &&
    m.year !== undefined &&
    m.reclat !== undefined &&
    m.reclong !== undefined &&
    m.geolocation !== undefined
  );
};

// const a = [1, 2, 3];
// const b = [...a, 4, 5,]

// const a = { a: 1 };
// const b = { ...a, b: 1}

const meteoritesInYear = (year: number) =>
  meteorites
    .filter(isStrictMeteorite)
    .map((m) => ({ ...m, year: Number(m.year.slice(0, 4)) }))
    .filter((m) => m.year === year)
    .map((m) => m.name);

const statistics = meteorites
  .filter(isStrictMeteorite)
  .map((m) => ({ ...m, year: Number(m.year.slice(0, 4)) }))
  .map((m) => ({ name: m.name, year: m.year }))
  .reduce<{ [K: string]: string[] }>((previous, current) => {
    return {
      ...previous,
      [current.year]: [...(previous[current.year] ?? []), current.name],
    };
  }, {});

const numbers = [1, 2, 3, 4, 5];

const mappedNumbers = numbers.reduce<number[]>((prev, curr) => {
  return [...prev, curr * 2];
}, []);

const filteredNumbers = numbers.reduce<number[]>((prev, curr) => {
  if (curr % 2 === 0) {
    return [...prev, curr];
  } else {
    return [...prev];
  }
}, []);
