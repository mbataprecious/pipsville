// components
import SvgIconStyle from '../../../components/SvgIconStyle';
import { FiHome } from 'react-icons/fi';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  user: getIcon('ic_user'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: <FiHome />,
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
      { title: 'Three', path: '/dashboard/three', icon: ICONS.ecommerce },
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
