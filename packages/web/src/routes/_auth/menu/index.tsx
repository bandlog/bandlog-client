import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/common/ui/Header";

export const Route = createFileRoute("/_auth/menu/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<>
			<Header title="메뉴" />
			<div></div>
		</>
	);
}
