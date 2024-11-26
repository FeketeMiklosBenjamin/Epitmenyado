import Solution from "../Solution";

describe("Solution osztály tesztek", () => {
    const instance = new Solution("utca.txt");
    
    it("2. feladat ellenőrzése", () => {
        expect(instance.streetTaxesCount).toBe(543);
    });
    it("3. feladat ellenőrzése", () => {
        expect(instance.getOwnerHouses("68396").has("Harmat")).toBe(true);
        expect(instance.getOwnerHouses("68396").has("Szepesi")).toBe(true);
    });
})