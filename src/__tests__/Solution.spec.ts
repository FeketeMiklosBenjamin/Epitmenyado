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
    it("5. feladat ellenőrzése", () => {
        expect(instance.taxCalculatorString("A").trim()).toBe("A sávba 165 telek esik, az adó 20805600 Ft.");
        expect(instance.taxCalculatorString("B").trim()).toBe("B sávba 144 telek esik, az adó 13107000 Ft.");
        expect(instance.taxCalculatorString("C").trim()).toBe("C sávba 234 telek esik, az adó 3479600 Ft.");
    });
    it("6. feladat ellenőrzése", () => {
        expect(instance.moreDistanceTaxedStreet()).toContain("Besztercei");
        expect(instance.moreDistanceTaxedStreet()).toContain("Gyurgyalag");
        expect(instance.moreDistanceTaxedStreet()).toContain("Icce");
        expect(instance.moreDistanceTaxedStreet()).toContain("Kurta");
        expect(instance.moreDistanceTaxedStreet()).toContain("Rezeda");
        expect(instance.moreDistanceTaxedStreet()).toContain("Szepesi");
    });
})