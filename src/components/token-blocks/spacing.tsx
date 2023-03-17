import "./spacing.css";

interface SpacingScaleItem {
  name: string;
  value: string;
}

interface TypographyProps {
  scale: SpacingScaleItem[];
}

const normalizeSpacingValue = (value: string) => {
  if (value.includes("px")) {
    return Number(value.replace("px", ""));
  }

  if (value.includes("rem")) {
    return Number(value.replace("rem", "")) * 16;
  }

  return Number(value);
};

export const SpacingScale = ({ scale }: TypographyProps) => {
  const sortedScale = scale.sort(
    (a, b) => normalizeSpacingValue(a.value) - normalizeSpacingValue(b.value)
  );

  return (
    <div className="spacing-scale">
      {sortedScale.map(({ name, value }) => (
        <div className="spacing-scale--item">
          <div className="spacing-scale--item--attributes">
            <span className="name">spacing-{name}</span>
            <span>{value}</span>
          </div>
          <div
            className="spacing-scale--item--representative"
            style={{ width: value }}
          ></div>
        </div>
      ))}
    </div>
  );
};
