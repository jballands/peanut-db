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

You can modify `index.ts` with out own queries if you want and rerun it to get results.

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

_tl;dr, the TensorFlow [Universal Sentence Encoder](https://github.com/tensorflow/tfjs-models/tree/master/universal-sentence-encoder) encodes sentences to vectors using a pretrained model, and the [cosine of the angle between of two-vectors](https://en.wikipedia.org/wiki/Cosine_similarity) determines how similar two vectors are._

LLMs often use vectors for encoding data like words or sentences because they allow for predictable, semantically-rich way of representing the relationships between data. This is what allows LLMs to be particularly good at natural language processing, for example.

From math class, we're used to vectors being 2D vectors or 3D vectors, representing something like motion in a space. There are other kinds of vectors too: `[7, 10, -2, 6, 5]` is a 5D vector, for example.

When you tell Peanut to "store" a value, what you're really telling it is:

1. Take this sentence and encode it to a vector using _some algorithm_.
2. Store the vector along with the sentence.

When you tell Peanut to "recall" a value, what you're really asking it is:

1. Take this query and encode it to a vector using _some algorithm_.
2. Given all the stored vectors, which one is the most _similar_ to this one?
3. Recall the sentence associated with the most similar vector.

In this case, _some algorithm_ is the TensorFlow [Universal Sentence Encoder](https://github.com/tensorflow/tfjs-models/tree/master/universal-sentence-encoder), which is a model that can transform sentences into vectors suitable for a broad range of natural language processing. **This is the main module driving Peanut.**

To find _similar_ vectors, we need to find the [cosine of the angle between of two-vectors](https://en.wikipedia.org/wiki/Cosine_similarity). **This is helpful because vectors that have a similar orientation encode similar sentences.** In this case, 1 represents a similar orientation, 0 represents orthagonal vectors (no similarity), and -1 represents that the orientation is in the opposite direction.
