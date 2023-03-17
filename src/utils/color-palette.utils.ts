import {
  BackgroundColor,
  Color,
  Theme,
  // @ts-expect-error
} from "@adobe/leonardo-contrast-colors";

const DEFAULT_CONTRAST_TARGETS = [
  1.08, 1.2, 1.33, 1.58, 1.92, 2.39, 3.01, 3.87, 5.07, 6.72, 8.84, 11.31, 13.94,
];

type ColorScale = Record<string, string>;
interface ColorScaleDefinition {
  name: string;
  values: {
    name: string;
    value: string;
  }[];
}

const flattenColors = (scaleValues: ColorScaleDefinition["values"]) =>
  scaleValues.reduce((map, { name, value }) => ({ ...map, [name]: value }), {});

export function generateColorPalette(
  backgroundColor: string,
  colors: Record<string, string>,
  targetRatios: number[] = DEFAULT_CONTRAST_TARGETS
) {
  const bg = new BackgroundColor({
    name: "white",
    colorKeys: [backgroundColor],
    ratios: targetRatios,
  });

  const paletteColors = Object.entries(colors).map(
    ([name, value]) =>
      new Color({
        name,
        colorKeys: [value],
        ratios: targetRatios,
      })
  );

  const theme = new Theme({
    colors: paletteColors,
    backgroundColor: bg,
    lightness: 97,
  }).contrastColors;

  const [bgColor, ...otherColors] = theme as [
    { background: string },
    ...ColorScaleDefinition[]
  ];

  const otherColorMap = otherColors.reduce(
    (
      colorMap: Record<string, ColorScale>,
      { name: id, values }: ColorScaleDefinition
    ) => ({
      ...colorMap,
      [id]: flattenColors(values),
    }),
    {} as Record<string, ColorScale>
  );

  return {
    background: {
      pure: backgroundColor,
      surface: bgColor.background,
    },
    ...otherColorMap,
  };
}
