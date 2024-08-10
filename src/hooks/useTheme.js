import { useThemeContext } from "../contexts/ThemeContext";

const useTheme = () => {
    const { theme, toggleTheme } = useThemeContext();

    if (theme === undefined || toggleTheme === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }

    return { theme, toggleTheme };
};

export default useTheme;
