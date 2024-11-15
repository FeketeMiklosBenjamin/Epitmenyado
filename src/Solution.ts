import fs from "fs";
import StreetTax from "./StreetTax";

export default class Solution {
    #distance: Map<string, number> = new Map<string, number>([
        ["A", 800],
        ["B", 600],
        ["C", 100],
    ]);

    #streetTaxes: StreetTax[] = [];

    constructor(source: string) {
        fs.readFileSync(source)
            .toString()
            .split("\n")
            .forEach(line => {
                const actLine: string = line.trim();
                this.#streetTaxes.push(new StreetTax(actLine));
            });
        }
    
}