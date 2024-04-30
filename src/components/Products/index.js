import AllProductSection from "../AllProductSection";
import PrimeDealSection from "../PrimeDealSection";

import Header from "../Header";

import "./index.css";

const Products = () => (
  <>
    <Header />
    <div className="product-sections">
      <PrimeDealSection />
      <AllProductSection />
    </div>
  </>
);

export default Products;
