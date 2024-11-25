import fs from "fs"; // https://nodejs.org/docs/latest-v14.x/api/fs.html
import http from "http"; // https://nodejs.org/docs/latest-v14.x/api/http.html
import url from "url"; // https://nodejs.org/docs/latest-v14.x/api/url.html
import Solution from "./Solution";
import StreetTax from "./StreetTax";

export default function content(req: http.IncomingMessage, res: http.ServerResponse): void {
    // favicon.ico kérés kiszolgálása:
    if (req.url === "/favicon.ico") {
        res.writeHead(200, { "Content-Type": "image/x-icon" });
        fs.createReadStream("favicon.ico").pipe(res);
        return;
    }
    // Weboldal inicializálása + head rész:
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<!DOCTYPE html>");
    res.write("<html lang='hu'>");
    res.write("<head>");
    res.write("<meta charset='utf-8'>");
    res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
    res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
    res.write("<title>Jedlik Ts Template</title>");
    res.write("</head>");
    res.write("<body><form><pre>");

    // 1. feladat: Adatok beolvasása, tárolása
    const mo: Solution = new Solution("utca.txt");

    // 2. feladat: Telek megszámolása
    res.write(`2. feladat. A mintában ${mo.streetTaxesCount} telek szerepel.\n`)
    const params = new url.URL(req.url as string, `http://${req.headers.host}/`).searchParams;

    // 3. feladat: Adószám alapján telkek száma
    let inputTaxExemt: string = params.get("inputTaxExemt") as string;
    if (inputTaxExemt === null) {
        inputTaxExemt = "";
    }

    res.write(`3. feladat. Egy tulajdonos adószáma: <input type='text' name='inputTaxExemt'
        value='${inputTaxExemt}' style='max-width:100px' onChange='this.form.submit();'>`);

    if (mo.getOwnerHouses(inputTaxExemt).size == 0) {
        res.write(`\nNem szerepel az adatállományban.`);
    } else {
        for (const [key, value] of mo.getOwnerHouses(inputTaxExemt)) {
            res.write(`\n${key} utca ${value}`);
        }
    }

    // 5. feladat: Sávokban a telkek mennyisége és adójuk
    res.write(`\n5. feladat`);

    for (const [key, value] of StreetTax.distanceMap) {
        res.write(mo.taxCalculatorString(key));
    }

    // 6. feladat: Több sávba sorolt utcák
    res.write("\n6. feladat. A több sávba sorolt utcák:");

    for (const streetName of mo.moreDistanceTaxedStreet()) {
        res.write(`\n${streetName}`);
    }

    // 7. feladat: Fájl írás
    mo.fileWrite(`fizetendo.txt`);

    res.write("</pre></form></body></html>");
    res.end();
}
