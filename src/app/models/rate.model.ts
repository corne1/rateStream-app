export class Rate {
    constructor(
        public time: Date,
        public symbol: string,
        public bid: number,
        public ask: number
    ) { }
}