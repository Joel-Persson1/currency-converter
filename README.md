# 💱 Currency Converter

Detta är en enkel men kraftfull valutakonverterare byggd med **React**, **TypeScript** och **Tailwind CSS**. Applikationen låter användaren konvertera ett belopp från en valuta till en annan på ett snabbt och smidigt sätt.

## 📝 Hur man startar

Klonar du repositoryn och installerar dependencies med `npm install` och startar applikationen med `npm run dev`.

## ✨ Funktionalitet

- Välj två olika valutor från en lista med tillgängliga valutor.
- Ange ett belopp för att konvertera.
- Se det konverterade beloppet i realtid.
- Spara favoritvalutor som visas överst i listan.
- Markera/avmarkera valutor som favoriter med en stjärnikon.
- Få tydliga felmeddelanden vid ogiltiga belopp eller om samma valuta väljs i båda fälten.

## 📱 Responsiv Design

Applikationen är helt responsiv och fungerar bra på både dator, surfplatta och mobil.

## 🔒 Säkerhet och Felhantering

- Kontrollerar att beloppet inte är tomt, noll eller negativt innan konvertering.
- Begränsar maxbeloppet till **1 000 000** för att undvika orimliga konverteringar.
- Döljer valutan som redan är vald i det andra fältet, vilket förhindrar att samma valuta väljs två gånger.

## 🧪 Tester

Applikationen är testad med **Cypress** för att säkerställa en stabil och förutsägbar användarupplevelse. Följande scenarier täcks:

- **Renderar huvudkomponenterna** – Säkerställer att alla UI-element laddas korrekt.
- **Ändrar beloppsfältet** – Testar att användaren kan ange och ändra belopp.
- **Väljer olika valutor i dropdown-menyerna** – Verifierar att det går att välja olika valutor.
- **Byter plats på valutor vid swap** – Testar att swap-knappen fungerar som förväntat.
- **Konverterar valuta och visar resultatet** – Säkerställer korrekt konvertering och visning.
- **Favoritmarkerar en valuta** – Testar att man kan markera och avmarkera valutor som favoriter.
- **Visar fel för tomt belopp** – Visar felmeddelande om inget belopp anges.
- **Visar fel för noll eller negativt belopp** – Visar felmeddelande för ogiltiga belopp.
- **Begränsar maxbeloppet till 1 000 000** – Förhindrar för höga belopp.
- **Förhindrar val av samma valuta i båda fälten** – Säkerställer att två olika valutor väljs.
- **Favoritmarkering fungerar i båda dropdown-menyerna** – Testar funktionalitet i båda listorna.
- **Visar laddningsanimation vid konvertering** – Ger feedback medan beräkningen pågår.
- **Visar felmeddelande vid API-fel** – Testar att användaren informeras vid misslyckad förfrågan.
- **Sparar favoriter i localStorage** – Säkerställer att favoritvalutor sparas i webbläsaren.

## 💭 Reflektion

Jag valde att bygga projektet med **Vite** och **React** eftersom det är en liten applikation där fokus ligger på funktionalitet snarare än SEO.  
Jag använde **Cypress** för tester eftersom det är enkelt att sätta upp och integrera med applikationen.  
**Tailwind CSS** valdes för sin smidiga integration med komponenter, och **TypeScript** för att göra koden mer robust och förhindra vanliga buggar.

### ✅ Styrkor

- Brett testomfång som täcker alla centrala funktioner.
- Responsiv design som fungerar på alla enheter.
- Enkel och tydlig användarupplevelse med fokus på funktionalitet.

### ⚠️ Svagheter

- Täcker inte alla världens valutor (fokus på de vanligaste).
- Väldigt enkel design som hade kunnat förbättras ytterligare.

### 🔧 Möjliga förbättringar

- Förbättrad design och mer visuella felmeddelanden.
- Stöd för fler valutor.
- Lägga till flaggor eller symboler för varje valuta för en snabbare och mer intuitiv upplevelse.

## 📚 Vad jag har lärt mig

- Fördjupat mina kunskaper i **TypeScript** och **Tailwind CSS**.
- Lärt mig skriva och strukturera tester i **Cypress**.
- Fått erfarenhet av hur man bygger en säkrare och mer användarvänlig applikation.
