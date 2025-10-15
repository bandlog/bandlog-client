import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/common/ui/Header";

export const Route = createFileRoute("/_auth/")({
	component: Index,
});

function Index() {
	return (
		<>
			<Header />
			<div></div>
		</>
	);
}
