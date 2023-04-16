import { Tensor2D, data } from '@tensorflow/tfjs-node';

import('@tensorflow/tfjs-node');
import { UniversalSentenceEncoder } from '@tensorflow-models/universal-sentence-encoder';
import { cosineSimilarity } from './utils.js';

const encoder = new UniversalSentenceEncoder();
await encoder.load();

// This list represents "the database".
const database = [];

async function store(sentence: string): Promise<void> {
	const tensor = await encoder.embed(sentence);
	const vector = tensor.arraySync()[0];
	database.push({ sentence, vector });
}

async function recall(query: string): Promise<string> {
	const queryTensor = await encoder.embed(query);
	const queryVector = queryTensor.arraySync()[0];

	const similarities = database.map((entry) =>
		cosineSimilarity(queryVector, entry.vector)
	);

	console.dir(similarities);

	const bestMatchIndex = similarities.indexOf(Math.max(...similarities));

	return database[bestMatchIndex].sentence;
}

await store('Peanut is a lovely cat.');
await store('Pumpkin is a bad cat.');
await store("Poppy is my parent's dog.");
await store('My parents only have dogs.');

console.log(await recall("Parent's pet?"));
