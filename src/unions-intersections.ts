import { output } from "./utils";

// Функция возвращает пересечение (intersection) двух своих аргументов
const combine = <T extends {}, P extends {}>(a: T, b: P): T & P => {
  return { ...a, ...b };
};

// Результат содержит все поля из переданных аргументов
const combined = combine({ name: "First" }, { amount: 123 });

// Параметр p - объединение (union) типов string и number
const padLeft_ = (s: string, p: string | number) => {
  if (typeof p === "string") {
    return `${p}${s}`;
  } else {
    let spaces = "";
    for (let i = 0; i < p; i++) {
      spaces += " ";
    }
    return `${spaces}${s}`;
  }
};

// Передаем строку
const padded1 = padLeft_("asd", "- ");
// Передаем число
const padded2 = padLeft_("asd", 5);
//  Другие типы передавать нельзя
// const res3 = padLeft_("asd", null);

// ==================================
// === Свойства объединений типов ===
// ==================================

// Тождество (Identity): A|A равно A
type id = number | number;

// Коммутативность (Commutativity): A|B равно B|A
type com1 = number | string;
type com2 = string | number;

// Ассоциативность (Associativity): (A|B)|C равно A|(B|C)
type assoc1 = (number | string) | boolean;
type assoc2 = number | (string | boolean);

// Subtype collapsing: A|B равно A если B является подтипом A
type sub1 = number | string;
type sub2 = number;
type subs = sub1 | sub2;

// ==================================

// Тип-произведение. Количество возможных значений = 2 * 3
type productType = {
  active: boolean;
  role: "ADMIN" | "MODERATOR" | "USER";
};

// Тип-сумма. Количество возможных значений = 2 + 3
type sumType = boolean | ("ADMIN" | "MODERATOR" | "USER");
