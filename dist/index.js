"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const plugin_1 = __importDefault(require("tailwindcss/plugin"));
const utils_1 = require("./utils");
const brokenBorder = (0, plugin_1.default)(({ matchUtilities, theme }) => {
    const colors = theme("colors");
    const classes = (0, utils_1.generateDirectionWithColorClasses)(colors, utils_1.directions);
    Object.entries(classes).forEach(([key, val]) => {
        matchUtilities({
            [`${key}`]: (value, { modifier }) => {
                const length = value;
                const gap = modifier || theme("brokenGap.default");
                const width = theme("brokenWidth");
                return {
                    backgroundImage: val.backgroundImage
                        .replace(/LENGTH/g, length)
                        .replace(/GAP/g, gap),
                    backgroundRepeat: val.backgroundRepeat,
                    backgroundPosition: val.backgroundPosition,
                    backgroundSize: val.backgroundSize.replace(/WIDTH/g, width),
                };
            },
        }, {
            values: theme("brokenLength"),
            modifiers: theme("brokenGap"),
        });
    });
}, {
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
});
exports.default = brokenBorder;
//# sourceMappingURL=index.js.map