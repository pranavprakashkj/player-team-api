import Player from "../../db/model/player";
import PlayerSkill from "../../db/model/playerSkill";

export default async (req, res) => {
  try {
    const player = await Player.findAll({
      include: [{ model: PlayerSkill, as: "playerSkills" }],
    });
    // console.log(player);
    res.send(player);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
