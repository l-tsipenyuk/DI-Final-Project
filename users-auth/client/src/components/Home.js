import { useState, useEffect } from "react";
import axios from "axios";

const Home = (props) => {
  const [products, setProducts] = useState();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get("/products/all");
      console.log(response.data);
      if(response.status === 200) setProducts(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h2>Homepage</h2>
      {products &&
        products.map((item) => {
          return <div key={item.id}>{item.name}</div>;
        })}
    </div>
  );
};
export default Home;
