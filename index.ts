import { store, recall } from './peanutdb.ts';

await store('Peanut is a lovely cat.');
await store('Peanut is a fat cat.');
await store('Pumpkin is a pretty cat.');
await store('Pumpkin is a naughty girl.');
await store("Poppy is my parent's dog.");
await store('My parents have 2 dogs: Poppy and Rudi.');
await store('Poppy is a good girl.');

console.log(await recall("Who's a good girl?"));
console.log(await recall("What's pumpkin"));
console.log(await recall('Is pumpkin a dog'));
