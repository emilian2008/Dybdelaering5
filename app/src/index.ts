// ----- Din TypeScript Wishlist -----

// 1️⃣ Lag en "wishlist"-array med spill
const wishlist: { navn: string; pris: number }[] = [
  { navn: "The Legend of Zelda", pris: 699 },
  { navn: "Minecraft", pris: 249 },
  { navn: "Cyberpunk 2077", pris: 399 },
];

// 2️⃣ Lag container for å vise spillene
const container = document.createElement("div");
container.style.marginTop = "20px";
document.body.appendChild(container);

// 3️⃣ Funksjon som viser alle spill
function visWishlist() {
  container.innerHTML = ""; // tømmer container
  wishlist.forEach((spill) => {
    const p = document.createElement("p");
    p.textContent = `${spill.navn} — ${spill.pris} kr`;
    container.appendChild(p);
  });
}

// 4️⃣ Funksjon for å legge til nye spill
function leggTilSpill(navn: string, pris: number) {
  if (!navn || pris <= 0) return; // sikkerhet
  wishlist.push({ navn, pris });
  visWishlist(); // oppdater DOM
}

// 5️⃣ Lag input-felt og knapp for testing
const inputNavn = document.createElement("input");
inputNavn.placeholder = "Navn på spill";

const inputPris = document.createElement("input");
inputPris.type = "number";
inputPris.placeholder = "Pris";

const knapp = document.createElement("button");
knapp.textContent = "Legg til spill";

document.body.appendChild(inputNavn);
document.body.appendChild(inputPris);
document.body.appendChild(knapp);

// 6️⃣ Event listener for knappen
knapp.addEventListener("click", () => {
  leggTilSpill(inputNavn.value, Number(inputPris.value));
  inputNavn.value = "";
  inputPris.value = "";
});

// 7️⃣ Vis listen første gang
visWishlist();

// 8️⃣ Valgfritt: futuristisk – hent fra n8n/API
// async function hentSpillFraAPI() {
//   const response = await fetch("URL_TIL_N8N");
//   const spillListe = await response.json();
//   spillListe.forEach((spill: { navn: string; pris: number }) => {
//     leggTilSpill(spill.navn, spill.pris);
//   });
// }
// hentSpillFraAPI();