// import { where } from "sequelize/types";
import Player from "../../db/model/player";
import PlayerSkill from "../../db/model/playerSkill";

export default async (req, res) => {
  const id = req.params.id;
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

  // console.log(
  //   req.body.playerSkills.find((s) => {
  //     s.skill === "attack";
  //   })
  // );

  const skillset = playerSkills.map((obj) => obj.skill);
  const value = playerSkills.map((obj) => obj.value);
  // console.log(skillset.find((s) => "strength" === s));

  const player = await Player.findByPk(id, {
    include: [{ model: PlayerSkill, as: "playerSkills" }],
  });
  // console.log(player);
  if (!player) {
    res.status(404).send({ message: `player not found` });
  } else {
    try {
      await Player.update(
        {
          name,
          position,
        },
        { where: { id: id } }
      );
      if (playerSkills && playerSkills.length) {
        const skills = await PlayerSkill.findAll({
          where: { playerId: id },
          raw: true,
        });
        console.log(skills);
        // for (const skil of skills) {
        //   // console.log(skil.skill);
        //   const skilldata = skillset.find((obj) => obj === skil.skill);
        //   console.log(skilldata);
        //   if (skilldata) {
        //     await PlayerSkill.update({
        //       value: playerSkills.map((obj) => obj.value),
        //     });
        //   }
        // }

        skills.map(async (ss) => {
          const skilldata = playerSkills.find((s) => ss.skill === s.skill);
          // console.log(skilldata);

          if (skilldata) {
            await PlayerSkill.update(
              {
                value: skilldata.value,
              },
              { where: { id: ss.id } }
            );
          }
        });
        console.log(playerSkills);
        const newskills = playerSkills.filter(
          (s) => !skills.find((ps) => s.skill === ps.skill)
        );
        console.log(newskills);

        newskills.map(async (ps) => {
          await PlayerSkill.create({
            skill: ps.skill,
            value: ps.value,
            playerId: id,
          });
        });
      }
      // const final = await Player.findOne(id, {
      //   include: [{ model: PlayerSkill, as: "playerSkills" }],
      // });
      res.send(
        await Player.findByPk(id, {
          include: [{ model: PlayerSkill, as: "playerSkills" }],
        })
      );
      // let skill = await PlayerSkill.update(
      //   {
      //     skill: req.body.playerSkills.skill,
      //     value: req.body.playerSkills.value,
      //   },
      //   { where: { playerId: id } }
      // );
      // res.send(await Player.findByPk(id));
    } catch (err) {
      console.log(err);
      res.status(500).send({ error: err.message });
    }
  }
};
