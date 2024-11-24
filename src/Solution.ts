import fs from "fs";
import StreetTax from "./StreetTax";

export default class Solution {
    distanceMap: Map<string, number> = new Map<string, number>([
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

    getOwnerHouses(inputTaxExemt: string): Map<string, string> {
        let ownerHouses: Map<string, string> = new Map<string, string>();

        for (const streetTax of this.#streetTaxes) {
            if (inputTaxExemt == streetTax.taxExemt) {
                ownerHouses.set(streetTax.streetName, streetTax.houseNumber);
            }
        }

        return ownerHouses;
    }

    ado(distance: string, basicArea: number): number {
        for (const [key, value] of this.distanceMap) {
            if (key == distance) {
                return value * basicArea;
            }
        }    

        return basicArea;
    }

    taxCalculatorString(distanceKey: string): string {
        let distanceTaxHousesCount: number = this.#streetTaxes.filter(x => distanceKey == x.distance).length;
        let distanceTaxSum: number = 0;
        for (const item of this.#streetTaxes) {
            if (distanceKey == item.distance) {
                distanceTaxSum += this.ado(distanceKey, item.basicArea);
            }
        }
        return `\n${distanceKey} sávba ${distanceTaxHousesCount} telek esik, az adó ${distanceTaxSum} Ft.`;
    }

    moreDistanceTaxedStreet(): string[] {
        let uniqueStreets: string[] = [];
        let HelperMap: Map<string, string> = new Map<string, string>();
        for (const item of this.#streetTaxes) {
            if (!HelperMap.has(item.streetName)) {
                HelperMap.set(item.streetName, item.distance);
            } else {
                if (HelperMap.get(item.streetName) != item.distance) {
                    uniqueStreets.push(item.streetName);
                }
            }
        }
        uniqueStreets = [...new Set(uniqueStreets)];
        return uniqueStreets;
    }

    fileWrite(filename: string): void {
        const fileString: string[] = [];

        let OwnerMap: Map<string, number> = new Map<string, number>();
        for (const item of this.#streetTaxes) {
            if (!OwnerMap.has(item.taxExemt)) {
                OwnerMap.set(item.taxExemt, this.ado(item.distance, item.basicArea))
            } else {
                let oldData: number = OwnerMap.get(item.taxExemt) as number;
                OwnerMap.set(item.taxExemt, this.ado(item.distance, item.basicArea) + oldData);
            }
        }

        for (const [key, value] of OwnerMap) {
            fileString.push(`${key} ${value}`);
        }

        fs.writeFileSync(filename, fileString.join(`\r\n`));
    }
}