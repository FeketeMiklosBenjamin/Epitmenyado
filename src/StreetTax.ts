export default class StreetTax {
    #taxExemt: string;
    #streetName: string;
    #houseNumber: string;
    #distance: string;
    #basicArea: number;

    get taxExemt(): string {
        return this.#taxExemt;
    }

    get streetName(): string {
        return this.#streetName;
    }
    
    get houseNumber(): string {
        return this.#houseNumber;
    }

    get distance(): string {
        return this.#distance;
    }

    get basicArea(): number {
        return this.#basicArea;
    }

    constructor(data: string) {
        const m: string[] = data.split(" ");
        this.#taxExemt = m[0];
        this.#streetName = m[1];
        this.#houseNumber = m[2];
        this.#distance = m[3];
        this.#basicArea = parseInt(m[4]);
    }

}