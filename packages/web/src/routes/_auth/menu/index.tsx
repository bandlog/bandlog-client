import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/menu/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="[view-transition-name:main-content]">
      Hello "/_auth/menu/"!
    </main>
  );
}
