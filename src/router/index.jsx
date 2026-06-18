import { lazy } from 'react';

const Home = lazy(() => import('@pages/home'));
const Wallet = lazy(() => import('@pages/wallet'));
const Bank = lazy(() => import('@pages/bank'));
const My = lazy(() => import('@pages/my'));
const Recharge = lazy(() => import('@pages/subPages/recharge'));
const Withdraw = lazy(() => import('@pages/subPages/withdraw'));
const Transfer = lazy(() => import('@pages/subPages/transfer'));
const Invite = lazy(() => import('@pages/subPages/invite'));
const Team = lazy(() => import('@pages/subPages/team'));
const ToAmount = lazy(() => import('@pages/subPages/toAmount'));
const CreateCard = lazy(() => import('@pages/subPages/createCard'));
const CardInfo = lazy(() => import('@pages/subPages/cardInfo'));
const Activate = lazy(() => import('@pages/subPages/activate'));
const Log = lazy(() => import('@pages/subPages/log'));
const Code = lazy(() => import('@pages/subPages/code'));
const ActivateCard = lazy(() => import('@pages/subPages/activateCard'));
const Password = lazy(() => import('@pages/subPages/password'));

const routes = [
  { path: '/', element: Home },
  { path: '/wallet', element: Wallet },
  { path: '/bank', element: Bank },
  { path: '/my', element: My },
  { path: '/recharge', element: Recharge, footer: false },
  { path: '/withdraw', element: Withdraw, footer: false },
  { path: '/transfer', element: Transfer, footer: false },
  { path: '/invite', element: Invite, footer: false },
  { path: '/team', element: Team, footer: false },
  { path: '/toAmount', element: ToAmount, footer: false },
  { path: '/createCard', element: CreateCard, footer: false },
  { path: '/cardInfo', element: CardInfo, footer: false },
  { path: '/activate', element: Activate, footer: false },
  { path: '/log', element: Log, footer: false },
  { path: '/code', element: Code, footer: false },
  { path: '/activateCard', element: ActivateCard, footer: false },
  { path: '/password', element: Password, footer: false },
]

export default routes;