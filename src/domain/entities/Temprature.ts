export class Temperature {
    constructor(
        public readonly value: number,
        public readonly unit: 'celsius' | 'fahrenheit' = 'celsius'
    ) {}
}