import {
  DeviceType,
  LayoutMode,
  PageAnim,
  SideTheme,
  ThemeMode,
} from "@/typings/app-config";
import { defineStore } from "pinia";

interface AppConfigState {
  projectName: string;
  theme: ThemeMode;
  sideTheme: SideTheme;
  themeColor: string;
  layoutMode: LayoutMode;
  deviceType: DeviceType;
  sideWidth: number;
  pageAnim: PageAnim;
  isFixedNavBar: boolean;
  isCollapse: boolean;
  actionBar: {
    isShowSearch: boolean;
    isShowMessage: boolean;
    isShowRefresh: boolean;
    isShowFullScreen: boolean;
  };
}

const useAppConfigStore = defineStore("app-config", {
  state: (): AppConfigState => ({
    projectName: "",
    theme: ThemeMode.LIGHT,
    sideTheme: SideTheme.DARK,
    themeColor: "#409eff",
    layoutMode: LayoutMode.LTR,
    sideWidth: 210,
    deviceType: DeviceType.PC,
    pageAnim: PageAnim.OPACITY,
    isFixedNavBar: true,
    isCollapse: false,
    actionBar: {
      isShowSearch: true,
      isShowMessage: true,
      isShowRefresh: true,
      isShowFullScreen: true,
    },
  }),
  getters: {
    getLayoutMode(state) {
      return state.layoutMode;
    },
  },
  actions: {
    changeTheme(theme: ThemeMode) {
      this.theme = theme;
    },
  },
});

export default useAppConfigStore;
