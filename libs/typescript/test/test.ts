let x: string = "string";
x = "Translated";
const tranship = document.querySelector('[data-testid="tranship"]');
tranship.innerHTML = x;

function tail<T extends any[]>(arr: readonly [any, ...T]) {
  const [_ignored, ...rest] = arr;
  return rest;
}
const myTuple = [1, 2, 3, 4] as const;
const myArray = ["Hello", "World"];

// type [2, 3, ...string[]]
const r1 = tail([...myTuple, ...myArray] as const);

const helloWorld = document.querySelector('[data-testid="hello-world"]');
helloWorld.innerHTML = r1.join();
