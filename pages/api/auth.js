export default async (req, res) => {
  const { username, password } = JSON.parse(req.body);
  const ucUser = username.toUpperCase();
  let authorized = false;

  const storedPass = process.env[`PASS_${ucUser}`];

  // update authorized to username in the event of a password match
  if (username && password === storedPass) {
    authorized = username;
  }

  res.status(200).json({
    authorized,
  });
};
