import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { PostProvider } from './contexts/PostContext';
import { ProfileProvider } from './contexts/ProfileContext';
import { router } from './router';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ProfileProvider>
        <PostProvider>
          <RouterProvider router={router} />
        </PostProvider>
      </ProfileProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
