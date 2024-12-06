import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./ui/Home";
import Menu, { loader as MenuLoader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import CreateOrder, {
  action as CreateOrderAction,
} from "./features/order/CreateOrder";
import Order, { loader as OrderLoader } from "./features/order/Order";
import { action as UpdateOrderAction } from "./features/order/UpdateOrder";
import AppLayout from "./ui/appLayout";
import Error from "./ui/Error";

const router = createBrowserRouter([
  //data loading capabilities
  {
    element: <AppLayout />, //Layout route
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/menu",
        element: <Menu />,
        loader: MenuLoader,
        errorElement: <Error />,
      },
      { path: "/cart", element: <Cart /> },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: CreateOrderAction,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: OrderLoader,
        errorElement: <Error />,
        action: UpdateOrderAction,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
