import { Flex, Breadcrumb, Input, Space, theme } from "antd";
import { useLocation } from "react-router-dom";
import {
  PiNotebook,
  PiStar,
  PiBell,
  PiClockCounterClockwiseLight,
  PiSunLight,
  PiCommandLight,
} from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
import { useAppContext } from "../../context/appContext";
import IconWithColor from "../common/IconWrapper";
const { useToken } = theme;

const Navbar = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((path) => path);
  const { token } = useToken();
  const { appTheme, setAppTheme } = useAppContext();
  const breadcrumbItems = [
    {
      title: "Home",
      ...(pathnames.length !== 0 ? { href: "/" } : {}),
    },
    ...pathnames.map((pathname, index) => {
      const to = `/${pathnames.slice(0, index + 1).join("/")}`;
      return index === pathnames.length - 1
        ? { title: pathname.charAt(0).toUpperCase() + pathname.slice(1) }
        : {
            title: pathname.charAt(0).toUpperCase() + pathname.slice(1),
            href: to,
          };
    }),
  ];

  const handleThemeMode = () => {
    if (appTheme == "light") {
      setAppTheme("dark");
    } else {
      setAppTheme("light");
    }
  };

  return (
    <Flex
      justify="space-between"
      align="center"
      className="navbar-container"
      style={{
        background: token.colorBgBase,
        borderBottom: `1px solid ${token.colorBorderBg}`,
      }}
    >
      <Flex gap="middle">
        <IconWithColor icon={PiNotebook} />
        <IconWithColor icon={PiStar} />
        <Breadcrumb items={breadcrumbItems} />
      </Flex>
      <Space size="middle" align="center">
        <Input
          size="medium"
          placeholder="search"
          prefix={<IconWithColor icon={CiSearch} />}
          suffix={<IconWithColor icon={PiCommandLight} opacity="0.4" />}
        />
        <IconWithColor icon={PiSunLight} onClick={handleThemeMode} />
        <IconWithColor icon={PiClockCounterClockwiseLight} />
        <IconWithColor icon={PiNotebook} />
        <IconWithColor icon={PiBell} />
      </Space>
    </Flex>
  );
};

export default Navbar;
