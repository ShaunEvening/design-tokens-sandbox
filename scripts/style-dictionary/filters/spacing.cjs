const isSpacing = function (token) {
  return token.attributes.type === "spacing";
};

module.exports = isSpacing;
