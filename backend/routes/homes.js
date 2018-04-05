import express from "express";
import Home from "../models/home";
import commonValidations from "../common/validations/home";

const router = express.Router();

// helper for POST /api/homes
const valideteHomeForm = (data, commonValidations) => {
  return commonValidations(data);
};

// POST api/homes
router.post("/", (req, res) => {
  console.log("******POST api/homes PASS!!******");
  let { errors, valid } = commonValidations(req.body);

  if (valid) {
    const {
      title,
      description,
      image,
      host_id,
      price,
      district,
      property_type,
      room_type,
      setup_for_guest,
      guest_availability,
      rooms_availability,
      beds_availability,
      bath_availability,
      target
    } = req.body;
    console.log(req.body);
    Home.forge(
      {
        title,
        description,
        image,
        host_id,
        price,
        district,
        property_type,
        room_type,
        setup_for_guest,
        guest_availability,
        rooms_availability,
        beds_availability,
        bath_availability,
        target
      },
      { hasTimestamps: true }
    )
      .save()
      .then(home => {
        console.log("******Add homes SUCCESS!!******");
        return res.json({ home });
      })
      .catch(errors => {
        console.log("******Add homes FAIL!!******");
        return res
          .status(500)
          .json({ error: true, message: "POST /api/homes fail!" });
      });
  } else {
    console.log("Does not pass input validation in server");
    res.status(500).json({ error: "Invalid Input" });
  }
});

// GET api/homes/count
router.get("/count", (req, res) => {
  console.log("******GET api/homes/count PASS!!******");
  Home.count("*")
    .then(count => {
      console.log("******Fetch homes/count SUCCESS!!******");
      return res.json(count);
    })
    .catch(errors => {
      console.log("******Fetch homes FAIL!!******");
      return res
        .status(500)
        .json({ errors: true, message: "errors in GET api/homes/count" });
    });
});

// GET api/homes/:id
router.get("/:id", (req, res) => {
  console.log("******GET api/homes/:id PASS!!******");
  const id = req.params.id;
  Home.query({
    select: ["*"],
    where: { id: id }
  })
    .fetch()
    .then(home => {
      console.log("******Fetch home SUCCESS!!******");
      return res.json(home);
    })
    .catch(error => {
      console.log("******Fetch home FAIL!!******");
      return res.status(500).json({ error: error });
    });
});

// GET api/homes
router.get("/", (req, res) => {
  console.log("******GET api/homes PASS!!******");
  Home.query({
    select: ["*"]
  })
    .orderBy("id", "ASC")
    .fetchPage({
      pageSize: 12,
      page: 3
    })
    .then(homes => {
      console.log("******Fetch homes SUCCESS!!******");
      return res.json(homes);
    })
    .catch(errors => {
      console.log("******Fetch homes FAIL!!******");
      return res
        .status(500)
        .json({ errors: true, message: "errors in GET api/homes" });
    });
});

// PUT api/homes/:id/edit
router.put("/:id/edit", (req, res) => {
  console.log("******GET api/:id/edit PASS!!******");
  const id = req.params.id;
  const {
    title,
    description,
    image,
    host_id,
    price,
    district,
    property_type,
    room_type,
    setup_for_guest,
    guest_availability,
    rooms_availability,
    beds_availability,
    bath_availability,
    target
  } = req.body;
  Home.where({ id: id })
    .save(
      {
        title,
        description,
        image,
        host_id,
        price,
        district,
        property_type,
        room_type,
        setup_for_guest,
        guest_availability,
        rooms_availability,
        beds_availability,
        bath_availability,
        target
      },
      { patch: true }
    )
    .then(home => {
      console.log("******GET api/:id/edit SUCCESS!!******");
      return res.json({ success: true, home: home, id: id });
    })
    .catch(err => {
      console.log("******GET api/:id/edit FAIL!!******");
      return res.status(401).json({ error: err });
    });
});

// DELETE api/homes/:id/
router.delete("/:id", (req, res) => {
  console.log("******DELETE api/homes/:id PASS!!******");
  const id = req.params.id;
  Home.query({ select: ["*"], where: { id: id } })
    .fetch()
    .then(home => {
      if (!home) {
        console.log("******DELETE api/homes/:id FAIL!!******");
        return res.status(404).json({ message: "home not found" });
      }
      home.destroy().then(() => {
        console.log("******DELETE api/homes/:id SUCCESS!!******");
        return res.json({
          success: true,
          message: "home successfully deleted!"
        });
      });
    })
    .catch(err => {
      console.log("******DELETE api/:id FAIL!!******");
      return res.status(500).json({ message: "fetch home fail", error: err });
    });
});

export default router;
