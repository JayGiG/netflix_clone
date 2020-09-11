import React from 'react';
import './style.css';

export default ({item}) => {

    // Formatando data
    let firstDate = new Date(item.first_air_date);

    // Genero vem como um objeto, pega ele e joga dentro de um array
    //pra poder pegar só o nome usando um join pra exibir as informações
    let genres = [];
    for(let i in item.genres){
        genres.push(item.genres[i].name);
    }   

    //limitando o tamanho do texto da descrição
    let description = item.overview
    if(description.length > 200){
        description = description.substring(0, 200) + '...';
    }


    return (
        <section className='featured' style={{
            backgroundSize:'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`

        }}>
            
            <div className='featured--vertical'>
                <div className='featured--horizontal'>
                    <div className='featured--name'>{item.original_name}</div>
                    <div className='featured--info'>
                        <div className='featured--points'>{item.vote_average} pontos</div>
                        <div className='featured--year'>{firstDate.getFullYear
                        ()}</div>
                        <div className='featured--seasons'>{item.number_of_seasons} temporada{item.number_of_seasons !== 1 ? 's' : '' }</div>
                    </div>

                    <div className='featured--description'>{description}</div>
                    <div className='featured--buttons'>
                        <a href={`/watch/${item.id}`} className="featured--watchButton">Assistir</a>
                        <a href={`/list/add/${item.id}`} className="featured--myListButton">+ Minha Lista</a>
                    </div>
                    <div className='featured--genres'><strong>Gêneros: </strong>{genres.join(', ')}</div>

                </div>
            </div>

        </section>
        
    )
}

