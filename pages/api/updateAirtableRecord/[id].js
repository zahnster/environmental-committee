import { table } from "../../../util/Airtable";

export default async (req, res) => {
  const { rank, id, userId } = JSON.parse(req.body);

  const fields = {};
  fields[`Rank - ${userId}`] = rank;

  table.update(
    [
      {
        id,
        fields,
      },
    ],

    function (err) {
      if (err) {
        console.log(err);
      }
    }
  );

  res.status(200).json({
    status: "Success",
  });
};
