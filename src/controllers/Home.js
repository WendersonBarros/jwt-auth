module.exports = {
  homePage: (req, res) => {
    return res
      .status(200)
      .send("Your token has been successfully validated and you are on the home page")
  }
};
