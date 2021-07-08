export const getSismos = (req, res) => {
  try {
    res.status(200).json({
      msg: "API funcionando",
    });
  } catch (error) {
    console.log(error);
    res.json({
      msg: error,
    });
  }
};
