import Sequelize from "sequelize";
import database from "../index";
import Player from "./player";

const PlayerSkill = database.define(
  "playerSkill",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    skill: {
      type: Sequelize.ENUM("defense", "attack", "speed", "strength", "stamina"),
    },
    value: {
      type: Sequelize.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);

// PlayerSkill.associate = (models) => {
//   models.PlayerSkill.belongsTo(models.Player);
// };

export default PlayerSkill;
