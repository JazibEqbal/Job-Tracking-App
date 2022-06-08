const notFoundMiddleware = (req, res) => {
  res.status(404).send("Does not exist");
};
 export default notFoundMiddleware;
 