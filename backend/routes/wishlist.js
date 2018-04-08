import express from "express";
import Wishlist from "../models/wishlist";

const router = express.Router();

// GET api/wishlist/:keeper_id/count
router.get("/:keeper_id/count", (req, res) => {
  console.log("******GET api/wishlist/:keeper_id/count PASS!!******");
  const keeper_id = req.params.keeper_id;
  Wishlist.query({
    select: ["*"],
    where: { keeper_id: keeper_id }
  })
    .fetchAll({ withRelated: ["home"] })
    .then(wishlist => {
      console.log("******GET api/wishlist/:keeper_id SUCCESS!!******");
      return res.json(wishlist.length);
    })
    .catch(err => {
      console.log("******GET api/wishlist/:keeper_id FAIL!!******");
      return res.status(500).json({ error: err });
    });
});

// GET api/wishlist/:keeper_id
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

// GET api/wishlist/:keeper_id/:home_id
router.get("/:keeper_id/:home_id", (req, res) => {
  console.log("******GET api/wishlist/:keeper_id/:home_id PASS!!******");
  const keeper_id = req.params.keeper_id;
  const home_id = req.params.home_id;
  Wishlist.query({
    select: ["*"],
    where: { keeper_id: keeper_id },
    andWhere: { home_id: home_id }
  })
    .fetch()
    .then(favorite => {
      console.log("******GET api/wishlist/:keeper_id/:home_id SUCCESS!!******");
      return res.json(favorite);
    })
    .catch(err => {
      console.log("******GET api/wishlist/:keeper_id/:home_id FAIL!!******");
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

// DELETE api/wishlist/:id
router.delete("/:id", (req, res) => {
  console.log("******DELETE api/wishlist/:id PASS!!******");
  const id = req.params.id;
  Wishlist.query({ select: ["*"], where: { id: id } })
    .fetch()
    .then(wish => {
      if (!wish) {
        console.log("******DELETE api/wishlist/:id FAIL!!******");
        return res.status(404).json({ message: "wishlist not found" });
      }
      wish.destroy().then(() => {
        console.log("******DELETE api/wishlist/:id SUCCESS!!******");
        return res.json({
          success: true,
          message: "wishlist successfully deleted!"
        });
      });
    })
    .catch(err => {
      console.log("******DELETE api/wishlist/:id FAIL!!******");
      return res
        .status(500)
        .json({ message: "fetch wishlist fail", error: err });
    });
});

export default router;
