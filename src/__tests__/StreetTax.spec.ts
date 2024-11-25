import StreetTax from "../StreetTax";

describe('StreetTax osztály tesztek', () => {
    const instance = new StreetTax("11111 Hunyadi 77 C 150");
    const instance2 = new StreetTax("11111 Hunyadi 77 C 10");

    it("StreetTax osztálypéldány ellenőrzése", async () => {
        expect(instance).toBeInstanceOf(StreetTax);
    })
    it("Adószám ellenőrzése", () => {
        expect(instance.taxExemt).toHaveLength(5);
        expect(instance.taxExemt).toBe("11111");
    })
    it("Utca ellenőrzése", () => {
        expect(instance.streetName).not.toContain(typeof("number"));
        expect(instance.streetName).toBe("Hunyadi");
    })
    it("Házszám ellenőrzése", () => {
        expect((parseInt(instance.houseNumber.slice(0, -1))).toString()).toBe(instance.houseNumber.slice(0, -1));
        expect(instance.houseNumber).toBe("77");
    })
    it("Sáv ellenörzése", () => {
        expect(["A", "B", "C"]).toContain(instance.distance);
        expect(instance.distance).toBe("C");
    })
    it("Alapterület ellenőrzése", () => {
        expect(typeof(instance.basicArea)).toBe("number");
        expect(instance.basicArea).toBe(150);
    })
    it("Adó ellenőrzése", () => {
        expect(instance.Tax).toBe(15000);
        expect(instance2.Tax).toBe(0);
    })
})