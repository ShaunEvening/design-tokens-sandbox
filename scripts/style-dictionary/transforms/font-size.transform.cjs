module.exports = {
  matcher: ({ attributes }) =>
    attributes.category === "font" && attributes.type === "size",
  transformer: ({ value }) => `${value}rem`,
};
