/**
 * All themes, synced with the database.
 * - Do not change keys, as they exist in database.
 * - Can change values.
 */
export const Theme = {
  default: {
    text: 'text-gray-700',
    textLight: 'text-gray-200',
    fill: 'fill-gray-600',
    checkbox: {
      default: {
        border: 'border-gray-300',
        backgroundColor: 'bg-transparent hover:bg-gray-500',
        check: 'fill-gray-600 hover:fill-white',
      },
      checked: {
        border: 'border-gray-200',
        backgroundColor: 'bg-transparent hover:bg-gray-400',
        check: 'fill-white hover:fill-white',
      },
      active: {
        border: 'border-gray-300',
        backgroundColor: 'bg-gray-600 hover:bg-gray-400',
        check: 'fill-white hover:fill-white',
      },
    },
  },
  teal: {
    text: 'text-teal-700',
    textLight: 'text-teal-200',
    fill: 'fill-teal-600',
    checkbox: {
      default: {
        border: 'border-teal-300',
        backgroundColor: 'bg-transparent hover:bg-teal-500',
        check: 'fill-teal-600 hover:fill-white',
      },
      checked: {
        border: 'border-teal-200',
        backgroundColor: 'bg-transparent hover:bg-teal-400',
        check: 'fill-white hover:fill-white',
      },
      active: {
        border: 'border-teal-300',
        backgroundColor: 'bg-teal-600 hover:bg-teal-400',
        check: 'fill-white hover:fill-white',
      },
    },
  },
  lime: {
    text: 'text-lime-700',
    textLight: 'text-lime-200',
    fill: 'fill-lime-600',
    checkbox: {
      default: {
        border: 'border-lime-300',
        backgroundColor: 'bg-transparent hover:bg-lime-500',
        check: 'fill-lime-600 hover:fill-white',
      },
      checked: {
        border: 'border-lime-200',
        backgroundColor: 'bg-transparent hover:bg-lime-400',
        check: 'fill-white hover:fill-white',
      },
      active: {
        border: 'border-lime-300',
        backgroundColor: 'bg-lime-600 hover:bg-lime-400',
        check: 'fill-white hover:fill-white',
      },
    },
  },
  orange: {
    text: 'text-orange-700',
    textLight: 'text-orange-200',
    fill: 'fill-orange-600',
    checkbox: {
      default: {
        border: 'border-orange-300',
        backgroundColor: 'bg-transparent hover:bg-orange-500',
        check: 'fill-orange-600 hover:fill-white',
      },
      checked: {
        border: 'border-orange-200',
        backgroundColor: 'bg-transparent hover:bg-orange-400',
        check: 'fill-white hover:fill-white',
      },
      active: {
        border: 'border-orange-300',
        backgroundColor: 'bg-orange-600 hover:bg-orange-400',
        check: 'fill-white hover:fill-white',
      },
    },
  },
  pink: {
    text: 'text-pink-700',
    textLight: 'text-pink-200',
    fill: 'fill-pink-600',
    checkbox: {
      default: {
        border: 'border-pink-300',
        backgroundColor: 'bg-transparent hover:bg-pink-500',
        check: 'fill-pink-600 hover:fill-white',
      },
      checked: {
        border: 'border-pink-200',
        backgroundColor: 'bg-transparent hover:bg-pink-400',
        check: 'fill-white hover:fill-white',
      },
      active: {
        border: 'border-pink-300',
        backgroundColor: 'bg-pink-600 hover:bg-pink-400',
        check: 'fill-white hover:fill-white',
      },
    },
  },
  blue: {
    text: 'text-blue-700',
    textLight: 'text-blue-200',
    fill: 'fill-blue-600',
    checkbox: {
      default: {
        border: 'border-blue-300',
        backgroundColor: 'bg-transparent hover:bg-blue-500',
        check: 'fill-blue-600 hover:fill-white',
      },
      checked: {
        border: 'border-blue-200',
        backgroundColor: 'bg-transparent hover:bg-blue-400',
        check: 'fill-white hover:fill-white',
      },
      active: {
        border: 'border-blue-300',
        backgroundColor: 'bg-blue-600 hover:bg-blue-400',
        check: 'fill-white hover:fill-white',
      },
    },
  },
  violet: {
    text: 'text-violet-700',
    textLight: 'text-violet-200',
    fill: 'fill-violet-600',
    checkbox: {
      default: {
        border: 'border-violet-300',
        backgroundColor: 'bg-transparent hover:bg-violet-500',
        check: 'fill-violet-600 hover:fill-white',
      },
      checked: {
        border: 'border-violet-200',
        backgroundColor: 'bg-transparent hover:bg-violet-400',
        check: 'fill-white hover:fill-white',
      },
      active: {
        border: 'border-violet-300',
        backgroundColor: 'bg-violet-600 hover:bg-violet-400',
        check: 'fill-white hover:fill-white',
      },
    },
  },
} as const;

export type ThemeType = typeof Theme;

export type ThemeTypeKeys = keyof ThemeType;

export type ThemeTypeValue = ThemeType[ThemeTypeKeys];

export const themes = Object.keys(Theme) as ThemeTypeKeys[] as [ThemeTypeKeys, ...ThemeTypeKeys[]];
