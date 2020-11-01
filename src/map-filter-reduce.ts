import { output } from "./utils";
import json from "./meteorites.json";

// Простые исходные данные - массив строк
const strings = ["one", "two", "three"];

// Функция принимающая строку и возвращающая число
const stringLength = (s: string) => s.length;

// Преобразуем массив строк в массив чисел
const lengths = strings.map(stringLength);

// Преобразуем массив строк в другой массив строк
const something = strings.map((s) => `${s}-${s}`);

// Описание сырых данных по метеоритам
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

// Вытащим все названия метеоритов
const meteoriteNames = meteorites.map((m) => m.name);

// Type guard - функция уточняющая тип аргумента, подсказка для компилятора
const isString = (x: any): x is string => {
  return typeof x === "string";
};

// Масса всех метеоритов
const totalMass = meteorites
  .map((m) => m.mass) // вытащим поле mass
  .filter(isString) // отфильтруем undefined
  .map(Number) // преобразуем строки в числа
  .reduce((previous, current) => previous + current, 0); // сложим все числа вместе

// Количество метеоритов для которых неизвестна масса
const nulls = meteorites.map((m) => m.mass).filter((m) => !isString(m)).length;

// Сортированный список годов
const years = meteorites
  .map((m) => m.year) // достаем поле year
  .filter(isString) // отфильтруем undefined
  .map((s) => s.slice(0, 4)) // вырежем год из полной даты
  .map(Number) // строку в число
  .sort();

// Метеорит у которого известны все параметры
type StrictMeteorite = Required<Meteorite>;

// Type guard для типа StrictMeteorite
const isStrictMeteorite = (m: Meteorite): m is StrictMeteorite => {
  return (
    m.mass !== undefined &&
    m.year !== undefined &&
    m.reclat !== undefined &&
    m.reclong !== undefined &&
    m.geolocation !== undefined
  );
};

// Функция подсчитывающая сколько метеоритов упало в конкретный год
const meteoritesInYear = (year: number) =>
  meteorites
    .filter(isStrictMeteorite)
    .map((m) => ({ ...m, year: Number(m.year.slice(0, 4)) }))
    .filter((m) => m.year === year)
    .map((m) => m.name);

// Статистика падений по году
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

// Пишем свой map с помощью reduce
const mappedNumbers = numbers.reduce<number[]>((prev, curr) => {
  return [...prev, curr * 2];
}, []);

// Пишем свой filter с помощью reduce
const filteredNumbers = numbers.reduce<number[]>((prev, curr) => {
  if (curr % 2 === 0) {
    return [...prev, curr];
  } else {
    return [...prev];
  }
}, []);
