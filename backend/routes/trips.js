import express from "express";
import Trip from "../models/trip";
import User from "../models/user";

const router = express.Router();

router.get("/:guest_id", (req, res) => {
  console.log("******GET api/trips/:guest_id PASS!!******");
  const guest_id = req.params.guest_id;
  Trip.query({
    select: ["*"],
    where: { guest_id: guest_id }
  })
    .fetchAll({ withRelated: ["home"] })
    .then(trips => {
      console.log("******GET api/trips/:guest_id SUCCESS!!******");
      return res.json(trips);
    })
    .catch(err => {
      console.log("******GET api/trips/:guest_id FAIL!!******");
      return res.status(500).json({ error: err });
    });
});

router.get("/trip/:trip_id", (req, res) => {
  console.log("******GET api/trip/:trip_id PASS!!******");
  const trip_id = req.params.trip_id;
  Trip.query({
    select: ["*"],
    where: { id: trip_id }
  })
    .fetch({ withRelated: ["home", "home.host"] })
    .then(trip => {
      console.log("******GET api/trips/:guest_id SUCCESS!!******");
      return res.json(trip);
    })
    .catch(err => {
      console.log("******GET api/trips/:guest_id FAIL!!******");
      return res.status(500).json({ error: err });
    });
});
export default router;
