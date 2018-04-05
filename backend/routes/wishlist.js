import express from "express";
import Wishlist from "../models/wishlist";

const router = express.Router();

router.get("/:keeper_id", (req, res) => {
  console.log("******GET api/wishlist/:keeper_id PASS!!******");
  const keeper_id = req.params.keeper_id;
  Wishlist.query({
    select: ["*"],
    where: { keeper_id: keeper_id }
  })
    .fetchAll({ withRelated: ["home"] })
    .then(wishlist => {
      console.log("******GET api/wishlist/:keeper_id SUCCESS!!******");
      return res.json(wishlist);
    })
    .catch(err => {
      console.log("******GET api/wishlist/:keeper_id FAIL!!******");
      return res.status(500).json({ error: err });
    });
});

router.post("/", (req, res) => {
  console.log("******GET api/wishlist/new PASS!!******");
  const { keeper_id, home_id } = req.body;
  Wishlist.forge({ keeper_id, home_id }, { hasTimestamps: true })
    .save()
    .then(wish => {
      console.log("******Add wishlist SUCCESS!!******");
      return res.json({ wish });
    })
    .catch(errors => {
      console.log("******Add wishlist FAIL!!******");
      return res
        .status(500)
        .json({ error: true, message: "POST /api/wishlist fail!" });
    });
});

export default router;
