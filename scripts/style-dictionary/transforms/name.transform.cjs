module.exports = {
  transformer: (token) => {
    const { category, type, item } = token.attributes;

    return !!item ? `${category}::${type}::${item}` : `${category}::${type}`;
  },
};
