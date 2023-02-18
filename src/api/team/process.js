import Player from "../../db/model/player";
import PlayerSkill from "../../db/model/playerSkill";

export default async (req, res) => {
  try {
    var teamlist = [];
    const request = req.body;
    // console.log(reqbody);

    for (const team of request) {
      const { position, mainSkill, numberOfPlayers } = team;

      const players = await Player.findAll({
        attributes: ["name", "position"],
        where: { position },
        include: {
          model: PlayerSkill,
          as: "playerSkills",
          attributes: ["skill", "value"],
          where: { skill: mainSkill },
        },
        order: [
          [
            {
              model: PlayerSkill,
              as: "playerSkills",
              attributes: ["skill", "value"],
              where: { skill: mainSkill },
            },
            "value",
            "DESC",
          ],
        ],

        // limit: numberOfPlayers,
      });

      if (players.length < numberOfPlayers) {
        return res.status(400).send({
          message: `Insufficient number of players for position: ${position}`,
        });
      }
      const player1 = players.slice(0, numberOfPlayers);
      // console.log(players);

      teamlist.push(player1);
    }
    return res.send(teamlist);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};
