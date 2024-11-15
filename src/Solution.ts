import fs from "fs";
import StreetTax from "./StreetTax";

export default class Solution {
    #distance: Map<string, number> = new Map<string, number>([
        ["A", 800],
        ["B", 600],
        ["C", 100],
    ]);

    get streetTaxesCount(): number {
        return this.#streetTaxes.length;
    }

    #streetTaxes: StreetTax[] = [];

    constructor(source: string) {
        const datas: string[] = fs.readFileSync(source).toString().trim().split("\n");
        for (const line of datas.splice(1)) {
            const actLine: string = line.trim();
            this.#streetTaxes.push(new StreetTax(actLine));
        }
    }
    
}