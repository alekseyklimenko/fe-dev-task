import React from 'react';
import ReactDOM from 'react-dom/client';
import {QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {RouterProvider, createRouter} from '@tanstack/react-router';
import {Toaster} from 'sonner';

import {createQueryClient} from '@/lib/queryClient';
import {routeTree} from './routeTree.gen';
import './styles/globals.css';

const queryClient = createQueryClient();

const router = createRouter({
    routeTree,
    defaultPreload: 'intent',
    context: {queryClient},
});

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Root element not found');

ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}/>
            <Toaster richColors position="top-right"/>
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    </React.StrictMode>,
);
