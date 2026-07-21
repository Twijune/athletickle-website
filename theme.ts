// Theme based on blackturq from omarchy
// Follows pywal16 color format for easy theme swapping

export const colors = {
  // Base colors (0-7)
  color0: '#0a0a0a',  // background (near black)
  color1: '#D35F5F',  // red
  color2: '#8FECD5',  // green (mint)
  color3: '#A9D1D7',  // yellow (light blue)
  color4: '#ADF0E9',  // blue (turquoise - accent)
  color5: '#485362',  // magenta (dark blue-gray)
  color6: '#7cf0ef',  // cyan
  color7: '#646d7a',  // foreground (gray)

  // Bright colors (8-15)
  color8: '#322F3B',  // bright black (dark purple-gray)
  color9: '#D35F5F',  // bright red
  color10: '#8FECD5', // bright green
  color11: '#A9D1D7', // bright yellow
  color12: '#ADF0E9', // bright blue
  color13: '#485362', // bright magenta
  color14: '#7cf0ef', // bright cyan
  color15: '#646d7a', // bright white

  // Additional theme colors
  foreground: '#FFF5EE',  // seashell white
  cursor: '#75dddd',
  accent: '#ADF0E9',
  selectionFg: '#40E0D0',
  selectionBg: '#485362',
};

// Semantic color mapping for the app
export const theme = {
  // Backgrounds
  background: colors.color0,
  backgroundElevated: '#141418', // slightly lighter than color0
  backgroundCard: '#1a1a1f',     // card surfaces
  backgroundAccent: colors.color8,

  // Text
  textPrimary: colors.foreground,
  textSecondary: colors.color7,
  textMuted: colors.color5,
  textInverse: colors.color0,

  // Primary accent (turquoise - used for headers, buttons, links)
  primary: colors.accent,
  primaryLight: colors.color6,

  // Secondary accent
  secondary: colors.color14,
  secondaryLight: colors.cursor,

  // Status colors
  success: colors.color2,        // mint green
  successLight: colors.color10,
  warning: colors.color3,        // light blue (used as yellow)
  warningLight: colors.color11,
  error: colors.color1,          // red
  errorLight: colors.color9,

  // UI elements
  border: colors.color5,
  divider: '#2a2a30',
  inactive: colors.color7,

  // Special
  highlight: colors.color6,      // cyan
  deload: colors.color3,         // light blue for deload weeks
  link: colors.accent,           // turquoise for links

  // Navigation
  tabActive: colors.accent,
  tabInactive: colors.color7,
  headerBackground: colors.color0,
  headerText: colors.foreground,

  // Chips and badges
  chipBackground: colors.color8,
  chipText: colors.foreground,
};

export default theme;
