import { Temperature } from "./Temprature";

export class Weather {
    constructor(
        public readonly date: Date,
        public readonly temperature: Temperature,
        public readonly isForecast: boolean,
        public readonly rainChances: number
    ) {}
}