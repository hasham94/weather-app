export class Location {
    constructor(
        public readonly latitude: number,
        public readonly longitude: number
    ) {}

    static create(latitude: number, longitude: number) {
        return new Location(latitude, longitude)
    }
}