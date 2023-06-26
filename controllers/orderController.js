const connection = require('../sql');

const orderDetail = async (req, res) => {
  // Query to retrieve the total quantities, total weight, and total box count for each customer
  const query = `
    SELECT 
        userId,
        SUM(quantity) AS total_quantity,
        SUM(weight) AS total_weight,
        SUM(boxCount) AS total_box_count
    FROM
        \`order_table\`
    GROUP BY userId;
  `;

  // Execute the query
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing the query:', err);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      // Send the results as a response

      res.json(results);
    }
  });
};

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
  orderDetail,
};
