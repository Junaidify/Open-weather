import {} from 'react'
import { useFetch } from '../hooks/useFetch'
import { useSelector } from 'react-redux';

const Favourite = () => {
    useFetch(`http://localhost:3000/cities`);
    const { isLoading, isError, data } = useSelector((state) => state.fetch);

    if(isLoading) return <h1>Loading...</h1>;
    if(isError) return <h1>Error</h1>;

  return (
    <div>
      <h1>Favourite</h1>
      <div>
        {data.map((city) => (
          <div key={city.id}>
            <h2>{city.city}</h2>
            <p>{city.country}</p>
          </div>
        ))}
      </div>
      
    </div>
  )
}

export default Favourite
