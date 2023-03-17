const colorsToStoryFormatter = require("./style-dictionary/formats/stories.colors.cjs");
const typographyToStoryFormatter = require("./style-dictionary/formats/stories.typography.cjs");
const spacingScaleToStoryFormatter = require("./style-dictionary/formats/stories.spacing.cjs");

const isColorFilter = require("./style-dictionary/filters/is-color.cjs");
const isFontFilter = require("./style-dictionary/filters/font-category.cjs");
const isSpacingFilter = require("./style-dictionary/filters/spacing.cjs");

const remOrPxTransform = require("./style-dictionary/transforms/rem-or-px.transform.cjs");
const separatorNameTransform = require("./style-dictionary/transforms/name.transform.cjs");
const fontSizeTransform = require("./style-dictionary/transforms/font-size.transform.cjs");

const StyleDictionary = require("style-dictionary").extend(
  "./style-dictionary.config.json"
);

// Register Formats
StyleDictionary.registerFormat({
  name: "stories/colors",
  formatter: colorsToStoryFormatter,
});
StyleDictionary.registerFormat({
  name: "stories/typography",
  formatter: typographyToStoryFormatter,
});
StyleDictionary.registerFormat({
  name: "stories/spacing",
  formatter: spacingScaleToStoryFormatter,
});

// Register Filters
StyleDictionary.registerFilter({
  name: "category/color",
  matcher: isColorFilter,
});

StyleDictionary.registerFilter({
  name: "category/font",
  matcher: isFontFilter,
});

StyleDictionary.registerFilter({
  name: "type/spacing",
  matcher: isSpacingFilter,
});

StyleDictionary.registerTransform({
  name: "value/rem-or-px",
  type: "value",
  matcher: remOrPxTransform.matcher,
  transformer: remOrPxTransform.transformer,
});

StyleDictionary.registerTransform({
  name: "name/cti/separators",
  type: "name",
  transformer: separatorNameTransform.transformer,
});

StyleDictionary.registerTransform({
  name: "value/font-size",
  type: "value",
  matcher: fontSizeTransform.matcher,
  transformer: fontSizeTransform.transformer,
});

// Register Transforms
StyleDictionary.registerTransformGroup({
  name: "storybook",
  transforms: [
    "attribute/cti",
    "name/cti/separators",
    "value/rem-or-px",
    "value/font-size",
  ],
});

StyleDictionary.buildAllPlatforms();
