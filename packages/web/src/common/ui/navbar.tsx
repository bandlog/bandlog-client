import Lineicons, { type LineiconsProps } from "@lineiconshq/react-lineicons";
import { Link, type LinkComponent } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Button } from "./Button";

interface Props {
	items: ReactNode[];
}

function NavBar({ items }: Props) {
	return (
		<nav className="fixed inset-x-0 bottom-0 z-10 border-gray-100/50 border-t px-4 py-2 pb-4">
			<ul className="flex h-max items-center justify-around">
				{items.map((item) => (
					<li key={crypto.randomUUID()}>{item}</li>
				))}
			</ul>
		</nav>
	);
}

interface ItemProps {
	icon: LineiconsProps["icon"];
	to: Parameters<LinkComponent<"a", string>>[0]["to"];
}

function NavBarItem({ icon, to }: ItemProps) {
	if (!to) throw new Error("to is required");

	return (
		<Button
			asChild
			size="icon"
			variant="static"
			className="bg-transparent p-2 text-[#48484e40] transition-all duration-500 ease-out hover:bg-transparent"
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

export { NavBar, NavBarItem };
