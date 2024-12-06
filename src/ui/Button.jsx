import { Link } from "react-router-dom";

export default function Button({ children, disabled, to, type, onClick }) {
  const className =
    "transition-color text-sm inline-block rounded-full bg-yellow-400  font-semibold uppercase tracking-wide duration-300 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed ";
  const style = {
    primary: className + " px-4 py-3 sm:px-6 sm:py-4",
    small: className + " text-xs px-4 py-2 md:px-5 md:py-2.5",
    round: className + " text-sm px-2.5 py-1 md:px-3.5 md:py-2",
    secondary:
      "transition-color text-sm inline-block rounded-full border-2 border-stone-300 px-4 py-2.5 font-semibold uppercase tracking-wide text-stone-400 duration-300 hover:bg-stone-300 hover:text-stone-800 focus:text-stone-800 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed sm:px-6 sm:py-3.5",
  };

  if (to)
    return (
      <Link className={style[type]} to={to}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button disabled={disabled} className={style[type]} onClick={onClick}>
        {children}
      </button>
    );

  return (
    <button disabled={disabled} className={style[type]}>
      {children}
    </button>
  );
}
