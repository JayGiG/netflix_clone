import React, {useEffect, useState} from 'react';
import tmdb from './tmdb';
import MovieRow from './components/MovieRow'

export default () => {

  const [movieList, setMovieList] = useState([]);

  //qnd a página for carregada executa a função q estiver dentro do useEffect
  useEffect(() => {
    const loadAll = async () => {
      //pegando a lista total
      let list = await tmdb.getHomeList();
      setMovieList(list);
    }

    loadAll();
  }, []);

  return(
    <div className='page'>
      
      <section className='lists'>
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>

    </div>
  );

}