import { table } from "../../../util/Airtable";

export default async (req, res) => {
  const columnRanks = [
    {
      id: "unranked",
      title: "Unranked",
      itemIds: [],
    },
    {
      id: "highestPriority",
      title: "Highest Priority (select 1-2)",
      itemIds: [],
    },
    {
      id: "highPriority",
      title: "High Priority",
      itemIds: [],
    },
    {
      id: "mediumPriority",
      title: "Medium Priority",
      itemIds: [],
    },
    {
      id: "lowPriority",
      title: "Low Priority",
      itemIds: [],
    },
    {
      id: "shouldNotPrioritize",
      title: "Should Not Prioritize",
      itemIds: [],
    },
  ];

  try {
    const airtableRecords = await table
      .select({
        view: "Grid view",
        fields: [
          "Name",
          "Notes",
          "Attachments",
          "Parks & Rec Overlap",
          "Rank - Jade",
        ],
      })
      .firstPage();

    // set up records object
    let records = {};
    records.items = {};
    records.columns = {};
    records.columnOrder = columnRanks.map((col) => col.id);

    // populate columns structure
    columnRanks.forEach((col) => {
      records.columns[col.id] = col;
    });

    // populate records
    airtableRecords.forEach((entry) => {
      records.items[entry.id] = {
        id: entry.id,
        title: entry.fields.Name,
        description: entry.fields.Notes,
      };

      // populate columns
      if (entry.fields[`Rank - ${req.query.id}`] !== undefined) {
        const fieldLabel = entry.fields[`Rank - ${req.query.id}`];
        const fieldId = columnRanks.find((col) => col.title === fieldLabel).id;
        records.columns[fieldId].itemIds.push(entry.id);
      } else {
        records.columns.unranked.itemIds.push(entry.id);
      }
    });

    res.status(200).json(records);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Something went wrong! 😕" });
  }
};
