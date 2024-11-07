import { ShoppingCartContext } from "../store/Shopping-Cart-Context";
import { useContext } from "react";


//one more way of using context is to use shoppingCartContext.Consumer
export default function Product({
  id,
  image,
  title,
  price,
  description
}) {
  const { onAddCartItemQuantity } = useContext(ShoppingCartContext);

  return (
    <article className="product">
      <img src={image} alt={title} />
      <div className="product-content">
        <div>
          <h3>{title}</h3>
          <p className='product-price'>${price}</p>
          <p>{description}</p>
        </div>
        <p className='product-actions'>
          <button onClick={() => onAddCartItemQuantity(id)}>Add to Cart</button>
        </p>
      </div>
    </article>
  );
}
