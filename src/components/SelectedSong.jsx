import { useState } from "react";
import Songs from "./Songs";

export default function SelectedSong({ onSelectSong }) {
    const [ selectedSongID, setSelectedSongID ] = useState(null);

    const handleClick = (songID) => {
        setSelectedSongID(songID);
        onSelectSong(songID);
    };

    return (
        <Songs onSelectSong={handleClick}/>
    )
}