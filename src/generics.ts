import { output } from "./utils";

const strings: string[] = ["one", "two", "three"];
const numbers: number[] = [1, 2, 3];

const firstElementV1 = (array: any) => array[0];
const s1 = firstElementV1(strings); // returns any
const n1 = firstElementV1(numbers); // returns any

const firstElementV2 = (array: string[]) => array[0];
const s2 = firstElementV2(strings); // returns string
// const n2 = firstElementV2(numbers); // Type 'number' is not assignable to type 'string'

const firstElementV3 = <T>(array: T[]) => array[0];
const s3 = firstElementV3(strings); // returns string
const n3 = firstElementV3(numbers); // returns number

const mixedData = [1, "some string", false];

const m = firstElementV3(mixedData); // returns string | number | boolean

type WithLength = {
  length: number;
};

const getLength = <T extends WithLength>(arg: T): number => {
  return arg.length;
};

getLength("string");
// getLength(123)

// Extra parameters don't matter because we've used 'extends'
getLength({ name: "string", length: 10 });
