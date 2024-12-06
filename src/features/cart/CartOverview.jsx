import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartAmount, getTotalCartQuantity } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const numPizza = useSelector(getTotalCartQuantity);
  const totalAmount = useSelector(getTotalCartAmount);

  if (!numPizza) return null;
  return (
    <div className="sm: flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="font-semibolds space-x-4 text-stone-300 sm:space-x-6">
        <span>{numPizza} pizzas</span>
        <span>{formatCurrency(totalAmount)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
