function dotProduct(vectorA: number[], vectorB: number[]): number {
	return vectorA.reduce((sum, value, i) => {
		return sum + value * vectorB[i];
	}, 0);
}

function magnitude(vector: number[]): number {
	const allSquared = vector.reduce((sum, value) => {
		return sum + Math.pow(value, 2);
	}, 0);
	return Math.sqrt(allSquared);
}

export function cosineSimilarity(vectorA: number[], vectorB: number[]): number {
	return (
		dotProduct(vectorA, vectorB) / (magnitude(vectorA) * magnitude(vectorB))
	);
}
