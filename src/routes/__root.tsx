import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import type { QueryClient } from '@tanstack/react-query';
import { TopNav } from '@/components/layout/TopNav';

interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopNav />
      <Outlet />
      {import.meta.env.DEV ? <TanStackRouterDevtools position="bottom-right" /> : null}
    </div>
  );
}
