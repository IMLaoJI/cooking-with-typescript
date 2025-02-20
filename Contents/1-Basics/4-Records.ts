/**
 * Records are the workhorse of TypeScript. They can quickly define an
 * object type with two generic arguments: the type of the keys and the
 * type of the values. They're particularly useful when creating
 * objects that map one value to another, sometimes called
 * *dictionaries* in other languages.
 */

const numbersToNames: Record<number, string> = {
  0: 'zero',
  1: 'one',
  2: 'two'
  // ...
  // We really ought to be doing this dynamically, of course, but you
  // get the idea.
};

/**
 * Records can also enforce completeness for records whose keys are
 * unions.
 */

type State = 'OR' | 'WA' | 'CA'

/**
 * What happens if we remove one of these properties or add a state
 * that isn't in the `State` union type?
 */

const stateAnimals: Record<State, string> = {
  OR: 'Beaver',
  WA: 'Marmot',
  CA: 'Bear'
};

const oregonAnimal = stateAnimals.OR;

/**
 * If we don't want to enforce completeness, we can use `Partial`.
 */

const someStateAnimals: Partial<Record<State, string>> = {
  WA: 'Marmot'
};

/**
 * We still get the benefit of knowing what the valid keys for the
 * object are, but their values could be `undefined`.
 */

const maybeOregonAnimal = someStateAnimals.OR;

/**
 * The definition of `Record<K, V>` is not particularly complex. We
 * could invent it ourselves if it wasn't already baked into TypeScript
 * as a utility type.
 */

type ValidObjectKey = string | number | symbol

type ReinventedRecord<Key extends ValidObjectKey, Value> = {
  [key in Key]: Value
}
