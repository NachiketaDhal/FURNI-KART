import React from "react";
import styled from "styled-components";
import { useFilterContext } from "../context/filter_context";
import { getUniqueValues, formatPrice } from "../utils/helpers";
import { FaCheck } from "react-icons/fa";

const Filters = () => {
  const {
    state: { allProducts, filters },
    updateFilters,
    clearFilters,
  } = useFilterContext();
  const {
    text,
    category,
    company,
    colors,
    minPrice,
    maxPrice,
    price,
    freeShipping,
  } = filters;

  const categories = getUniqueValues(allProducts, "category");
  const companies = getUniqueValues(allProducts, "company");
  const colorValues = getUniqueValues(allProducts, "colors");
  // console.log(colorValues);

  return (
    <Wrapper>
      <div className="content">
        <form onSubmit={(e) => e.preventDefault()}>
          {/* Search input */}
          <div className="form-control">
            <input
              type="text"
              name="text"
              placeholder="Search"
              className="search-input"
              value={text}
              onChange={updateFilters}
            />
          </div>
          {/* Category */}
          <div className="form-control">
            <h5>Category</h5>
            {categories.map((cat, i) => {
              return (
                <button
                  key={i}
                  name="category"
                  className={category === cat ? "active" : null}
                  onClick={updateFilters}
                >
                  {cat}
                </button>
              );
            })}
          </div>
          {/* Company */}
          <div className="form-control">
            <h5>Company</h5>
            <select
              className="company"
              name="company"
              value={company}
              onChange={updateFilters}
            >
              {companies.map((com, i) => {
                return (
                  <option value={com} key={i}>
                    {com}
                  </option>
                );
              })}
            </select>
          </div>
          {/* Colors */}
          <div className="form-control">
            <h5>Colors</h5>
            <div className="colors">
              {colorValues.map((col, i) => {
                return col === "all" ? (
                  <button
                    className={`all-btn ${colors === "all" && "active"}`}
                    key={i}
                    name="colors"
                    data-col-values={col}
                    onClick={updateFilters}
                  >
                    All
                  </button>
                ) : (
                  <button
                    className={`color-btn ${colors === col && "active"}`}
                    key={i}
                    name="colors"
                    style={{ background: col }}
                    data-col-values={col}
                    onClick={updateFilters}
                  >
                    {colors === col && <FaCheck />}
                  </button>
                );
              })}
            </div>
          </div>
          {/* Price range */}
          <div className="form-control">
            <h5>Price</h5>
            <p className="price">{formatPrice(price)}</p>
            <input
              type="range"
              name="price"
              min={minPrice}
              max={maxPrice}
              value={price}
              onChange={updateFilters}
            />
          </div>
          {/* Free Shipping */}
          <div className="form-control shipping">
            <label htmlFor="shipping">Free Shipping</label>
            <input
              type="checkbox"
              name="freeShipping"
              id="shipping"
              checked={freeShipping}
              onChange={updateFilters}
            />
          </div>
        </form>
        {/* Clear Filters */}
        <button className="clear-btn" onClick={clearFilters}>
          Clear Filters
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
