import Player from "./player";
import PlayerSkill from "./playerSkill";

const database = {
  Player,
  PlayerSkill,
};

Object.keys(database).forEach(function (modelName) {
  if (database[modelName].associate) {
    database[modelName].associate(database);
  }
});

export default database;
