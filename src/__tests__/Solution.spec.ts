import Solution from "../Solution";

describe("Solution osztály tesztek", () => {
    const instance = new Solution("utca.txt");
    
    it("2. feladat ellenőrzése", async () => {
        expect(instance.streetTaxesCount).toBe(543);
    });
})