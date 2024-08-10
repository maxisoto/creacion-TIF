import { useThemeContext } from "../contexts/ThemeContext";
import "../styles/themebutton.css"

function ToggleTheme() {

    const { theme, toggleTheme } = useThemeContext();

    return (
        <div className="theme">
            <button onClick={toggleTheme}> {theme === 'pink' ? <i className="fa fa-regular fa-sun"></i> : <i className="fa fa-regular fa-moon"></i>}</button>
        </div>
    )
}

export default ToggleTheme;