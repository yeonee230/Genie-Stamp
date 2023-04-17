export const getBoard = (req, res) => {
  res.render("home", { pageTitle: "칭찬도장판" });
};

export const getStats = (req, res) => {
    res.render("stats", { pageTitle: "통계" });
  };
  
