import {Route, createBrowserRouter, RouterProvider, createRoutesFromElements} from 'react-router-dom';
import MainLayout from './Layouts/MainLayout';
import Homepage from './pages/Homepage';
const App = () => {


  // useEffect(() => {
  //   // Get saved theme or use system preference
  //   const savedTheme = localStorage.getItem('theme');
  //   if (savedTheme) {
  //     document.documentElement.setAttribute('data-theme', savedTheme);
  //   } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  //     document.documentElement.setAttribute('data-theme', 'dark');
  //   } else {
  //     document.documentElement.setAttribute('data-theme', 'light');
  //   }
  // }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Homepage />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} /> */}
      </Route>
    )
  );
  return (
    <RouterProvider router={router} />
  );
}
export default App;