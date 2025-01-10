import plugin from "tailwindcss/plugin";
import {
  directions,
  generateDirectionWithColorClasses,
  type TwThemeEntry,
} from "./utils";

const brokenBorder = plugin(
  ({ matchUtilities, theme }) => {
    const colors: TwThemeEntry = theme("colors");
    const classes = generateDirectionWithColorClasses(colors, directions);
    Object.entries(classes).forEach(([key, val]) => {
      matchUtilities(
        {
          [`${key}`]: (value, { modifier }) => {
            const length = value;
            const gap = modifier || theme("brokenGap.default");
            const width: string = theme("brokenWidth");
            return {
              backgroundImage: val.backgroundImage
                .replace(/LENGTH/g, length)
                .replace(/GAP/g, gap),
              backgroundRepeat: val.backgroundRepeat,
              backgroundPosition: val.backgroundPosition,
              backgroundSize: val.backgroundSize.replace(/WIDTH/g, width),
            };
          },
        },
        {
          values: theme("brokenLength"),
          modifiers: theme("brokenGap"),
        },
      );
    });
  },
  {
    theme: {
      brokenLength: {
        DEFAULT: "21px",
        sm: "15px",
        md: "27px",
        lg: "32px",
        xl: "40px",
      },
      brokenGap: {
        default: "16px",
        sm: "12px",
        md: "20px",
        lg: "24px",
        xl: "30px",
      },
      brokenWidth: "2px",
    },
  },
);

export default brokenBorder;
