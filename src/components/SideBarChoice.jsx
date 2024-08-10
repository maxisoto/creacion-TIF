import useTheme from "../hooks/useTheme";
import "../styles/sidebar.css";
function SideBarChoice({title, children, onClick}) {

    const {theme} = useTheme();
    return (
        <>
            <div className={`choice ${
                theme === 'pink'
                ? 'pinkBackground'
                : 'blueBackground'
            }`} onClick={onClick}>
                {children}
                <span>{title}</span>
            </div>
        </>
    )
}

export default SideBarChoice;