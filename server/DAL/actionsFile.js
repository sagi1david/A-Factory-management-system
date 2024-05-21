const jf = require("jsonfile");

const file = "server/Data/actions.json";

// read from a json file
const getActions = () => {
  return jf.readFile(file);
};

// write to a json file
const setActions =  (data) => {
   jf.writeFileSync(file, data );
  return "ok";
};

module.exports = { getActions, setActions };
