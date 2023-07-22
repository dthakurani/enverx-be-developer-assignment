const findAllUser = async (req, res, next) => {
  const receivedData = req.data || {};
  let resultData;
  if (receivedData) {
    const users = [];
    receivedData.users.forEach(user => {
      users.push({
        id: user.id,
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        created_at: user.created_at
      });
    });
    resultData = { total: receivedData.total, page: receivedData.page, limit: receivedData.limit, users };
  }
  req.data = resultData;
  next();
};

module.exports = {
  findAllUser
};
