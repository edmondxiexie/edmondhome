import express from "express";
import Home from "../models/home";

const router = express.Router();

// GET api/hosts/:host_id/count
router.get("/:host_id/count", (req, res) => {
  console.log("******GET api/hosts/:host_id/count PASS!!******");
  const host_id = req.params.host_id;
  Home.query({
    select: ["*"],
    where: { host_id: host_id }
  })
    .fetchAll()
    .then(homes => {
      console.log("******Fetch host homes/count SUCCESS!!******");
      return res.json(homes.length);
    })
    .catch(error => {
      console.log("******Fetch host homes/count FAIL!!******");
      return res.status(500).json({ error: error });
    });
});

// GET api/hosts/:host_id
router.get("/:host_id", (req, res) => {
  console.log("******GET api/hosts/:host_id PASS!!******");
  const host_id = req.params.host_id;
  Home.query({
    select: ["*"],
    where: { host_id: host_id }
  })
    .orderBy("id", "ASC")
    .fetchAll()
    .then(homes => {
      console.log("******Fetch host homes SUCCESS!!******");
      return res.json(homes);
    })
    .catch(error => {
      console.log("******Fetch host homes FAIL!!******");
      return res.status(500).json({ error: error });
    });
});

export default router;
