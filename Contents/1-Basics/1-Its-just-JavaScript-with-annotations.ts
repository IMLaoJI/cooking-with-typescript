/**
 * This is JavaScript. It's also TypeScript. TypeScript is a superset
 * of JavaScript. Fundamentally, TypeScript doesn't introduce anything
 * new to our JavaScript code at runtime.
 * 
 * Inspect the types of these variables. TypeScript is already at work.
 * Notice that TypeScript is smart enough to know that the value of `a`
 * will never change, whereas `ab` and `abc` are `string` because they
 * could be reassigned some other value.
 * 
 * This is called *type inference*.
 */

const a = 'a';
let ab = a + 'b';
var abc = ab + 'c';

/**
 * What makes TypeScript useful is saving us from type ambiguity at
 * compile time. When working on a prototype or a very small project,
 * such ambiguities are tolerable. As projects grow, so to do the call
 * stacks from which runtime type errors emanate.
 * 
 * This line is commented out because it won't compile. Can you see
 * why?
 */

// abc = 123;

/**
 * We can add annotations to variables, Sometimes they're redundant
 * because they're trivially inferred...
 */

const abcd: string = abc + 'd';

/**
 * ...but sometimes annotations are necessary because we may want to
 * assign a different type of value to it later.
 */

let id: number | null = null;
id = 5;

/**
 * Now why won't this compile?
 */

// const getNextId = () => id + 1;

/**
 * Annotations are especially useful in functions. What happens if we
 * try to return something other than a string?
 */

const stringifyNumber = (number: number): string =>
  String(number);

/**
 * These are TypeScript type *aliases*. The compiler erases them from
 * the build output. This is what the language's designers mean by a
 * *fully erasable* type system.
 */

type Name = string
type Id = number

/**
 * Bear in mind that TypeScript types are based on shape. It will treat
 * logically identical types with different types as if they were the
 * same. In this case, `Id` and `number` are the same thing.
 */

const getNextId = (currentId: Id): Id =>
  currentId + 1;

const four = getNextId(3);

/**
 * This is an *interface*. It describes an object or class. Interfaces
 * can be shared across modules with the `export` operator.
 */

export interface Person {
  name: Name
  id: Id
}

/**
 * Most interfaces can also be expressed as type aliases. The
 * language's designers describe the subtle differences here and how to
 * choose between them here:
 * 
 * https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces
 */

// export type Person = {
//   name: Name
//   id: Id
// }

/**
 * The type of a declaration can be enforced at compile time, but
 * again, the type annotations are removed from the compiled output.
 * If you want to enforce the types of data coming in from the wild,
 * that's up to you. This is why people often refer to TypeScript types
 * as being a kind of *contract*. The contract says, "I will work if
 * the data looks like this."
 */

const bob: Person = {
  name: 'Bob',
  id: 123
};

/**
 * The *enum* is the only TypeScript feature I've found that breaks
 * TypeScript's central design goal of being a strict superset of
 * JavaScript with a fully erasable type system. TypeScript compiles
 * enums into bizarre objects almost unrecognizable from their source
 * with no real benefit except perhaps to give developers coming from
 * non-JavaScript languages a false sense of familiarity.
 */ 

enum StoplightColor {
  Red,
  Yellow,
  Green
}

/**
 * When you compile this, you will see the non-idiomatic detritus enums
 * leave behind.
 */

const okToGo = (stoplightColor: StoplightColor): boolean =>
  stoplightColor !== StoplightColor.Red;

/**
 * They're not even particularly type-safe because they're basically
 * just hidden number constants. Enums are dirty, dirty things. I will
 * not bring them up again.
 */

const ninetyNinethLightOk = okToGo(99);
const negativeFivePointFifthLightOk = okToGo(-5.5);

/**
 * TypeScript can read the types of a module's export values if they're
 * either written in TypeScript or have a type declaration file.
 * 
 * Note that if you do not write a TypeScript file in a known module
 * format (i.e. with an `export`), it will assume all your top level
 * declarations are global.
 */

export {
  a,
  ab,
  abc,
  bob
};
