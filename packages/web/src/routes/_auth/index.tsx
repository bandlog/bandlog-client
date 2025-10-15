import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/")({
  component: Index,
});

function Index() {
  return (
    <main className="[view-transition-name:main-content]">
      <h1 className="text-2xl font-bold">Bandlog</h1>
    </main>
  );
}
