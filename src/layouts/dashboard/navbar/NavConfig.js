// components
import SvgIconStyle from '../../../components/SvgIconStyle';
import { FiHome } from 'react-icons/fi';
import { GiWallet } from 'react-icons/gi';
import { AiFillSetting } from 'react-icons/ai';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  user: getIcon('ic_user'),
  analytics: getIcon('ic_analytics'),
  dashboard: <FiHome />,
  wallet: <GiWallet />,
  settings: <AiFillSetting />,
};

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general v3.0.0',
    items: [
      { title: 'Dashboard', path: '/dashboard/home', icon: ICONS.dashboard },
      {
        title: 'Investments',
        path: '/dashboard/invest',
        children: [
          { title: 'investment plans', path: '/dashboard/invest/plans' },
          { title: 'Daily Earnings', path: '/dashboard/invest/interest' },
          { title: 'Investment', path: '/dashboard/invest/all' },
        ],
        icon: ICONS.analytics,
      },
      { title: 'Wallet', path: '/dashboard/wallet', icon: ICONS.wallet },
      { title: 'Settings', path: '/dashboard/profile', icon: ICONS.settings },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'management',
  //   items: [
  //     {
  //       title: 'user',
  //       path: '/dashboard/user',
  //       icon: ICONS.user,
  //       children: [
  //         { title: 'Four', path: '/dashboard/user/four' },
  //         { title: 'Five', path: '/dashboard/user/five' },
  //         { title: 'Six', path: '/dashboard/user/six' },
  //       ],
  //     },
  //   ],
  // },
];

export default sidebarConfig;
