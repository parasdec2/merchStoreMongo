import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Cards from "./Card";
import { price } from "./priceList";
import { getProducts } from "./helper/coreapicalls";
import CheckBoxFilter from "./CheckBoxFilter";
import SearchBox from "./SearchBox";
import RangeSlider from "./PriceFilter";

export default function Products() {
  const [noProdcuts, setNoProducts] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [skip, setSkip] = useState(0);
  const [searchterm, setSearchterm] = useState("");
  const [Filters, setFilters] = useState({
    category: [],
    price: [],
  });

  const loadAllProducts = () => {
    const variables = {
      skip: skip,
    };
    getProducts(variables).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  const showFilteredResults = (filters) => {
    const variables = {
      skip: 0,
      filters: filters,
    };
    getProducts(variables).then((data) => {
      if (data.error) {
        setError(data.error);
        alert("Failed to fectch product datas");
      } else {
        console.log("DATA", data);
        if (data.length < 1) {
          setProducts([]);
          setNoProducts(true);
        } else {
          setProducts(data);
          setNoProducts(false);
        }
      }
    });
  };

  const handleFilters = (filters, category) => {
    // console.log("filters", filters);
    // console.log("category", category);
    const newFilters = { ...Filters };
    console.log("NEW filters 1", newFilters);
    newFilters[category] = filters;

    // if (category === "price") {
    //   let priceValues = handlePrice(filters);
    //   newFilters[category] = priceValues;
    // }

    console.log("NEW filters 2", newFilters);

    showFilteredResults(newFilters);
    setFilters(newFilters);
  };

  // Serach Box
  const updateSearchTerm = (newSearchTerm) => {
    console.log(newSearchTerm);

    const variables = {
      skip: 0,
      filters: Filters,
      searchTerm: newSearchTerm,
    };

    setSearchterm(newSearchTerm);
    getProducts(variables).then((data) => {
      if (data.error) {
        setError(data.error);
        alert("Failed to fectch product datas");
      } else {
        console.log("DATA", data);
        if (data.length < 1) {
          setProducts([]);
          setNoProducts(true);
        } else {
          setProducts(data);
          setNoProducts(false);
        }
      }
    });
  };

  const noProdFound = () => {
    if (noProdcuts) {
      return (
        <div className="row bg-dark text-white text-center">
          <div className="row">
            <h2 className="col-12 text-center">No Products Found</h2>
          </div>
        </div>
      );
    }
  };

  return (
    <Base title="Catalog" description="">
      <div className="row">
        <div className="col-12 text-center mb-3">
          <SearchBox
            handleFilters={(filters) => handleFilters(filters, "category")}
            refreshFunction={updateSearchTerm}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-3 text-center mb-3">
          <CheckBoxFilter
            handleFilters={(filters) => handleFilters(filters, "category")}
          />
        </div>
        <div className="col-3 text-center mb-3">
          <RangeSlider
            handleFilters={(filters) => handleFilters(filters, "price")}
          />
        </div>
      </div>

      <div className="row text-center">
        <div className="row">
          {noProdFound()
            ? noProdFound()
            : products.map((product, index) => {
                return (
                  <div key={index} className="col-4 mb-4">
                    <Cards product={product} />
                  </div>
                );
              })}
        </div>
      </div>
    </Base>
  );
}
