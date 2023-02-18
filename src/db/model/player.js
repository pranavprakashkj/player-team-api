import Sequelize from "sequelize";
import database from "../index";
import PlayerSkill from "./playerSkill";

const Player = database.define(
  "player",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING(200),
      allowNull: false,
    },
    position: {
      type: Sequelize.ENUM,
      values: ["defender", "midfielder", "forward"],
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

// Player.associate = (models) => {
//   models.Player.hasMany(models.PlayerSkill);
// };

Player.hasMany(PlayerSkill);
PlayerSkill.belongsTo(Player);

export default Player;
