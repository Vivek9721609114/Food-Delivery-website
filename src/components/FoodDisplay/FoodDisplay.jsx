import { useContext, useState, useEffect } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import axios from "axios";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  const url = "https://food-del-dbdc6-default-rtdb.firebaseio.com";
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/food.json`);
    if (response.status == 200) {
      // console.log(response.data);
      var addInList = [];
      for (const id in response.data) {
        const element = response.data[id];
        addInList.push({ ...element, id: id });
      }
      setList([...food_list, ...addInList]);
    } else {
      alert("something went wrong!");
    }
  };
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
