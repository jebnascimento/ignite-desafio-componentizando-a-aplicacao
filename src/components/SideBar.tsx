import { useEffect, useState } from "react";
import { GenreResponseProps } from "../App";
import { api } from "../services/api";
import { Button } from "./Button";

interface ISideBarProps {
  genres: {
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
  }[],
  selectedId: number,
  setSelectedId: ( id: number) => void;
}

export function SideBar({genres, selectedId, setSelectedId}: ISideBarProps ) {

  useEffect(() => {
    api.get<GenreResponseProps>(`genres/${selectedId}`).then(response => {
      setSelectedId(response.data.id);
    })
  }, [selectedId]);

  function handleClickButton(id: number) {
    setSelectedId(id);
  }
  return (
    <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {genres.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => handleClickButton(genre.id)}
              selected={selectedId === genre.id}
            />
          ))}
        </div>
    </nav>
  )
}