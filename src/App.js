import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthedLayout from './layouts/AuthedLayout';
import UnauthedLayout from './layouts/UnauthedLayout';
import { setup } from './stores/user';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Pending from './screens/Pending';
import Dashboard from './screens/Dashboard';
import WorkersOutlet from './screens/Workers/Outlet';
import ShopifyOutlet from './screens/Workers/Shopify/Outlet';
import ShopifyCreate from './screens/Workers/Shopify/Create';
import ShopifyCreateSuccess from './screens/Workers/Shopify/Success';
import ShopifyView from './screens/Workers/Shopify/View';
import ShopifyEdit from './screens/Workers/Shopify/Edit';

const UnauthedApp = () => {
  return (
    <UnauthedLayout>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/pending" element={<Pending />} />
      </Routes>
    </UnauthedLayout>
  );
};

const AuthedApp = () => {
  return (
    <AuthedLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<Navigate to="/" replace />} />
        <Route path="/workers" element={<WorkersOutlet />}>
          <Route path="shopify" element={<ShopifyOutlet />}>
            <Route path="create" element={<ShopifyCreate />} />
            <Route path="success" element={<ShopifyCreateSuccess />} />
            <Route path="view:id" element={<ShopifyView />} />
            <Route path="edit:id" element={<ShopifyEdit />} />
          </Route>
        </Route>
      </Routes>
    </AuthedLayout>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.user.session);

  useEffect(() => {
    dispatch(setup());
  }, []);

  return <BrowserRouter>{session ? <AuthedApp /> : <UnauthedApp />}</BrowserRouter>;
};

export default App;
