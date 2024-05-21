const actionsFile = require("../DAL/actionsFile");

const getAllActions = async () => {
  return await actionsFile.getActions();
};

// Get By ID
const getLastActionById = async (id) => {
  const data = await actionsFile.getActions();

  const getActionsById = data.actions.filter((action) => action.id === id);
  
  if (getActionsById !== undefined) {
    const getLastActionById = getActionsById[getActionsById.length - 1];

    return getLastActionById;
  }

  return getActionsById;
};

const setActions = (data) => {
  return actionsFile.setActions(data);
};

module.exports = { getAllActions, getLastActionById, setActions };
