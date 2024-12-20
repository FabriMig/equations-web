import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useMemo } from 'react';

import Layout from "./layout/Layout";
import { routes } from './routes';

import { verifyUserSession } from './services/user.service';
import useUserStore from '@/store/user.store';
import { useApi } from './hooks/useApi';
import { SimpleAuth } from './types';

const SolveEquation = lazy(() => import("./pages/SolveEquation"))
const SignIn = lazy(() => import("./pages/SignIn"))
const SignUp = lazy(() => import("./pages/SignUp"))
const UserEquations = lazy(() => import("./pages/UserEquations"))

export default function EquationSolver() {
  const { addLogedUser } = useUserStore();
  const options = useMemo(() => ({
    autoFetch: true,
    params: {},
    onSuccess: (reponse: SimpleAuth) => {
      addLogedUser(reponse.user.email, reponse.user.accountType);
    }
  }), [addLogedUser]);

  useApi(verifyUserSession, options);
  

  return (
    <Layout>
      <Routes>

        <Route path={routes.solveEquations.route} element={<Suspense fallback={<div>Loading</div>}><SolveEquation /></Suspense>} />

        <Route path={routes.userEquations.route} element={<Suspense fallback={<div>Loading</div>}><UserEquations /></Suspense>} />

        <Route path={routes.login.route} element={<Suspense fallback={<div>Loading</div>}><SignIn /></Suspense>} />

        <Route path={routes.signUp.route} element={<Suspense fallback={<div>Loading</div>}><SignUp /></Suspense>} />

      </Routes>
    </Layout>
  )
}