import React, {useEffect, useState} from 'react';
import './App.css'
import tmdb from './tmdb';
import MovieRow from './components/MovieRow'
import FeaturedMovie from './components/FeaturedMovie'
import Header from './components/Header'

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null)
  const [blackHeader, setBlackHeader] = useState(false)

  //qnd a página for carregada executa a função q estiver dentro do useEffect
  useEffect(() => {
    const loadAll = async () => {

      //pegando a lista total
      let list = await tmdb.getHomeList();
      setMovieList(list);

      //pegando o featured
      let originals = list.filter(i=>i.slug === 'originals');
      let randonChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randonChosen];
      let chosenInfo = await tmdb.getMovieInfo(chosen.id, 'tv' )

      // console.log(chosenInfo)

      setFeaturedData(chosenInfo)


    }

    loadAll();
  }, []);

  //Monitorando o scroll da página para definir a cor do header
  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 20){
        setBlackHeader(true)
      }else{
        setBlackHeader(false)
      }
    }

    //quando na tela tiver qualquer evento de scroll ele vai rodar a função scroll listener
    window.addEventListener('scroll', scrollListener);

    //removendo o evento ao sair da página
    return() => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])

  return(
    <div className="page">

      <Header black={blackHeader} />

      {featuredData &&
         <FeaturedMovie item={featuredData} />
      }
     
      
      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items}></MovieRow>
        ))}
      </section>

      <footer>
        <h4>Desenvolvido por <a href="https://github.com/JayGiG"  target="_blank">Janiele Nogueira</a> </h4> 
        <h4>Direitos de imagem para Netflix</h4>
        <h4>Dados coletados do site <a href="https://www.themoviedb.org/?language=pt-BR" target="_blank">Themoviedb.org</a> </h4>
        
      </footer>


      {movieList.length <= 0 && 
        <div className="loading">
          <img src="https://cdn.lowgif.com/full/ce629026a12a85a7-the-tech-behind-netflix-s-worldwide-expansion-is-a-big-deal-for-the.gif"></img>
        </div>  
      }
    </div>
  );

}