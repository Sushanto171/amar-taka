// tailwind.config.ts
import defaultTheme from "tailwindcss/defaultTheme";

export const tailwindConfig = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Manrope", ...defaultTheme.fontFamily.sans],
        noto: ["Noto Sans", ...defaultTheme.fontFamily.sans],
      },
    },
  },
};
