import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Chat from "./components/Chat";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFound />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/chat',
    element: <Chat />
  }
]);

function App() {
  return (
    <>
      <header>
        <h1>Cha<span>T</span>alk</h1>
      </header>
      <main>
        <RouterProvider router={router} />
      </main>
    </>
  );
}

export default App;
