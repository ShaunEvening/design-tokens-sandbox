import React from "react";
import "./typography.css";

interface FontAttributes {
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
}

interface FontScaleItem {
  name: string;
  attributes: FontAttributes;
}

interface TypographyProps {
  family: string;
  scale: FontScaleItem[];
  sampleText: string;
  fontWeight: number;
}

const parseFontSizeToNumber = (fontSize: string) =>
  Number(fontSize.replace("rem", "").replace("px", ""));

export const Typography = ({
  family,
  scale,
  sampleText,
  fontWeight,
}: TypographyProps) => {
  const sortedScale = scale.sort(
    (a, b) =>
      parseFontSizeToNumber(b.attributes.fontSize) -
      parseFontSizeToNumber(a.attributes.fontSize)
  );

  return (
    <div className="typography-set">
      {sortedScale.map(({ name, attributes }) => (
        <div className="typography-set--item">
          <div className="typography-set--item--attributes">
            <span className="name">text-{name}</span>
            <span>{attributes.fontSize}</span>
          </div>
          <p style={{ ...attributes, fontWeight, fontFamily: family }}>
            {sampleText}
          </p>
        </div>
      ))}
    </div>
  );
};
