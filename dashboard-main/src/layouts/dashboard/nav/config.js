// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Group Area',
    path: '/dashboard/products',
    icon: icon('geo-alt-fill'),
  },
  {
    title: 'Perangkat',
    path: '/dashboard/user',
    icon: icon('cpu-fill'),
  },
  {
    title: 'Configurator',
    path: '/dashboard/blog',
    icon: icon('gear-fill'),
  },
  {
    title: 'About',
    path: '/login',
    icon: icon('info-square'),
  },
];

export default navConfig;
