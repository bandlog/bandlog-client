import Lineicons, { type LineiconsProps } from "@lineiconshq/react-lineicons";
import { Link, type LinkComponent } from "@tanstack/react-router";
import { Button } from "../Button";

interface Props {
  icon: LineiconsProps["icon"];
  to: Parameters<LinkComponent<"a", string>>[0]["to"];
}

function NavBarItem({ icon, to }: Props) {
  if (!to) throw new Error("to is required");

  return (
    <Button
      asChild
      size="icon"
      className="bg-transparent p-2 hover:bg-transparent text-[#48484e40] transition-all duration-500 ease-out"
    >
      <Link
        to={to}
        activeProps={{ className: "text-[#48484e]" }}
        viewTransition={{ types: ["fade-in-out"] }}
      >
        <Lineicons icon={icon} size={32} color="currentColor" />
      </Link>
    </Button>
  );
}

export default NavBarItem;
