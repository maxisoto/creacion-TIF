import Songs from "./Songs";
import Tabs from "./Tabs";
import SideBar from "../components/SideBar";
import { useState } from "react";
import useTheme from "../hooks/useTheme";
import "../styles/sidebar.css";


export default function Home() {
  const { theme } = useTheme();
  const [playlistID, setPlaylistID] = useState(null);
  const [showPlaylistForm, setShowPlaylistForm] = useState(false);
  const [isModifyingPlaylist, setIsModifyingPlaylist] = useState(false);
  const [playlistUpdated, setPlaylistUpdated] = useState(false);

  const handlePlaylistCreate = (showForm) => {
    setShowPlaylistForm(showForm);
  };

  const handleModifyPlaylist = () => {
    setIsModifyingPlaylist(true);
  }

  const handlePlaylistSelect = (id) => {
    setPlaylistID(id);
  }

  return (
    <>
    <div className='containerT'>
      
        <Tabs/>
      </div>
      <div className="columns"
      style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'fit-content'}}
      >
                <div className="column is-narrow ">
                  <SideBar
                    onPlaylistSelect={handlePlaylistSelect}
                    onPlaylistCreate={handlePlaylistCreate}
                    onModifyingPlaylist={handleModifyPlaylist}
                    setPlaylistUpdated={setPlaylistUpdated}  
                  />
                </div>
                 {/* <div className='main-content'> */}
                    <div className='containerDos'>
                        <div className={` ${
                          theme === 'pink'
                          ? 'pinkBackground'
                          : 'blueBackground'
                          }`}>
                          <div className="columns">
                          <Songs/>
                          </div>
                        </div>
                      </div>
                  {/* </div> */}
    
    </div>
    </>
    
  );
}
