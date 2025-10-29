import { lazy } from "react";
import { useRoutes } from "react-router-dom";
import { PRIVATE_ROUTE, PUBLIC_ROUTE } from "../enums";

const LoginPage = lazy(() => import("../pages/auth/Login"));
const RegisterPage = lazy(() => import("../pages/auth/Register"));
const ForgotPasswordPage = lazy(() => import("../pages/auth/ForgotPassword"));
const HomePage = lazy(() => import("../pages/Home"));
const SearchPage = lazy(() => import("../pages/Search"));
const OffersPage = lazy(() => import("../pages/Offers"));
const ProfilePage = lazy(() => import("../pages/Profile"));
const FoodCollectionPage = lazy(() => import("../pages/FoodCollection"));
const RestaurantPage = lazy(() => import("../pages/restaurant/Restaurant"));
const DineInRestaurantPage = lazy(
  () => import("../pages/restaurant/DineInRestaurant")
);
const CartPage = lazy(() => import("../pages/Cart"));
const OrderHistoryPage = lazy(() => import("../pages/OrderHistory"));

const TermsConditionPage = lazy(() => import("../pages/footer/TermsCondition"));
const PrivacyPolicyPage = lazy(() => import("../pages/footer/PrivacyPolicy"));
const ContactUsPage = lazy(() => import("../pages/footer/ContactUs"));
const RideWithUsPage = lazy(() => import("../pages/footer/RideWithUs"));
const AboutUsPage = lazy(() => import("../pages/footer/About"));
const CareersPage = lazy(() => import("../pages/footer/Careers"));

const AdminDashboard = lazy(() => import("../pages/admin/Dashboard"));
const AdminRestaurants = lazy(() => import("../pages/admin/Restaurants"));
const AdminFoods = lazy(() => import("../pages/admin/Foods"));
const AdminCoupons = lazy(() => import("../pages/admin/Coupons"));
const AdminUsers = lazy(() => import("../pages/admin/Users"));
const AdminRiderRequests = lazy(() => import("../pages/admin/RiderRequests"));
const AdminJobs = lazy(() => import("../pages/admin/Jobs"));

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
      path: `${PUBLIC_ROUTE.RESTAURANT}/:restaurantId`,
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
      path: PUBLIC_ROUTE.NOT_FOUND,
      element: <NotFoundPage />,
    },
  ]);
  return routes;
};

export default AllRoutes;
