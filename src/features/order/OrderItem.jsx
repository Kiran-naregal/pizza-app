import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice, addIngredients, removeIngredients } =
    item;

  let finalIngredientsList = ingredients;
  if (ingredients.length) {
    let finalList = new Set(ingredients);
    addIngredients.forEach((ingredient) => finalList.add(ingredient));
    removeIngredients.forEach((ingredient) => finalList.delete(ingredient));
    finalIngredientsList = Array.from(finalList);
  }

  return (
    <li className="space-y-1 py-3">
      <div className="flex grow items-center justify-between">
        <p className="font-bold">
          <span>{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="space-y-1 text-sm capitalize italic text-stone-500">
        {!isLoadingIngredients && finalIngredientsList.join(", ")}
      </p>
    </li>
  );
}

export default OrderItem;
