import { themes } from "./index";

export const mapTheme = (variables) => {
    return {
        '--color-primary-a': variables['primary-a'] || '',
        '--color-primary-b': variables['primary-b'] || '',
        '--color-primary-c': variables['primary-c'] || '',

        '--color-secondary-a': variables['secondary-a'] || '',
        '--color-secondary-b': variables['secondary-b'] || '',
        '--color-secondary-c': variables['secondary-c'] || '',
    };
};

export const applyTheme = (theme) => {
    const themeObject = mapTheme(themes[theme]);
    if (!themeObject) return;

    const root = document.documentElement;

    Object.keys(themeObject).forEach((property) => {
        if (property === 'name') {
            return;
        }
        root.style.setProperty(property, themeObject[property]);
    });
};
export const extend = (
    extending,
    newTheme
) => {
    return { ...extending, ...newTheme };
};