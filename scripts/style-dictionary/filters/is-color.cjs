const isColor = function (token) {
  return token.attributes.category === "color";
};

module.exports = isColor;
