export interface DirectionProperties {
  backgroundImage: string;
  backgroundPosition: string;
  backgroundRepeat: string;
  backgroundSize: string;
}
interface Directions {
  [key: string]: DirectionProperties;
}
// Since broken borders are just blocks, specify each property for each direction
// just add them together for the dirs that we want
const baseDirections: Directions = {
  t: {
    backgroundImage: `repeating-linear-gradient(90deg, COLOR, COLOR LENGTH, transparent LENGTH, transparent calc(GAP + LENGTH))`,
    backgroundPosition: "left top",
    backgroundRepeat: "repeat-x",
    backgroundSize: "100% WIDTH",
  },
  b: {
    backgroundImage: `repeating-linear-gradient(90deg, COLOR, COLOR LENGTH, transparent LENGTH, transparent calc(GAP + LENGTH))`,
    backgroundPosition: "left bottom",
    backgroundRepeat: "repeat-x",
    backgroundSize: "100% WIDTH",
  },
  l: {
    backgroundImage: `repeating-linear-gradient(180deg, COLOR, COLOR LENGTH, transparent LENGTH, transparent calc(GAP + LENGTH))`,
    backgroundPosition: "left top",
    backgroundRepeat: "repeat-y",
    backgroundSize: "WIDTH 100%",
  },
  r: {
    backgroundImage: `repeating-linear-gradient(180deg, COLOR, COLOR LENGTH, transparent LENGTH, transparent calc(GAP + LENGTH))`,
    backgroundPosition: "right top",
    backgroundRepeat: "repeat-y",
    backgroundSize: "WIDTH 100%",
  },
};
type DirectionPropertyKey = keyof DirectionProperties;

function combineDirs(first: DirectionProperties): DirectionProperties;
function combineDirs(
  first: DirectionProperties,
  second: DirectionProperties,
): DirectionProperties;
function combineDirs(...directions: DirectionProperties[]): DirectionProperties;

function combineDirs(
  ...directions: DirectionProperties[]
): DirectionProperties {
  const combined = directions.reduce(
    (combined, direction) => {
      (Object.keys(combined) as DirectionPropertyKey[]).forEach((key) => {
        const val: string = combined[key];
        if (val === "") {
          combined[key] = direction[key];
        } else {
          combined[key] += `, ${direction[key]}`;
        }
      });
      return combined;
    },
    {
      backgroundRepeat: "",
      backgroundPosition: "",
      backgroundImage: "",
      backgroundSize: "",
    } as DirectionProperties,
  );

  (Object.keys(combined) as DirectionPropertyKey[]).forEach((key) => {
    combined[key] += ";";
  });
  return combined;
}
export const directions: Directions = {
  default: combineDirs(
    baseDirections.t,
    baseDirections.b,
    baseDirections.l,
    baseDirections.r,
  ),
  t: combineDirs(baseDirections.t),
  b: combineDirs(baseDirections.b),
  l: combineDirs(baseDirections.l),
  r: combineDirs(baseDirections.r),
  y: combineDirs(baseDirections.t, baseDirections.b),
  x: combineDirs(baseDirections.l, baseDirections.r),
  yl: combineDirs(baseDirections.t, baseDirections.b, baseDirections.l),
  yr: combineDirs(baseDirections.r, baseDirections.b, baseDirections.r),
  xt: combineDirs(baseDirections.l, baseDirections.r, baseDirections.t),
  xb: combineDirs(baseDirections.l, baseDirections.r, baseDirections.b),
};

//Replace placeholder values in TYPE Directions
export const replacePlaceholderStyle = (
  styles: DirectionProperties,
  placeholder: RegExp,
  injectedStyle: string,
) => {
  return Object.fromEntries(
    Object.entries(styles).map(([key, val]) => [
      key,
      val.replace(placeholder, injectedStyle),
    ]),
  );
};

// Replace shitty tailwind provided types with others that make actual sense
interface Entry {
  [key: string]: string;
}
interface ObjectEntry {
  [key: string]: Entry;
}
export type TwThemeEntry = Entry | ObjectEntry;

//generate first pass with all color classes for example .broken-x-red-500
export const generateDirectionWithColorClasses = (
  colors: TwThemeEntry,
  directions: Directions,
): Directions => {
  // Dear god save us, I can barely read this
  const obj = Object.entries(directions).flatMap(([dirKey, dirVal]) => {
    return Object.entries(colors).flatMap(
      ([colorKey, colorVal]: [colorKey: string, colorVal: string | Entry]) => {
        if (typeof colorVal === "string") {
          if (dirKey === "default") {
            return {
              [`broken-${colorKey}`]: replacePlaceholderStyle(
                dirVal,
                /COLOR/g,
                colorVal,
              ),
            };
          }
          return {
            [`broken-${dirKey}-${colorKey}`]: replacePlaceholderStyle(
              dirVal,
              /COLOR/g,
              colorVal,
            ),
          };
        }
        return Object.entries(colorVal).flatMap(([shadeKey, shadeVal]) => {
          if (dirKey === "default") {
            return {
              [`broken-${colorKey}-${shadeKey}`]: replacePlaceholderStyle(
                dirVal,
                /COLOR/g,
                shadeVal,
              ),
            };
          }
          return {
            [`broken-${dirKey}-${colorKey}-${shadeKey}`]:
              replacePlaceholderStyle(dirVal, /COLOR/g, shadeVal),
          };
        });
      },
    );
  });
  //Technically slower but speed doesn't matter here it's just easier this way
  return obj.reduce((acc, curr) => {
    return { ...acc, ...curr };
  }, {});
};

