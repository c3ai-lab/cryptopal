/** *******************Helper to extract not needed mongo db params******************* */
exports.extractData = (data) => {
  const { _id, __v, ...sendData } = data;
  return sendData;
};
