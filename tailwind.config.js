const defaultTheme = require("tailwindcss/defaultTheme");

const colorWithOpacity = (variable) => {
  return ({ opacityValue }) =>
    opacityValue !== undefined
      ? `oklch(var(${variable}) / ${opacityValue})`
      : `oklch(var(${variable}))`;
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        border: colorWithOpacity("--border"),
        input: colorWithOpacity("--input"),
        ring: colorWithOpacity("--ring"),
        background: colorWithOpacity("--background"),
        foreground: colorWithOpacity("--foreground"),
        card: colorWithOpacity("--card"),
        "card-foreground": colorWithOpacity("--card-foreground"),
        popover: colorWithOpacity("--popover"),
        "popover-foreground": colorWithOpacity("--popover-foreground"),
        primary: colorWithOpacity("--primary"),
        "primary-foreground": colorWithOpacity("--primary-foreground"),
        secondary: colorWithOpacity("--secondary"),
        "secondary-foreground": colorWithOpacity("--secondary-foreground"),
        muted: colorWithOpacity("--muted"),
        "muted-foreground": colorWithOpacity("--muted-foreground"),
        accent: colorWithOpacity("--accent"),
        "accent-foreground": colorWithOpacity("--accent-foreground"),
        destructive: colorWithOpacity("--destructive"),
        "destructive-foreground": colorWithOpacity(
          "--destructive-foreground",
        ),
        "input-background": colorWithOpacity("--input-background"),
        "switch-background": colorWithOpacity("--switch-background"),
        "chart-1": colorWithOpacity("--chart-1"),
        "chart-2": colorWithOpacity("--chart-2"),
        "chart-3": colorWithOpacity("--chart-3"),
        "chart-4": colorWithOpacity("--chart-4"),
        "chart-5": colorWithOpacity("--chart-5"),
        sidebar: colorWithOpacity("--sidebar"),
        "sidebar-foreground": colorWithOpacity("--sidebar-foreground"),
        "sidebar-primary": colorWithOpacity("--sidebar-primary"),
        "sidebar-primary-foreground": colorWithOpacity(
          "--sidebar-primary-foreground",
        ),
        "sidebar-accent": colorWithOpacity("--sidebar-accent"),
        "sidebar-accent-foreground": colorWithOpacity(
          "--sidebar-accent-foreground",
        ),
        "sidebar-border": colorWithOpacity("--sidebar-border"),
        "sidebar-ring": colorWithOpacity("--sidebar-ring"),
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 4px)",
      },
      fontFamily: {
        sans: ["'Space Grotesk'", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
