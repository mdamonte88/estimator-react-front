import routesPaths from './constants/routesPaths';
import HomePage from './containers/HomePage';
import LoginPage from './containers/LoginPage';
import SignUpPage from './containers/SignUpPage';
import NotFoundPage from './containers/NotFoundPage';
import ListModules from './containers/ListModules';
import ModuleFeatures from './containers/ModuleFeatures';
import LandingPage from './containers/LandingPage';
import MyAppContainer from './containers/MyAppContainer';
import BacklogPage from './containers/BacklogPage';
import MyAppName from './containers/MyAppName';
import EmailPage from './containers/EmailPage';
import Questions from './containers/Questions';
import SetupPage from './containers/SetupPage';
import BuildIt from './containers/BuildIt';

const routes = [
  {
    path: routesPaths.login,
    component: LoginPage
  },
  {
    path: routesPaths.index,
    component: HomePage,
    exact: true
  },
  {
    path: routesPaths.signUp,
    component: SignUpPage
  },
  {
    path: routesPaths.landing,
    component: LandingPage,
    exact: true
  },
  {
    path: routesPaths.listModules,
    component: ListModules,
    exact: true
  },
  {
    path: routesPaths.myApp,
    component: MyAppContainer,
    exact: true
  },
  {
    path: routesPaths.backlog,
    component: BacklogPage,
    exact: true
  },
  {
    path: routesPaths.moduleFeatures,
    component: ModuleFeatures
  },
  {
    path: routesPaths.emailApp,
    component: EmailPage,
    exact: true
  },
  {
    path: routesPaths.questions,
    component: Questions
  },
  {
    path: routesPaths.myAppName,
    component: MyAppName
  },
  {
    path: routesPaths.setup,
    component: SetupPage
  },
  {
    path: routesPaths.buildIt,
    component: BuildIt
  },
  {
    component: NotFoundPage
  }
];

export default routes;
