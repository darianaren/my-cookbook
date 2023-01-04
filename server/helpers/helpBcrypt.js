const bcrypt = require("bcryptjs");

const encrypt = async (textPlain) => {
  const hash = await bcrypt.hash(textPlain, 10);
  return hash;
};

const compare = async (passwordPlain, passwordHash) => {
  return await bcrypt.compare(passwordPlain, passwordHash);
};

module.exports = { encrypt, compare };
