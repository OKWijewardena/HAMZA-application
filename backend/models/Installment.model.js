router.route("/paymentHistory").get(async (req, res) => {
    const civiID = req.query.civiID; // Use req.query to get the civiID from the query parameters
  
    try {
      const selling = await Selling.findOne({ civiID: civiID });
  
      if (!selling) {
        return res.status(404).json({ message: "Selling record not found" });
      }
  
      console.log("Selling.customArray: ", selling.customArray); // Log the customArray to check its structure
  
      const transformedArray = selling.customArray.map(item => {
        console.log("Current item: ", item); // Log the current item
        return {
          date: item.date, // Make sure "date" is the correct key
          price: item.price, // Make sure "price" is the correct key
          status: item.status,
          _id: item._id
        };
      });
  
      console.log("Transformed Array: ", transformedArray); // Log the transformed array
  
      res.json(transformedArray); // Send the transformed array as the response
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });