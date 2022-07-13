const Airtable = require("airtable");

// Authenticate
Airtable.configure({
  apiKey: process.env.AIRTABLE_KEY,
});

// Initialize a base
const base = Airtable.base(process.env.AIRTABLE_BASE);

// Reference a table
const table = base(process.env.AIRTABLE_TABLE);

export { table };
