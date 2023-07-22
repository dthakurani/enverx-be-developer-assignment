const genericResponse = async (req, res) => {
  const response = {};

  response.statusCode = req.statusCode || 200;
  response.data = req.data || {};
  response.message = req.message || 'OK';

  res.status(response.statusCode).json(response);
  res.end();
};

module.exports = {
  genericResponse
};
