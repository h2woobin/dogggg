import { createBrowserRouter } from 'react-router-dom';
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
import CreatePost from './pages/CreatePost';
import PostDetail from './pages/PostDetail';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: "dating",
        element: <Dating />,
      },
      {
        path: "messages",
        element: <Messages />,
      },
      {
        path: "community",
        element: <Community />,
      },
      {
        path: "experts",
        element: <Experts />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "post/:postId",
        element: <PostDetail />,
      },
    ],
  },
  {
    path: "/chat/:petId",
    element: <Chat />,
  },
  {
    path: "/create-post",
    element: <CreatePost />,
  },
  {
    path: "/edit-profile",
    element: <EditProfile />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]); 