import {Route, createBrowserRouter, RouterProvider, createRoutesFromElements} from 'react-router-dom';
import MainLayout from './Layouts/MainLayout';
import Homepage from './pages/Homepage';
const App = () => {


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