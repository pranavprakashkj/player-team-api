import Player from "../../db/model/player";

export default async (req, res) => {
  const id = req.params.id;
  try {
    const player = await Player.findByPk(id);
    if (!player) {
      return res
        .status(404)
        .send({ message: `Player not found with id ${id}` });
    }
    player.destroy();
    res.status(200).send({
      message: "Player deleted successfully!",
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
