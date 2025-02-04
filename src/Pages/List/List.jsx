import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
const List = () => {
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
      setList(addInList);
    } else {
      alert("something went wrong!");
    }
  };
  useEffect(() => {
    fetchList();
  }, [list]);
  const handleDelete = async (item) => {
    const res = await axios.delete(`${url}/food/${item.id}.json`);
    console.log(res);
  };
  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format-title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p className="cursor" onClick={() => handleDelete(item)}>
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
