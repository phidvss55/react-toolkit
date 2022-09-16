import { useState, useEffect } from "react";
import "./widgetLg.css";
import { userRequest } from '../../requestMethods.js'
import React from "react";
import { format } from 'timeago.js'

export default function WidgetLg() {
  const [orders, setOrders] = useState([]);
  const isCancelled = React.useRef(false)

  useEffect(() => {
    getOrders();
    return () => { isCancelled.current = true }; 
  }, [])

  const getOrders = async() => {
    try {
      const res = await userRequest.get('/orders');
      if (!isCancelled.current) {
        setOrders(res.data.data)
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <thead>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Customer</th>
            <th className="widgetLgTh">Date</th>
            <th className="widgetLgTh">Amount</th>
            <th className="widgetLgTh">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr className="widgetLgTr" key={order._id}>
              <td className="widgetLgUser">
                <img
                  src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  alt=""
                  className="widgetLgImg"
                />
                <span className="widgetLgName">Susan Carol</span>
              </td>
              <td className="widgetLgDate">2 Jun 2021</td>
              <td className="widgetLgAmount">$122.00</td>
              <td className="widgetLgStatus">
                <Button type="Approved" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
