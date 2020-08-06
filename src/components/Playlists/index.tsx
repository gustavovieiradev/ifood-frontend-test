import React from 'react';
import { IPlaylist } from '../../models';

import { Playlist } from './styles';

interface IPlaylistsProps {
  data: IPlaylist[];
}

const Playlists: React.FC<IPlaylistsProps> = ({ data }) => {
  return (
    <Playlist>
      {data.map((playlist, key) => (
        <a key={key}>
          <img src={playlist.images[0].url} alt={playlist.name} />
          <div>
            <strong>{playlist.name}</strong>
            <p>{playlist.description}</p> 
          </div>
        </a>
      ))}
    </Playlist>
  )
}

export default Playlists;