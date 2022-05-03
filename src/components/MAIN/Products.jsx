import React from 'react';
import useProduct from '../hooks/useProduct';
import ProductCard from './ProductCard';
import TypeButtons from './TypeButtons';
import PriceInput from './PriceInput';

const Products = () => {
  const { filterProducts } = useProduct();

  return (
    <div>
      <div
        className="navbar-dark bg-dark"
        style={{
          marginBottom: '1rem',
          position: 'sticky',
          top: '0',
          zIndex: '100',
        }}
      >
        <div className="hide-price">
          <PriceInput />
        </div>
        <TypeButtons />
      </div>

      {Array.isArray(filterProducts) && filterProducts.length ? (
        <div className="container">
          <div className="my-row">
            {filterProducts.map((product) => (
              <div key={'productList:' + product.id} className="my-col-md-4">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h5
          style={{ display: 'flex', margin: '4rem', justifyContent: 'center' }}
        >
          Sorry, we couldn't find anything that matched your search!
        </h5>
      )}
    </div>
  );
};

export default Products;
