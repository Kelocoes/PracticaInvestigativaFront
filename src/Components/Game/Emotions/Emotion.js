export const emotionsPool = [
    { name: "Neutral", emoji: "😐", probability: 0.05, score: 20},
    { name: "Felicidad", emoji: "😄", probability: 0.19, score: 50},
    { name: "Sorpresa", emoji: "😲", probability: 0.19, score: 100},
    { name: "Tristeza", emoji: "😢", probability: 0.25, score: 120},
    { name: "Furia", emoji: "😡", probability: 0.2, score: 150},
    { name: "Miedo", emoji: "😨", probability: 0.1, score: 200},
    { name: "Disgusto", emoji: "😒", probability: 0.01, score: 500},
    { name: "Desprecio", emoji: "😤", probability: 0.01, score: 500}
]

const getRandomEmotion = () => {
    const rand = Math.random();
    let cumulativeProbability = 0;

    for (const emotion of emotionsPool) {
        cumulativeProbability += emotion.probability;
        if (rand <= cumulativeProbability) {
            return emotion;
        }
    }
}

export const generateRandomCards = (setEmotions, randomCount) => {
    const randomEmotions = [];
    for (let i = 0; i < randomCount; i++) {
        const randomEmotion = getRandomEmotion();
        randomEmotions.push(randomEmotion);
    };
    setEmotions(randomEmotions)
    return randomEmotions
}