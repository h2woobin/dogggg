import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Index from "./pages/Index";
import Dating from "./pages/Dating";
import Messages from "./pages/Messages";
import Community from "./pages/Community";
import Experts from "./pages/Experts";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import NotFound from "./pages/NotFound";
import Chat from './pages/Chat';
import TestDB from './pages/TestDB';
import CreatePost from './pages/CreatePost';
import { PostProvider } from './contexts/PostContext';
import { ProfileProvider } from './contexts/ProfileContext';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ProfileProvider>
        <PostProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route element={<AppLayout />}>
                <Route path="dating" element={<Dating />} />
                <Route path="messages" element={<Messages />} />
                <Route path="community" element={<Community />} />
                <Route path="experts" element={<Experts />} />
                <Route path="profile" element={<Profile />} />
              </Route>
              <Route path="/chat/:petId" element={<Chat />} />
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/edit-profile" element={<EditProfile />} />
              <Route path="/test-db" element={<TestDB />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </PostProvider>
      </ProfileProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
