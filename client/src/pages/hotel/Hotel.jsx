import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import useFetch from "../../hook/http";
import { SearchContext } from "../../context/SearchContext";
import { MILLISECONDS_PER_DAY } from "../../constants";

const Hotel = () => {
  const location = useLocation();
  const path = location.pathname.split('/')[2]
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);

  const { data, loading } = useFetch(`/hotels/find/${path}`)

  const { dates } = useContext(SearchContext);

  const dayDiff = (date1, date2) => {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY)
    return diffDays;
  }

  console.log('dayDiff', dayDiff(dates[0]?.startDate, dates[1]?.endDate))

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber)
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? 'Loading' : (
        <>
          <div className="hotelContainer">
            {open && (
              <div className="slider">
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className="close"
                  onClick={() => setOpen(false)}
                />
                <FontAwesomeIcon
                  icon={faCircleArrowLeft}
                  className="arrow"
                  onClick={() => handleMove("l")}
                />
                <div className="sliderWrapper">
                  <img src={data?.photos[slideNumber]} alt="" className="sliderImg" />
                </div>
                <FontAwesomeIcon
                  icon={faCircleArrowRight}
                  className="arrow"
                  onClick={() => handleMove("r")}
                />
              </div>
            )}
            <div className="hotelWrapper">
              <button className="bookNow">Reserve or Book Now!</button>
              <h1 className="hotelTitle">Tower Street Apartments</h1>
              <div className="hotelAddress">
                <FontAwesomeIcon icon={faLocationDot} />
                <span>Elton St 125 New york</span>
              </div>
              <span className="hotelDistance">
                Excellent location – 500m from center
              </span>
              <span className="hotelPriceHighlight">
                Book a stay over $114 at this property and get a free airport taxi
              </span>
              <div className="hotelImages">
                {data.photos?.map((photo, i) => (
                  <div className="hotelImgWrapper" key={i}>
                    <img
                      onClick={() => handleOpen(i)}
                      src={photo}
                      alt=""
                      className="hotelImg"
                    />
                  </div>
                ))}
              </div>
              <div className="hotelDetails">
                <div className="hotelDetailsTexts">
                  <h1 className="hotelTitle">Stay in the heart of City</h1>
                  <p className="hotelDesc">
                    Located a 5-minute walk from St. Florian's Gate in Krakow, Tower
                    Street Apartments has accommodations with air conditioning and
                    free WiFi. The units come with hardwood floors and feature a
                    fully equipped kitchenette with a microwave, a flat-screen TV,
                    and a private bathroom with shower and a hairdryer. A fridge is
                    also offered, as well as an electric tea pot and a coffee
                    machine. Popular points of interest near the apartment include
                    Cloth Hall, Main Market Square and Town Hall Tower. The nearest
                    airport is John Paul II International Kraków–Balice, 16.1 km
                    from Tower Street Apartments, and the property offers a paid
                    airport shuttle service.
                  </p>
                </div>
                <div className="hotelDetailsPrice">
                  <h1>Perfect for a 9-night stay!</h1>
                  <span>
                    Located in the real heart of Krakow, this property has an
                    excellent location score of 9.8!
                  </span>
                  <h2>
                    <b>$945</b> (9 nights)
                  </h2>
                  <button>Reserve or Book Now!</button>
                </div>
              </div>
            </div>
            <MailList />
            <Footer />
          </div>
        </>
      )}
    </div>
  );
};

export default Hotel;
