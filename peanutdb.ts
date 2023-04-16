import { Tensor2D, data } from '@tensorflow/tfjs-node';

import('@tensorflow/tfjs-node');
import { UniversalSentenceEncoder } from '@tensorflow-models/universal-sentence-encoder';
import { cosineSimilarity } from './utils.ts';

const encoder = new UniversalSentenceEncoder();
await encoder.load();

// This list represents "the database".
const database = [];

export async function store(sentence: string): Promise<void> {
	const tensor = await encoder.embed(sentence);
	const vector = tensor.arraySync()[0];
	database.push({ sentence, vector });
}

export async function recall(query: string): Promise<string> {
	const queryTensor = await encoder.embed(query);
	const queryVector = queryTensor.arraySync()[0];

	const similarities = database.map((entry) =>
		cosineSimilarity(queryVector, entry.vector)
	);

	const bestMatchIndex = similarities.indexOf(Math.max(...similarities));

	return database[bestMatchIndex].sentence;
}
