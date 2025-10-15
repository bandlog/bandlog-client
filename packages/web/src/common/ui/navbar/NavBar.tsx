import type { ReactNode } from "react";

interface Props {
  items: ReactNode[];
}

function NavBar({ items }: Props) {
  return (
    <nav className="fixed bottom-0 inset-x-0 border-t border-gray-100 py-2 pb-4 px-4">
      <ul className="flex items-center justify-around h-max">
        {items.map((item) => (
          <li key={crypto.randomUUID()}>{item}</li>
        ))}
      </ul>
    </nav>
  );
}

export { NavBar };
