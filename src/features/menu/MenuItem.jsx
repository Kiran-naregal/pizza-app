import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import {
  addDefaultIngredient,
  addIngredient,
  addItem,
  getItemById,
  removeDefaultIngredient,
  removeIngredient,
} from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

function MenuItem({ pizza, allIngredients }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const item = useSelector(getItemById(id));

  const quantity = item?.quantity;
  const extraIngredients = allIngredients.filter((ingredient) => {
    return !ingredients.includes(ingredient.name);
  });

  function handleAddTOCart() {
    const item = {
      name,
      unitPrice,
      pizzaId: id,
      quantity: 1,
      totalPrice: unitPrice,
      addIngredients: [],
      removeIngredients: [],
    };
    dispatch(addItem(item));
  }

  return (
    <div>
      <li className="flex gap-4 py-2">
        <img
          src={imageUrl}
          alt={name}
          className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
        />
        <div className="flex grow flex-col pt-0.5">
          <p className="font-medium">{name}</p>
          <p className="text-sm capitalize italic text-stone-500">
            {/* {Boolean(quantity) && } */}
            {ingredients.join(", ")}
          </p>
          <div className="mt-auto flex items-center justify-between">
            {!soldOut ? (
              <p className="text-sm">{formatCurrency(unitPrice)}</p>
            ) : (
              <p className="text-sm font-medium uppercase text-stone-500">
                Sold out
              </p>
            )}
            {!soldOut &&
              (quantity ? (
                <div className="flex items-center gap-3 sm:gap-8">
                  <UpdateItemQuantity pizzaId={id} quantity={quantity} />
                  <DeleteItem pizzaId={id} />
                </div>
              ) : (
                <Button type="small" onClick={handleAddTOCart}>
                  Add to cart
                </Button>
              ))}
          </div>
        </div>
      </li>
      {!soldOut && Boolean(quantity) && (
        <>
          <p className="mb-1 text-xs font-semibold">Add Extra ingredient</p>
          <div className="mb-2 flex flex-wrap gap-2 text-xs">
            {extraIngredients.map((ingredient) => (
              <div
                className="flex gap-1 capitalize italic"
                key={ingredient.name}
              >
                <input
                  defaultChecked={item.addIngredients.find(
                    (item) => item === ingredient.name,
                  )}
                  id={`${ingredient.name}-${id}`}
                  type="checkbox"
                  onChange={(e) => {
                    e.target.checked
                      ? dispatch(
                          addIngredient(id, ingredient.name, ingredient.price),
                        )
                      : dispatch(
                          removeIngredient(
                            id,
                            ingredient.name,
                            ingredient.price,
                          ),
                        );
                  }}
                />
                <label htmlFor={`${ingredient.name}-${id}`}>
                  {ingredient.name}
                </label>
                <span>({formatCurrency(ingredient.price)})</span>
              </div>
            ))}
          </div>
          <p className="mb-1 text-xs font-semibold">Remove ingredient</p>
          <div className="mb-2 flex flex-wrap gap-2 text-xs">
            {ingredients.map((ingredient) => (
              <div className="flex gap-1 capitalize italic" key={ingredient}>
                <input
                  type="checkbox"
                  id={`${ingredient}-${id}`}
                  defaultChecked={item.removeIngredients.find(
                    (item) => item === ingredient,
                  )}
                  onChange={(e) =>
                    e.target.checked
                      ? dispatch(removeDefaultIngredient(id, ingredient))
                      : dispatch(addDefaultIngredient(id, ingredient))
                  }
                />
                <label htmlFor={`${ingredient}-${id}`}>{ingredient}</label>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default MenuItem;
