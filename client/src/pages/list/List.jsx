import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hook/http";
import { useEffect } from "react";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state?.destination || '');
  const [dates, setDates] = useState(location.state ? location.state.dates : []);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state ? location.state.options : {});
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const [results, setResults] = useState([]);

  const { data, loading, refetch } = useFetch(`/hotels?city=${destination}&min=${min || 0}$max=${max || 1000000}`)
  useEffect(() => {
    setResults(data?.data || [])
  }, [data])

  const handleClickSearch = () => {
    refetch();
  }

  return (
    <div>
      <Navbar />

      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input placeholder={destination} type="text" onChange={(e) => setDestination(e.target.value)} />
            </div>

            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>
                { dates && (`${format(dates[0].startDate, 'MM/dd/yyyy')} to ${format(dates[0].endDate, 'MM/dd/yyyy')}`)}
              </span>
              { openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>

            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" onChange={(e) => setMin(e.target.value)} />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" onChange={(e) => setMax(e.target.value)} />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClickSearch}>Search</button>
          </div>
          <div className="listResult">
            {loading ? 'Loading' : (
              <>
                {results.map(item => (
                  <SearchItem key={item._id} item={item} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
