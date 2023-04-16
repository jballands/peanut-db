# peanut-db

This is a simple Node.js application that demonstrates how vectors databases like [Chroma](https://github.com/chroma-core/chroma) and [Pinecone](https://www.pinecone.io/) work at an _extremely_ high-level.

Vector databases are really important to give large language models (LLMs) (like ChatGPT) "long-lived memory".

## Installation

Install the dependencies:

```sh
$ npm i
```

Then run the app:

```sh
$ npm start
```

You can

## So how's it work?

The idea is that you can give a vector database something to store (like a sentence, for example) and you can query for _similar_ things:

```ts
await store('Peanut is a lovely cat.');
await store('Peanut is a fat cat.');
await store('Pumpkin is a pretty cat.');
await store('Pumpkin is a naughty girl.');
await store("Poppy is my parent's dog.");
await store('My parents have 2 dogs: Poppy and Rudi.');
await store('Poppy is a good girl.');

console.log(await recall("Who's a good girl?"));
// Output: Poppy is a good girl.
console.log(await recall("What's pumpkin"));
// Output: Pumpkin is a naughty girl.
```

## Is this connecting to the internet?

No, it just uses [TensorFlow for Node]() and good ole vector algebra from freshman year of college.

## Is this an LLM?

lol no it's a vector "database". However, LLMs use vector database to act as "long-term memory".
