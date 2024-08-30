const Discount = require("../models/discountModel");

// Controller to add a new payment
exports.addDiscount = (req, res) => {
  const { discountName, rate, date } =
    req.body;

  const newDiscount = new Discount({
    discountName, 
    rate,
    date,
  });

  newDiscount
    .save()
    .then(() => {
      res.json("New Discount Added");
    })
    .catch((err) => {
      console.log(err);
      res.status().json({ error: "Error adding new Discount" });
    });
};

// Controller to get all payments
exports.getAllDiscount = (req, res) => {
    Discount.find()
    .then((Discount) => {
      res.json(Discount);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Error retrieving Discount" });
    });
};

// Controller to update a payment
exports.updateDiscount = async (req, res) => {
  const { discountName, rate, date } =
    req.body;

  const updateDiscount = {
    discountName, 
    rate,
    date,
  };

  try {
    await Discount.findOneAndUpdate(
      { civilID: req.params.civilID },
      updateDiscount
    );
    res.status(200).send({ status: "Discount Updated" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ status: "Error with updating Discount", error: err.message });
  }
};

// Controller to delete a payment
exports.deleteDiscount = (req, res) => {
  Discount.findOneAndDelete({ _id: req.params.id })
    .then(() => {
      res.status(200).send({ status: "Discount Deleted" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Error deleting Discount" });
    });
};

// Controller to get a single payment by ID
exports.getOneDiscount = async (req, res) => {
  const { civilID, emiNumber } = req.body;
  try {
    const Discounts = await Discount.find({ civilID, emiNumber });
    res.json(Discounts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error retrieving Discount" });
  }
};
