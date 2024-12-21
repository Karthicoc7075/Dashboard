import { useEffect } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Drawer from "@mui/material/Drawer";
import Avatar from "@mui/material/Avatar";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";
import SvgColor from "../svg-color";
import useTheme from "@mui/material/styles/useTheme";
import { useMediaQuery } from "@mui/material";

import DashboardIcon from "../../assets/icons/navbar/dashboard.svg";
import ClassIcon from "../../assets/icons/navbar/class.png";
import SubjectIcon from "../../assets/icons/navbar/subject.png";
import MaterialIcon from "../../assets/icons/navbar/material.png";
import MediumIcon from "../../assets/icons/navbar/medium.png";
import CategoryIcon from "../../assets/icons/navbar/category.png";
import LanguageIcon from "../../assets/icons/navbar/language.png";
import NewsIcon from "../../assets/icons/navbar/news.png";
import SliderIcon from "../../assets/icons/navbar/slider.png";
import ReviewIcon from "../../assets/icons/navbar/review.png";
import SupportIcon from "../../assets/icons/navbar/support.png";
import ReportIcon from "../../assets/icons/navbar/report.png";
import NotificationIcon from "../../assets/icons/navbar/notification.png";
import VersionIcon from "../../assets/icons/navbar/version.png";
import SettingIcon from "../../assets/icons/navbar/setting.png";
import userIcon from "../../assets/icons/navbar/user.svg";
import notfounIcon from "../../assets/icons/navbar/notfound.svg";
import AvaterImage from "../../assets/avatar-25.webp";
import { path } from "slate";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {getAuthSelector} from '../../features/auth/selectors/authSelector'
import user from "../../pages/user/user";


const sidebarData = [
  {
    title: "dashboard",
    path: "/",
    icon: DashboardIcon,
    roles: ["admin", "user"]
  },
  {
    title: "class",
    path: "/class",
    icon: ClassIcon,
    roles: ["admin","user"]
  },
  {
    title: "subject",
    path: "/subject",
    icon: SubjectIcon,
    roles: ["admin", "user"]
  },
  {
    title: "medium",
    path: "/medium",
    icon: MediumIcon,
    roles: ["admin","user"]
  },
  {
    title: "material",
    path: "/material",
    icon: MaterialIcon,
    roles: ["admin", "user"]
  },
  {
    title: "category",
    path: "/category",
    icon: CategoryIcon,
    roles: ["admin","user"]
  },
  {
    title: "language",
    path: "/language",
    icon: LanguageIcon,
    roles: ["admin", "user"]
  },
  {
    title: "news",
    path: "/news",
    icon: NewsIcon,
    roles: ["admin","user"]
  },
  {
    title: "slider",
    path: "/slider",
    icon: SliderIcon,
    roles: ["admin","user"]
  },
  {
    title: "review",
    path: "/review",
    icon: ReviewIcon,
    roles: ["admin"]
  },
  {
    title: "support",
    path: "/support",
    icon: SupportIcon,
    roles: ["admin"]
  },
  {
    title: "report",
    path: "/report",
    icon: ReportIcon,
    roles: ["admin"]
  },
  {
    title: "notification",
    path: "/notification",
    icon: NotificationIcon,
    roles: ["admin"]
  },
  {
    title: "version",
    path: "/version",
    icon: VersionIcon,
    roles: ["admin"]
  },
  {
    title: "setting",
    path: "/setting",
    icon: SettingIcon,
    roles: ["admin"]
  },
  {
    title: "user",
    path: "/user",
    icon: userIcon,
    roles: ["admin"]
  },
  {
    title: "Not found",
    path: "/404",
    icon: notfounIcon,
    roles: ["admin", "user"]
  },
];


export default function Sidebar({ openSidebar, onCloseSidebar }) {
  const theme = useTheme();
  const upLg = useMediaQuery(theme.breakpoints.up("lg"));
  const userData = useSelector(getAuthSelector)?.user
  const filterData = sidebarData.filter(item => item.roles.includes(userData?.role));
  const width = 280;
  const renderAccount = (
    <Box
      sx={{
        my: 3,
        mx: 2.5,
        py: 2,
        px: 2.5,
        display: "flex",
        borderRadius: 1.5,
        alignItems: "center",
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
      }}
    >
    
      <Avatar
        src={
         AvaterImage
        }
        alt="Avatar"
      />

      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2" sx={{textTransform:'uppercase' }} >{userData?.username}</Typography>

        <Typography variant="body2" sx={{ color: "text.secondary",textTransform:'capitalize' }}>
          {userData?.role}
        </Typography>
      </Box>
    </Box>
  );

  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {filterData.map((item, i) => (
        <NavItem key={i} item={item} />
      ))}
    </Stack>
  );

  const renderContent = (
    <Box
      sx={{
        height: "100%",
        backgroundColor: (theme) => theme.palette.mode =='light' ? alpha(theme.palette.grey[0],0.8):  alpha(theme.palette.grey[100], 0.8),
        boxShadow: (theme) => theme.shadows[6],
        borderRadius: "1rem",
        overflowY: "scroll",
        "::-webkit-scrollbar": { width: "4px" },
      }}
    >
      {renderAccount}
      {renderMenu}
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: width },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: "fixed",
            width: width,
            backgroundColor: "background.default",
            p: "1rem",
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: {
              width: width,
              margin: "1rem",
              
              height: "calc(100dvh - 2rem)",
              borderRadius: "1rem",
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

function NavItem({ item }) {
  const navigate = useNavigate();
  const pathName = window.location.pathname;
  const active = item.path === pathName;


  const handleNavigate = () => {
    navigate(item.path);
  };
  
  return (
    <ListItemButton
      onClick={() =>handleNavigate()  }
      sx={{
        minHeight: 49,
        borderRadius: 0.75,
        typography: "body2",
        color: "text.secondary",
        textTransform: "capitalize",
        fontWeight: "fontWeightMedium",
        ...(active && {
          // color: 'primary.main',
          fontWeight: "fontWeightBold",
          bgcolor: (theme) => theme.palette.mode === 'light' ? alpha(theme.palette.primary.main, 0.08) : alpha(theme.palette.primary.lighter, 0.08),
          "&:hover": {
            bgcolor: (theme) => theme.palette.grey[200],
          },
        }),
      }}
    >
      <Box
        component="span"
        sx={{
          display: "grid",
          placeItems: "center",
          width: 38,
          height: 38,
          borderRadius: 0.8,
          mr: 2,
          ...(active && {
            backgroundImage:(theme)=> theme.palette.gradientColors[0]
          }),
        }}
      >
        <SvgColor src={item.icon} color={active ? "#fff" : ""}    width={22}
      height={22} />
      </Box>

      <Box component="span">{item.title} </Box>
    </ListItemButton>
  );
}
