import './styles/global.scss';
import './styles/sidebar.scss';
import './styles/content.scss';

import { useEffect, useState } from 'react';

import { SideBar } from './components/SideBar';
import { Header } from './components/Header';
import { Content, MovieProps } from './components/Content';

import { api } from './services/api';

export interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export function App() {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar genres={genres} selectedId={selectedGenreId} setSelectedId={(id) => setSelectedGenreId(id)} />
      <div className="container">
        <Header category={selectedGenre.title} />
        <Content movies={movies} />
      </div>
    </div>
  )
}