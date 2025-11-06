import { lazy } from "react";
import { useRoutes } from "react-router-dom";
import { PRIVATE_ROUTE, PUBLIC_ROUTE } from "../enums";

const LoginPage = lazy(() => import("../pages/auth/Login"));
const RegisterPage = lazy(() => import("../pages/auth/Register"));
const ForgotPasswordPage = lazy(() => import("../pages/auth/ForgotPassword"));
const HomePage = lazy(() => import("../pages/customers/Home"));
const SearchPage = lazy(() => import("../pages/customers/Search"));
const OffersPage = lazy(() => import("../pages/customers/Offers"));
const ProfilePage = lazy(() => import("../pages/Profile"));
const FoodCollectionPage = lazy(
  () => import("../pages/customers/FoodCollection")
);
const RestaurantPage = lazy(
  () => import("../pages/customers/restaurant/Restaurant")
);
const DineInRestaurantPage = lazy(
  () => import("../pages/customers/restaurant/DineInRestaurant")
);
const CartPage = lazy(() => import("../pages/customers/Cart"));
const OrderHistoryPage = lazy(() => import("../pages/customers/OrderHistory"));
const OrderPlacePage = lazy(() => import("../pages/customers/PlaceOrder"));

const TermsConditionPage = lazy(() => import("../pages/footer/TermsCondition"));
const PrivacyPolicyPage = lazy(() => import("../pages/footer/PrivacyPolicy"));
const ContactUsPage = lazy(() => import("../pages/footer/ContactUs"));
const RideWithUsPage = lazy(() => import("../pages/footer/RideWithUs"));
const AboutUsPage = lazy(() => import("../pages/footer/About"));
const CareersPage = lazy(() => import("../pages/footer/Careers"));

const AdminDashboard = lazy(() => import("../pages/admin/Dashboard"));
const AdminRestaurants = lazy(() => import("../pages/admin/Restaurants"));
const AdminFoods = lazy(() => import("../pages/admin/Foods"));
const AdminOrders = lazy(() => import("../pages/admin/Orders"));
const AdminCoupons = lazy(() => import("../pages/admin/Coupons"));
const AdminUsers = lazy(() => import("../pages/admin/Users"));
const AdminRiderRequests = lazy(() => import("../pages/admin/RiderRequests"));
const AdminJobs = lazy(() => import("../pages/admin/Jobs"));

const RidersDashboard = lazy(() => import("../pages/riders/index"));
const RidersPage = lazy(() => import("../pages/riders/Rides"));

const OwnerDashboard = lazy(() => import("../pages/owners/index"));
const OwnerRestaurant = lazy(() => import("../pages/owners/Restaurant"));
const OwnerMenu = lazy(() => import("../pages/owners/Menu"));
const OwnerOrderRequests = lazy(() => import("../pages/owners/OrderRequests"));

const NotFoundPage = lazy(() => import("../pages/NotFound"));

const AllRoutes = () => {
  const routes = useRoutes([
    {
      path: PUBLIC_ROUTE.HOME,
      element: <HomePage />,
    },
    {
      path: PUBLIC_ROUTE.SIGNIN,
      element: <LoginPage />,
    },
    {
      path: PUBLIC_ROUTE.SIGNUP,
      element: <RegisterPage />,
    },
    {
      path: PUBLIC_ROUTE.FORGOT_PASSWORD,
      element: <ForgotPasswordPage />,
    },
    {
      path: PUBLIC_ROUTE.SEARCH,
      element: <SearchPage />,
    },
    {
      path: PUBLIC_ROUTE.OFFERS,
      element: <OffersPage />,
    },
    {
      path: PRIVATE_ROUTE.USER_PROFILE,
      element: <ProfilePage />,
    },
    {
      path: `${PUBLIC_ROUTE.FOOD_COLLECTION}/:food`,
      element: <FoodCollectionPage />,
    },
    {
      path: `${PRIVATE_ROUTE.RESTAURANT}/:restaurantId`,
      element: <RestaurantPage />,
    },
    {
      path: `${PUBLIC_ROUTE.DINE_IN_RESTAURANT}/:restaurantId`,
      element: <DineInRestaurantPage />,
    },
    {
      path: PRIVATE_ROUTE.CART,
      element: <CartPage />,
    },
    {
      path: PUBLIC_ROUTE.HISTORY,
      element: <OrderHistoryPage />,
    },
    {
      path: `${PRIVATE_ROUTE.ORDER_PLACED}/:orderId`,
      element: <OrderPlacePage />,
    },
    {
      path: PUBLIC_ROUTE.RIDE_WITH_US,
      element: <RideWithUsPage />,
    },
    {
      path: PUBLIC_ROUTE.TERM_POLICY,
      element: <TermsConditionPage />,
    },
    {
      path: PUBLIC_ROUTE.PRIVACY_POLICY,
      element: <PrivacyPolicyPage />,
    },
    {
      path: PUBLIC_ROUTE.CONTACT_US,
      element: <ContactUsPage />,
    },
    {
      path: PUBLIC_ROUTE.ABOUT_US,
      element: <AboutUsPage />,
    },
    {
      path: PUBLIC_ROUTE.CAREERS,
      element: <CareersPage />,
    },
    { path: PRIVATE_ROUTE.DASHBOARD, element: <AdminDashboard /> },
    {
      path: PRIVATE_ROUTE.RESTAURANTS,
      element: <AdminRestaurants />,
    },
    {
      path: PRIVATE_ROUTE.FOODS,
      element: <AdminFoods />,
    },
    {
      path: PRIVATE_ROUTE.ORDERS,
      element: <AdminOrders />,
    },
    {
      path: PRIVATE_ROUTE.COUPON_CODES,
      element: <AdminCoupons />,
    },
    {
      path: PRIVATE_ROUTE.USERS,
      element: <AdminUsers />,
    },
    {
      path: PRIVATE_ROUTE.RIDER_REQUESTS,
      element: <AdminRiderRequests />,
    },
    {
      path: PRIVATE_ROUTE.JOBS,
      element: <AdminJobs />,
    },
    {
      path: PRIVATE_ROUTE.OWNER_DASHBOARD,
      element: <OwnerDashboard />,
    },
    {
      path: PRIVATE_ROUTE.RESTAURANT,
      element: <OwnerRestaurant />,
    },
    {
      path: PRIVATE_ROUTE.MENU,
      element: <OwnerMenu />,
    },
    {
      path: PRIVATE_ROUTE.ORDER_REQUESTS,
      element: <OwnerOrderRequests />,
    },
    {
      path: PRIVATE_ROUTE.RIDERS_DASHBOARD,
      element: <RidersDashboard />,
    },
    {
      path: PRIVATE_ROUTE.RIDERS,
      element: <RidersPage />,
    },
    {
      path: PUBLIC_ROUTE.NOT_FOUND,
      element: <NotFoundPage />,
    },
  ]);
  return routes;
};

export default AllRoutes;
