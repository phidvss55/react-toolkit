import { useNavigate } from "react-router-dom";
import useFetch from "../../hook/http";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const navigate = useNavigate();
  const { error, data, loading } = useFetch('/hotels?featured=true&limit=4')
  const hotels = data.data || []

  if (error) {
    return 'Error'
  }

  const navigateToItem = (item) => {
    navigate(`/hotels/${item._id}`)
  }

  return (
    <div className="fp">
      {loading ? ( 'Loading' ) : (
        <>
          {hotels.map((item) => (
            <div className="fpItem hand" key={item._id} onClick={() => navigateToItem(item)}>
              <img
                src={item.photos[0]}
                alt=""
                className="fpImg"
              />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
              {item.rating && (
                <div className="fpRating">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}

    </div>
  );
};

export default FeaturedProperties;
