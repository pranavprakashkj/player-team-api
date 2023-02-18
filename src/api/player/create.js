// import player from ".";
import Player from "../../db/model/player";
import PlayerSkill from "../../db/model/playerSkill";

export default async (req, res) => {
  const { name, position, playerSkills } = req.body;
  const skill = playerSkills.map((obj) => obj.skill);
  console.log(skill);
  const availablePositions = ["defender", "midfielder", "forward"];
  const availableSkills = ["defense", "attack", "speed", "strength", "stamina"];

  if (!availablePositions.includes(position)) {
    return res.status(406).send({
      message: `Invalid position ${position}. Available positions: defender, midfielder, forward`,
    });
  }

  for (const skills of skill) {
    if (!availableSkills.includes(skills)) {
      return res.status(406).send({
        message: `Invalid skill ${skills}. Available skills: defence,attack,speed,strength,stamina`,
      });
    }
  }

  try {
    const player = await Player.create({
      name: name,
      position: position,
    });
    if (playerSkills && playerSkills.length) {
      const skills = await PlayerSkill.bulkCreate(
        playerSkills.map((obj) => ({
          skill: obj.skill,
          value: obj.value,
          playerId: player.id,
        }))
      );
      // console.log(skills["player"]);
      // await player.playerSkills(skills);
    }

    res.send(player);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
