import { DrawerNavigator } from "react-navigation";
import HomeScreen from "../screens/HomeScreen";
import GuideScreen from "../screens/GuideScreen";
import SideMenu from './SideMenu';

export default DrawerNavigator(
  {
    Main: {
      screen: HomeScreen
    }
  },
  {
    header: null,
    contentComponent: SideMenu,
    drawerWidth: 300
  }
);
