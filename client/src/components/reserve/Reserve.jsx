import React, { useContext, useState } from 'react'
import './reserve.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import useFetch from '../../hook/http'
import { SearchContext } from '../../context/SearchContext';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Reserve(props) {
  const navigate = useNavigate();
  const { data } = useFetch(`/hotels/room/${props.hotelId}`);
  const results = data.data || data;
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { dates } = useContext(SearchContext)

  const handleSelect = (e) => {
    e.preventDefault();
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter(item => item !== value));
  }

  const getDatesInRange = (startDate, endDate) => {
    let start = startDate;
    if (!(startDate instanceof Date)) {
      start = new Date(startDate);
    }
    const date = new Date(start.getTime());
    let end = endDate;
    if (!(endDate instanceof Date)) {
      end = new Date(endDate);
    }
    
    let list = [];
    while(date <= end) {
      list.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return list;
  }

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);
  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleClick = async(e) => {
    e.preventDefault();
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/rooms/availability/${roomId}`, {
            dates: alldates,
          });
          return res.data;
        })
      );
      
      props.setOpen(false);
      navigate("/");
    } catch (err) {}
  }

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => props.setOpen(false)}
        />
        <span>Select your rooms:</span>
        {results.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo"> 
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice"><span style={{ fontWeight: 'lightner' }}>Price:</span> {item.price}</div>
            </div>
            <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room">
                  <label htmlFor={'checkbox_' + roomNumber._id}>{roomNumber.number}</label>
                  <input
                    id={'checkbox_' + roomNumber._id}
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  )
}

export default Reserve;
