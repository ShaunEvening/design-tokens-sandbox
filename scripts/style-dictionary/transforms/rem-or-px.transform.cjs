module.exports = {
  matcher: (token) => token.attributes.category === "size",
  transformer: (token) => {
    return token.name.includes("px") ? `${token.value}px` : `${token.value}rem`;
  },
};
