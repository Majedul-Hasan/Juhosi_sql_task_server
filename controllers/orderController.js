const connection = require('../sql');

const addOrder = async (req, res) => {
  const user_id = req.decoded.user_id;

  const {
    date,
    company,
    owner,
    item,
    quantity,
    shipment,
    weight,
    trackingId,
    shipmentSize,
    boxCount,
    specification,
    chaklistQuantity,
  } = req.body;

  const data = {
    date,
    company,
    owner: owner,
    item: parseInt(item),
    quantity: parseInt(quantity),
    shipment: shipment,
    weight: parseFloat(weight),
    trackingId: trackingId,
    shipmentSize,
    boxCount: parseInt(boxCount),
    specification,
    chaklistQuantity,
    userId: user_id,
  };

  console.log(data);

  connection.query('INSERT INTO order_table SET ?', data, (err, result) => {
    if (err) {
      console.error('Error inserting form data:', err);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      console.log('Form data inserted successfully');
      res.json({ message: 'Form submitted successfully' });
    }
  });
};

module.exports = {
  addOrder,
};
