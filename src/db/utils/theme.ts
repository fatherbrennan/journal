/**
 * All themes, synced with the database.
 * - Do not change keys, as they exist in database.
 * - Can change values.
 */
export const Theme = {
  default: {
    text: 'text-gray-700',
    checkbox: {
      default: {
        border: 'border-gray-300',
        backgroundColor: 'bg-gray-700',
        check: 'fill-gray-600',
        hover: {
          backgroundColor: 'hover:bg-gray-500',
          check: 'hover:fill-white',
        },
      },
      checked: {
        border: 'border-gray-400',
        backgroundColor: 'bg-gray-700',
        check: 'fill-white',
        hover: {
          backgroundColor: 'hover:bg-gray-400',
          check: 'hover:fill-white',
        },
      },
    },
  },
  teal: {
    text: 'text-teal-700',
    checkbox: {
      default: {
        border: 'border-teal-300',
        backgroundColor: 'bg-teal-700',
        check: 'fill-teal-600',
        hover: {
          backgroundColor: 'hover:bg-teal-500',
          check: 'hover:fill-white',
        },
      },
      checked: {
        border: 'border-teal-400',
        backgroundColor: 'bg-teal-700',
        check: 'fill-white',
        hover: {
          backgroundColor: 'hover:bg-teal-400',
          check: 'hover:fill-white',
        },
      },
    },
  },
  lime: {
    text: 'text-lime-700',
    checkbox: {
      default: {
        border: 'border-lime-300',
        backgroundColor: 'bg-lime-700',
        check: 'fill-lime-600',
        hover: {
          backgroundColor: 'hover:bg-lime-500',
          check: 'hover:fill-white',
        },
      },
      checked: {
        border: 'border-lime-400',
        backgroundColor: 'bg-lime-700',
        check: 'fill-white',
        hover: {
          backgroundColor: 'hover:bg-lime-400',
          check: 'hover:fill-white',
        },
      },
    },
  },
  orange: {
    text: 'text-orange-700',
    checkbox: {
      default: {
        border: 'border-orange-300',
        backgroundColor: 'bg-orange-700',
        check: 'fill-orange-600',
        hover: {
          backgroundColor: 'hover:bg-orange-500',
          check: 'hover:fill-white',
        },
      },
      checked: {
        border: 'border-orange-400',
        backgroundColor: 'bg-orange-700',
        check: 'fill-white',
        hover: {
          backgroundColor: 'hover:bg-orange-400',
          check: 'hover:fill-white',
        },
      },
    },
  },
  red: {
    text: 'text-red-700',
    checkbox: {
      default: {
        border: 'border-red-300',
        backgroundColor: 'bg-red-700',
        check: 'fill-red-600',
        hover: {
          backgroundColor: 'hover:bg-red-500',
          check: 'hover:fill-white',
        },
      },
      checked: {
        border: 'border-red-400',
        backgroundColor: 'bg-red-700',
        check: 'fill-white',
        hover: {
          backgroundColor: 'hover:bg-red-400',
          check: 'hover:fill-white',
        },
      },
    },
  },
  pink: {
    text: 'text-pink-700',
    checkbox: {
      default: {
        border: 'border-pink-300',
        backgroundColor: 'bg-pink-700',
        check: 'fill-pink-600',
        hover: {
          backgroundColor: 'hover:bg-pink-500',
          check: 'hover:fill-white',
        },
      },
      checked: {
        border: 'border-pink-400',
        backgroundColor: 'bg-pink-700',
        check: 'fill-white',
        hover: {
          backgroundColor: 'hover:bg-pink-400',
          check: 'hover:fill-white',
        },
      },
    },
  },
  violet: {
    text: 'text-violet-700',
    checkbox: {
      default: {
        border: 'border-violet-300',
        backgroundColor: 'bg-violet-700',
        check: 'fill-violet-600',
        hover: {
          backgroundColor: 'hover:bg-violet-500',
          check: 'hover:fill-white',
        },
      },
      checked: {
        border: 'border-violet-400',
        backgroundColor: 'bg-violet-700',
        check: 'fill-white',
        hover: {
          backgroundColor: 'hover:bg-violet-400',
          check: 'hover:fill-white',
        },
      },
    },
  },
} as const;

export type ThemeType = typeof Theme;

export type ThemeTypeKeys = keyof ThemeType;

export type ThemeTypeValue = ThemeType[ThemeTypeKeys];

export const themes = Object.keys(Theme) as ThemeTypeKeys[] as [ThemeTypeKeys, ...ThemeTypeKeys[]];
