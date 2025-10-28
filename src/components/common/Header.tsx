import React, { useState, type ReactNode } from "react";
import { Link as DOMLink, useLocation, useNavigate } from "react-router-dom";
import {
  Stack,
  Toolbar,
  AppBar,
  Button,
  Drawer,
  Box,
  Container,
  Link,
  Typography,
  Avatar,
  Badge,
  Menu,
  MenuItem,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  User,
  BadgePercent,
  Search,
  ShoppingBag,
  LogOut,
  History,
  UtensilsCrossed,
  Cookie,
  Puzzle,
  Users,
  Bike,
} from "lucide-react";
import { PRIVATE_ROUTE, PUBLIC_ROUTE, USER_ROLE } from "../../enums";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../redux/store";
import { emptyCart } from "../../redux/slices/cart";
import { switchRoles } from "../../redux/slices/role";

interface IProps {
  hideNav: boolean;
}

interface INavLink {
  href: string;
  icon: ReactNode;
  name: string;
}

const NavList = ({ ...props }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart.userCart?.food);
  const role = useSelector((state: RootState) => state.user.role);

  const { getLocalStorage, removeLocalStorage } = useLocalStorage();
  const user = getLocalStorage("user");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    removeLocalStorage("user");
    removeLocalStorage("token");
    removeLocalStorage("persist:root");
    dispatch(emptyCart());
    dispatch(switchRoles(USER_ROLE.USER));
    navigate(PUBLIC_ROUTE.SIGNIN);
  };

  const userPages = [
    {
      name: "Search",
      icon: <Search size={22} />,
      href: PUBLIC_ROUTE.SEARCH,
    },
    {
      name: "Offers",
      icon: <BadgePercent size={22} />,
      href: PUBLIC_ROUTE.OFFERS,
    },
    {
      name: "History",
      icon: <History size={22} />,
      href: PUBLIC_ROUTE.HISTORY,
    },
    ...(user?.id
      ? [
          {
            name: "Cart",
            icon: (
              <Badge badgeContent={cart?.length || 0} color="error">
                <ShoppingBag size={22} />
              </Badge>
            ),
            href: PRIVATE_ROUTE.CART,
          },
        ]
      : []),
  ];

  const adminPages = [
    {
      name: "Restaurants",
      icon: <UtensilsCrossed size={22} />,
      href: PRIVATE_ROUTE.RESTAURANTS,
    },
    {
      name: "Foods",
      icon: <Cookie size={22} />,
      href: PRIVATE_ROUTE.FOODS,
    },
    {
      name: "Coupons",
      icon: <Puzzle size={22} />,
      href: PRIVATE_ROUTE.COUPON_CODES,
    },
    {
      name: "Requests",
      icon: <Bike size={22} />,
      href: PRIVATE_ROUTE.RIDER_REQUESTS,
    },
    {
      name: "Users",
      icon: <Users size={22} />,
      href: PRIVATE_ROUTE.USERS,
    },
  ];

  return (
    <Stack
      overflow="auto"
      direction={{ xs: "column", md: "row" }}
      gap={{ xs: 0, md: 5 }}
      ml={{ xs: 3, md: 0 }}
      mt={{ xs: 3, md: 0 }}
      width={{ xs: "200px", md: "initial" }}
      {...props}
    >
      {(user?.id && role === USER_ROLE.ADMIN ? adminPages : userPages).map(
        (page: INavLink) => (
          <Link
            key={page.href}
            component={DOMLink}
            to={page.href}
            sx={{
              height: "60px",
              color: location.pathname.includes(page.href)
                ? "#d54545"
                : "black",
              cursor: "pointer",
              fontWeight: 600,
              textDecoration: "none",
              display: "flex",
              gap: 0.5,
              alignItems: "center",
              "&:hover": {
                color: "#d54545",
              },
            }}
          >
            {page.href === PRIVATE_ROUTE.USER_PROFILE ? page.name : page.icon}
            {page.href === PRIVATE_ROUTE.USER_PROFILE ? page.icon : page.name}
          </Link>
        )
      )}
      {user?.id ? (
        isMobile ? (
          <>
            <Link
              component={DOMLink}
              to={PRIVATE_ROUTE.USER_PROFILE}
              sx={{
                height: "60px",
                color: location.pathname.includes("profile")
                  ? "#d54545"
                  : "black",
                cursor: "pointer",
                fontWeight: 600,
                textDecoration: "none",
                display: "flex",
                gap: 0.5,
                alignItems: "center",
                "&:hover": { color: "#d54545" },
              }}
            >
              <Avatar src={user.image} sx={{ width: 28, height: 28 }} />
              Profile
            </Link>
            <Divider />
            <Link
              onClick={handleLogout}
              sx={{
                height: "60px",
                color: "#d54545",
                cursor: "pointer",
                fontWeight: 600,
                textDecoration: "none",
                display: "flex",
                gap: 0.5,
                alignItems: "center",
              }}
            >
              <LogOut size={22} /> Logout
            </Link>
          </>
        ) : (
          <>
            <Link
              onClick={handleClick}
              sx={{
                height: "60px",
                color: "black",
                cursor: "pointer",
                fontWeight: 600,
                textDecoration: "none",
                display: "flex",
                gap: 0.5,
                alignItems: "center",
                "&:hover": { color: "#d54545" },
              }}
            >
              Hi, {user.name.split(" ")[0]}
              <Avatar src={user.image} sx={{ width: 34, height: 34 }} />
            </Link>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem
                component={DOMLink}
                sx={{
                  display: "flex",
                  gap: 0.5,
                  "&:hover": {
                    color: "#d54545",
                  },
                }}
                to={PRIVATE_ROUTE.USER_PROFILE}
                onClick={handleClose}
              >
                <User size={22} /> My Profile
              </MenuItem>
              <Divider />
              <MenuItem
                sx={{ display: "flex", gap: 0.5, color: "#d54545" }}
                onClick={handleLogout}
              >
                <LogOut size={22} />
                Logout
              </MenuItem>
            </Menu>
          </>
        )
      ) : (
        <Link
          component={DOMLink}
          to={PUBLIC_ROUTE.SIGNIN}
          sx={{
            height: "60px",
            color: location.pathname.includes("signin") ? "#d54545" : "black",
            cursor: "pointer",
            fontWeight: 600,
            textDecoration: "none",
            display: "flex",
            gap: 0.5,
            alignItems: "center",
            "&:hover": { color: "#d54545" },
          }}
        >
          <User size={22} /> Sign In
        </Link>
      )}
    </Stack>
  );
};

const Nav = () => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <Button
        variant="text"
        onClick={toggleDrawer(true)}
        sx={{ color: "black", display: { xs: "flex", md: "none" } }}
      >
        Menu
      </Button>
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        anchor="right"
        sx={{
          display: { xs: "inherit", md: "none" },
        }}
      >
        <NavList />
      </Drawer>
      <NavList
        sx={{
          display: { xs: "none", md: "inherit" },
        }}
      />
    </>
  );
};

const Header = (props: IProps) => {
  const { hideNav } = props;
  const navigate = useNavigate();

  const role = useSelector((state: RootState) => state.user.role);

  return (
    <AppBar
      color="inherit"
      sx={{
        boxShadow: hideNav ? "none" : "",
      }}
    >
      <Container>
        <Toolbar>
          <Stack
            direction="row"
            justifyContent={hideNav ? "start" : "space-between"}
            alignItems="center"
            width="100%"
          >
            <Box
              sx={{
                backgroundColor: "#d54545",
                px: 1.5,
                borderRadius: "4px",
                color: "white",
                fontSize: "1.8rem",
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "auto",
              }}
              onClick={() =>
                navigate(
                  role === USER_ROLE.ADMIN
                    ? PRIVATE_ROUTE.DASHBOARD
                    : PUBLIC_ROUTE.HOME
                )
              }
            >
              B
            </Box>
            {hideNav && (
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, color: "#d54545" }}
              >
                igbite
              </Typography>
            )}
            {!hideNav && <Nav />}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
