export default class StreetTax {
    #taxExemt: string;
    #streetName: string;
    #houseNumber: string;
    #distance: string;
    #basicArea: number;

    constructor(data: string) {
        const m: string[] = data.split(" ");
        this.#taxExemt = m[0];
        this.#streetName = m[1];
        this.#houseNumber = m[2];
        this.#distance = m[3];
        this.#basicArea = parseInt(m[4]);
    }

}