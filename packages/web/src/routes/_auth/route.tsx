import { Home2Solid, MenuHamburger1Solid, PlusSolid } from "@lineiconshq/free-icons";
import { Lineicons } from "@lineiconshq/react-lineicons";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Button } from "@/common/ui/Button";
import { NavBar, NavBarItem } from "@/common/ui/NavBar";

export const Route = createFileRoute("/_auth")({
	component: AuthLayout,
});

function AuthLayout() {
	return (
		<div className="flex min-h-dvh flex-col">
			<main className="flex-1 [view-transition-name:main-content]">
				<Outlet />
			</main>
			<NavBar
				items={[
					<NavBarItem key="home" icon={Home2Solid} to="/" />,
					<Button key="new-rehersal" className="rounded-3xl">
						<Lineicons icon={PlusSolid} size={32} color="#ffffff" />
					</Button>,
					<NavBarItem key="menu" icon={MenuHamburger1Solid} to="/menu" />,
				]}
			/>
		</div>
	);
}
