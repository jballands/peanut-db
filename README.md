# peanut-db

A tiny, simple Node.js application that demonstrates how vector databases like [Chroma](https://github.com/chroma-core/chroma) and [Pinecone](https://www.pinecone.io/) work at an _extremely_ high and simplified level. In particular, it demonstrates:

- Using a sentence encoder to embed sentences to 512-dimensional vectors
- Storing the vector into an array data structure
- Recalling a sentence that's similar to ones stored in the array by finding the cosine of angle between two vectors

## Installation

Install the dependencies:

```sh
$ npm i
```

Then run the app:

```sh
$ npm start
```

You can modify `index.ts` with your own queries if you want and rerun it to get results.

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
console.log(await recall('Is pumpkin a dog'));
// Output: Pumpkin is a pretty cat.
```

_tl;dr, the TensorFlow [Universal Sentence Encoder](https://github.com/tensorflow/tfjs-models/tree/master/universal-sentence-encoder) encodes sentences to vectors using a pretrained model, and the [cosine of the angle between of two-vectors](https://en.wikipedia.org/wiki/Cosine_similarity) determines how similar two vectors are._

LLMs often use vectors for encoding things like words or sentences because they allow for a predictable, semantically-rich way of representing the relationships between data. This process of turning data to vectors is called _embedding_. This is what allows LLMs to be particularly good at natural language processing.

From math and physics class, we're used to vectors being 2D vectors or 3D vectors, representing something like motion in a space. There are other kinds of vectors too: `[7, 10, -2, 6, 5]` is a 5D vector, for example. To store a sentence, we need to encode it to a 512-dimensional vector. (I bet you never have thought of something as 512D before but here we are...)

When you tell this tiny vector database to "store" a value, what you're really telling it is:

1. Take this sentence and encode it to a vector using _some algorithm_.
2. Store the vector along with the sentence.

When you tell this tiny vector database to "recall" a value, what you're really asking it is:

1. Take this query and encode it to a vector using _some algorithm_.
2. Given all the stored vectors, which one is the most _similar_ to this one?
3. Recall the sentence associated with the most similar vector.

In this case, _some algorithm_ is the TensorFlow [Universal Sentence Encoder](https://github.com/tensorflow/tfjs-models/tree/master/universal-sentence-encoder), which is a model that can transform sentences into vectors suitable for a broad range of natural language processing. **This is the main module driving this tiny vector database.**

To find _similar_ vectors, we need to find the [cosine of the angle between of two-vectors](https://en.wikipedia.org/wiki/Cosine_similarity). **This is helpful because vectors that have a similar orientation encode similar sentences.** That is:

- The closer to 1 the cosine of the angle between the vectors is, the closer they are to "pointing" the same direction, and are therefore very similar.
- The closer to -1 the cosine of the angle between the vectors is, the closer they are to "pointing" opposite directions, indicating polar opposites.
- If the cosine between the vectors is close to 0, it means the vectors are orthagonal to each other, indicating no similarities.
