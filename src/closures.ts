import { output } from "./utils";

// Конструктор для счетчиков
const createIncr = () => {
  // Переменная i находится в лексической области видимости возвращаемой функции
  let i = -1;
  // Каждый вызов счетчика будет увеличивать значение на один
  // Прямого доступа к переменной i нет, она инкапсулирована в замыкании
  return () => {
    i += 1;
    return i;
  };
};

// Каждый счетчик имеет свой, независимую переменную i
const incr0 = createIncr();
const incr1 = createIncr();

// output(incr0());
// output(incr0());

// output(incr1());
// output(incr1());
// output(incr1());
