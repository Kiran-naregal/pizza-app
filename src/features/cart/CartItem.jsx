import { formatCurrency } from "../../utils/helpers";
import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./UpdateItemQuantity";

function CartItem({ item }) {
  const {
    pizzaId,
    name,
    quantity,
    totalPrice,
    addIngredients,
    removeIngredients,
  } = item;

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <div>
        <p className="mb-1 sm:mb-0">
          {quantity}&times; {name}
        </p>
        {Boolean(addIngredients.length) && (
          <p className="text-xs capitalize italic">{`extra items:${addIngredients.map((ingredient) => ` ${ingredient}`)}`}</p>
        )}
        {Boolean(removeIngredients.length) && (
          <p className="text-xs capitalize italic">{`removed items:${removeIngredients.map((ingredient) => ` ${ingredient}`)}`}</p>
        )}
      </div>
      <div className="flex items-center justify-between sm:gap-7">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity pizzaId={pizzaId} quantity={quantity} />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
