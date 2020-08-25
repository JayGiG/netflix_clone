import React, {useEffect, useState} from 'react';
import tmdb from './tmdb';
import MovieRow from './components/MovieRow'
import FeaturedMovie from './components/FeaturedMovie'

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null)

  //qnd a página for carregada executa a função q estiver dentro do useEffect
  useEffect(() => {
    const loadAll = async () => {

      //pegando a lista total
      let list = await tmdb.getHomeList();
      setMovieList(list);

      //pegando o featured
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await tmdb.getMovieInfo(chosen.id, 'tv' )

      // console.log(chosenInfo)

      setFeaturedData(chosenInfo)


    }

    loadAll();
  }, []);

  return(
    <div className='page'>

      {featuredData &&
         <FeaturedMovie item={featuredData} />
      }
     
      
      <section className='lists'>
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>

    </div>
  );

}