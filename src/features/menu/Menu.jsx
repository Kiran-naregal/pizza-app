import { useLoaderData } from "react-router-dom";
import { getIngredients, getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  const { menu, ingredients } = useLoaderData();

  return (
    <ul className="divide-y border-stone-200 px-2">
      {menu.map((pizza) => (
        <MenuItem key={pizza.id} pizza={pizza} allIngredients={ingredients} />
      ))}
    </ul>
  );
}

export async function loader() {
  const menu = await getMenu();
  const ingredients = await getIngredients();
  return { menu, ingredients };
}

export default Menu;
