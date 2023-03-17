const generateMDX = ({ options, colorGroups }) =>
  `{/* This file is automatically generated. Do not edit directly */}
import { Meta, ColorPalette, ColorItem } from '@storybook/blocks';

<Meta title="Tokens/${options.title}" />

# ${options.title}
${options.description ?? ""}

## Raw Palette

<ColorPalette>
${colorGroups
  .map(
    ({ title, description, values }) =>
      `  <ColorItem title="${title}" subtitle="${description}" colors={${JSON.stringify(
        values
      )}} />`
  )
  .join("\n")}
</ColorPalette>
`;

function formatColorTokensAsStory({ dictionary, platform, options, file }) {
  const colorGroups = Object.entries(dictionary.tokens.color).map(
    ([name, colors]) => ({
      title: name,
      description: `colors.${name}`,
      values: colors.value
        ? { [name]: colors.value }
        : Object.entries(colors).reduce(
            (built, [name, color]) => ({
              ...built,
              [name]: color.value,
            }),
            {}
          ),
    })
  );

  return generateMDX({ options, colorGroups });
}

module.exports = formatColorTokensAsStory;
