import express from "express";
import shortid from "shortid";
import Trip from "../models/trip";
import User from "../models/user";

const router = express.Router();

// GET api/trips/:guest_id/count
router.get("/:guest_id/count", (req, res) => {
  console.log("******GET api/trips/:guest_id/count PASS!!******");
  const guest_id = req.params.guest_id;
  Trip.where("guest_id", guest_id)
    .count()
    .then(count => {
      console.log("******GET api/trips/:guest_id SUCCESS!!******");
      return res.json(count);
    })
    .catch(err => {
      console.log("******GET api/trips/:guest_id FAIL!!******");
      return res.status(500).json({ error: err });
    });
});

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

router.get("/home/:home_id", (req, res) => {
  console.log("******GET api/home/:home_id PASS!!******");
  const home_id = req.params.home_id;
  Trip.query({
    select: ["*"],
    where: { home_id: home_id }
  })
    .fetchAll()
    .then(trips => {
      console.log("******GET api/home/:home_id SUCCESS!!******");
      return res.json({ success: true, trips });
    })
    .catch(err => {
      console.log("******GET api/home/:home_id FAIL!!******");
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
      return res.json({ success: true, trip: trip });
    })
    .catch(err => {
      console.log("******GET api/trips/:guest_id FAIL!!******");
      return res.json({ error: err });
    });
});

router.post("/", (req, res) => {
  console.log("******POST api/trips PASS!!******");
  const {
    check_in_time,
    check_out_time,
    reserved_guests,
    prices,
    dates,
    home_id,
    guest_id
  } = req.body;

  const order_id = shortid.generate();

  const pricesStr = JSON.stringify(prices);
  const datesStr = JSON.stringify(dates);

  Trip.forge(
    {
      order_id,
      check_in_time,
      check_out_time,
      reserved_guests,
      prices: pricesStr,
      dates: datesStr,
      home_id,
      guest_id
    },
    { hasTimestamps: true }
  )
    .save()
    .then(trip => {
      console.log("******Add trip SUCCESS!!******");
      return res.json({ success: true, trip: trip });
    })
    .catch(errors => {
      console.log("******Add trip FAIL!!******");
      return res.json({ success: false, errors: errors });
    });
});

export default router;
