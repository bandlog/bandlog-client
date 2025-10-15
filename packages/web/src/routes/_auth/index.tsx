import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/")({
	component: Index,
});

function Index() {
	return (
		<main className="[view-transition-name:main-content]">
			<h1 className="font-bold text-2xl">Bandlog</h1>
		</main>
	);
}
