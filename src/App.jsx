import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { lazy, Suspense } from 'react';
import { Switch } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from './components/Navigation';
import PrivateRoute from 'components/PrivateRoute';
import PublicRoute from 'components/PublicRoute';
import Spinner from 'components/Spinner';
import { authOperations, authSelectors } from 'redux/auth';
const LoginPage = lazy(() => import('views/LoginPage' /* webpackChunkName: "loginpage" */));
const RegisterPage = lazy(() => import('views/RegisterPage' /* webpackChunkName: "registerpage" */));
const ContactsBookPage = lazy(() => import('views/ContactsBookPage' /* webpackChunkName: "moviepage" */));

export default function App() {
    const dispatch = useDispatch();
    const notRefreshed = useSelector(authSelectors.getNotRefreshed);
    const authError = useSelector(authSelectors.getError);
    console.log('autherror', authError);

  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());
  }, [dispatch]);

    const authNotify = () => {toast(authError)};

    return (<>
        {notRefreshed ? (<>
            <Navigation />
            <Suspense fallback={<span>Is Loading...</span>}>
                <Switch>
                    <PublicRoute path="/login" redirectTo="/contacts" restricted exact>
                        <LoginPage/>
                    </PublicRoute>

                    <PublicRoute path="/register" redirectTo="/contacts" restricted exact>
                        <RegisterPage/>
                    </PublicRoute>

                    <PrivateRoute path="/contacts" redirectTo="/login" exact>
                        <ContactsBookPage/>
                    </PrivateRoute>

                    <PublicRoute redirectTo="/contacts" restricted>
                        <LoginPage/>
                    </PublicRoute>
                </Switch>
            </Suspense>
        </>) : <Spinner />}
        {authError && authNotify()}
        <ToastContainer autoClose={3000}/>
     </>)
}
