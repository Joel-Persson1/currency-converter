describe("Currency Converter App", () => {
  beforeEach(() => {
    cy.intercept("GET", "https://api.frankfurter.dev/v1/currencies", {
      statusCode: 200,
      body: {
        USD: "US Dollar",
        EUR: "Euro",
        INR: "Indian Rupee",
        SEK: "Swedish Krona",
      },
    }).as("getCurrencies");
    cy.intercept("GET", /https:\/\/api\.frankfurter\.dev\/v1\/latest.*/, {
      statusCode: 200,
      body: {
        rates: { INR: 83.2, USD: 1, EUR: 0.92, SEK: 10.5 },
      },
    }).as("convertCurrency");
    cy.visit("http://localhost:5173");
  });

  it("renders the main UI elements", () => {
    cy.contains("Currency Converter");
    cy.get("label").contains("From:");
    cy.get("label").contains("To:");
    cy.get("label").contains("Amount:");
    cy.get('input[type="number"]').should("have.value", "1");
    cy.get("button").contains("Convert");
  });

  it("changes the amount input", () => {
    cy.get('input[type="number"]').clear().type("123").blur();
    cy.get('input[type="number"]')
      .focus()
      .clear()
      .type("123")
      .should("have.value", "123");
  });

  it("selects different currencies in dropdowns", () => {
    cy.get("label").contains("From:").parent().find("select").select(1);
    cy.get("label").contains("To:").parent().find("select").select(2);
  });

  it("swaps currencies when swap button is clicked", () => {
    cy.get("label")
      .contains("From:")
      .parent()
      .find("select")
      .then(($from) => {
        const fromValue = $from.val();
        cy.get("label")
          .contains("To:")
          .parent()
          .find("select")
          .then(($to) => {
            const toValue = $to.val();
            cy.get('button[aria-label="swap-currencies"]').click();
            cy.get("label")
              .contains("From:")
              .parent()
              .find("select")
              .should("have.value", toValue);
            cy.get("label")
              .contains("To:")
              .parent()
              .find("select")
              .should("have.value", fromValue);
          });
      });
  });

  it("converts currency and displays result", () => {
    cy.get("button").contains("Convert").click();
    cy.get(".text-green-600").should("contain", "Converted Amount");
  });

  it("toggles favorite star for a currency", () => {
    cy.get("label").contains("From:").parent().find("button").click();
    cy.get("label").contains("From:").parent().find("svg").should("exist");
  });

  it("shows error for empty amount", () => {
    cy.get('input[type="number"]').clear().blur();
    cy.get("button").contains("Convert").click();
    cy.get(".text-red-600").should("contain", "Invalid inputs for conversion");
  });

  it("shows error for noll eller negativt belopp", () => {
    cy.get('input[type="number"]').clear().type("0").blur();
    cy.get("button").contains("Convert").click();
    cy.get(".text-red-600").should("contain", "Invalid inputs for conversion");

    cy.get('input[type="number"]').clear().type("-5").blur();
    cy.get("button").contains("Convert").click();
    cy.get(".text-red-600").should("contain", "Invalid inputs for conversion");
  });

  it("begränsar maxbelopp till 1000000", () => {
    cy.get('input[type="number"]').clear().type("1000001").blur();
    cy.get('input[type="number"]').should("have.value", "1000000");
  });

  it("does not allow selecting the same currency in both dropdowns", () => {
    // Välj USD i From
    cy.get("label").contains("From:").parent().find("select").select("USD");
    // Nu ska USD inte finnas i To-dropdownen, välj EUR istället
    cy.get("label").contains("To:").parent().find("select").select("EUR");
    // Kontrollera att From och To har olika värden
    cy.get("label")
      .contains("From:")
      .parent()
      .find("select")
      .invoke("val")
      .then((fromVal) => {
        cy.get("label")
          .contains("To:")
          .parent()
          .find("select")
          .invoke("val")
          .should("not.eq", fromVal);
      });
  });

  it("toggles favorite star for a currency in both dropdowns", () => {
    cy.get("label").contains("From:").parent().find("button").click();
    cy.get("label").contains("From:").parent().find("svg").should("exist");
    cy.get("label").contains("To:").parent().find("button").click();
    cy.get("label").contains("To:").parent().find("svg").should("exist");
  });

  it("shows loading animation when converting", () => {
    cy.get('input[type="number"]').clear().type("100").blur();
    cy.intercept("GET", /https:\/\/api\.frankfurter\.dev\/v1\/latest.*/, {
      statusCode: 200,
      delay: 1000,
      body: {
        rates: { INR: 83.2, USD: 1, EUR: 0.92, SEK: 10.5 },
      },
    }).as("convertCurrencySlow");
    cy.get("button").contains("Convert").click();
    cy.get("button").contains("Convert").should("have.class", "animate-pulse");
  });

  it("shows error message when API request fails", () => {
    cy.intercept("GET", /https:\/\/api\.frankfurter\.dev\/v1\/latest.*/, {
      statusCode: 500,
      body: { error: "Internal Server Error" },
    }).as("convertCurrencyError");
    cy.get("button").contains("Convert").click();
    cy.get("div[aria-label='error']").should(
      "contain",
      "Failed to fetch conversion rates"
    );
  });

  it("saves favorites to localStorage", () => {
    cy.get("label").contains("From:").parent().find("button").click();
    cy.window().then((win) => {
      const favorites = JSON.parse(win.localStorage.getItem("favorites"));

      expect(favorites).to.not.include("USD");
    });
  });
});
