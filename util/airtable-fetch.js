import Airtable from "airtable";

export async function getAirtableRecordsForId(id) {
  const base = new Airtable({ apiKey: process.env.AIRTABLE_KEY }).base(
    process.env.AIRTABLE_BASE
  );

  let initiatives = [];

  return new Promise((resolve, reject) => {
    base("Initiatives")
      .select({
        view: "Grid view",
        fields: [
          "Name",
          "Notes",
          "Attachments",
          "Parks & Rec Overlap",
          `Rank - Member ${id}`,
        ],
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(function (record) {
            initiatives.push(record);
          });

          fetchNextPage();
        },

        function done(err) {
          if (err) {
            return reject(err);
          }

          return resolve(initiatives);
        }
      );
  });
}
