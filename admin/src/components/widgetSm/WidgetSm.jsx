import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState, useRef } from "react";
import { userRequest } from "../../requestMethods";

export default function WidgetSm() {
  const [users, setUsers] = useState([]);
  const isCancelled = useRef(false)

  useEffect(() => {
    getUsers();
    return () => { isCancelled.current = true }
  }, [])

  const getUsers = async () => {
    try {
      const res = await userRequest.get('users/?new=true')
      if (!isCancelled.current) {
        setUsers(res.data)
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users.map((user) => (
          <li className="widgetSmListItem" key={user._id}>
            <img
              src={user.img || "https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"}
              alt={user.username}
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.name || user.username}</span>
              <span className="widgetSmUserTitle">{user.job}</span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
