import { lazy } from "react";
import { useRoutes } from "react-router-dom";
import { PRIVATE_ROUTE, PUBLIC_ROUTE, USER_ROLE } from "../enums";
import ProtectedRoute from "./ProtectedRoutes";

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

const UnauthorizedPage = lazy(() => import("../pages/Unauthorized"));

const NotFoundPage = lazy(() => import("../pages/NotFound"));

const AllRoutes = () => {
  const routes = useRoutes([
    {
      path: PUBLIC_ROUTE.HOME,
      element: (
        <ProtectedRoute
          element={<HomePage />}
          allowedRoles={[USER_ROLE.USER]}
        />
      ),
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
      element: (
        <ProtectedRoute
          element={<SearchPage />}
          allowedRoles={[USER_ROLE.USER]}
        />
      ),
    },
    {
      path: PUBLIC_ROUTE.OFFERS,
      element: (
        <ProtectedRoute
          element={<OffersPage />}
          allowedRoles={[USER_ROLE.USER]}
        />
      ),
    },
    {
      path: PRIVATE_ROUTE.USER_PROFILE,
      element: <ProfilePage />,
    },
    {
      path: `${PUBLIC_ROUTE.FOOD_COLLECTION}/:food`,
      element: (
        <ProtectedRoute
          element={<FoodCollectionPage />}
          allowedRoles={[USER_ROLE.USER]}
        />
      ),
    },
    {
      path: `${PRIVATE_ROUTE.RESTAURANT}/:restaurantId`,
      element: (
        <ProtectedRoute
          element={<RestaurantPage />}
          allowedRoles={[
            USER_ROLE.USER,
            USER_ROLE.ADMIN,
            USER_ROLE.RIDER,
            USER_ROLE.OWNER,
          ]}
        />
      ),
    },
    {
      path: `${PUBLIC_ROUTE.DINE_IN_RESTAURANT}/:restaurantId`,
      element: (
        <ProtectedRoute
          element={<DineInRestaurantPage />}
          allowedRoles={[USER_ROLE.USER]}
        />
      ),
    },
    {
      path: PRIVATE_ROUTE.CART,
      element: (
        <ProtectedRoute
          element={<CartPage />}
          allowedRoles={[USER_ROLE.USER]}
        />
      ),
    },
    {
      path: PUBLIC_ROUTE.HISTORY,
      element: (
        <ProtectedRoute
          element={<OrderHistoryPage />}
          allowedRoles={[USER_ROLE.USER]}
        />
      ),
    },
    {
      path: `${PRIVATE_ROUTE.ORDER_PLACED}/:orderId`,
      element: (
        <ProtectedRoute
          element={<OrderPlacePage />}
          allowedRoles={[USER_ROLE.USER]}
        />
      ),
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
    {
      path: PRIVATE_ROUTE.DASHBOARD,
      element: (
        <ProtectedRoute
          element={<AdminDashboard />}
          allowedRoles={[USER_ROLE.ADMIN]}
        />
      ),
    },
    {
      path: PRIVATE_ROUTE.RESTAURANTS,
      element: (
        <ProtectedRoute
          element={<AdminRestaurants />}
          allowedRoles={[USER_ROLE.ADMIN]}
        />
      ),
    },
    {
      path: PRIVATE_ROUTE.FOODS,
      element: (
        <ProtectedRoute
          element={<AdminFoods />}
          allowedRoles={[USER_ROLE.ADMIN]}
        />
      ),
    },
    {
      path: PRIVATE_ROUTE.ORDERS,
      element: (
        <ProtectedRoute
          element={<AdminOrders />}
          allowedRoles={[USER_ROLE.ADMIN]}
        />
      ),
    },
    {
      path: PRIVATE_ROUTE.COUPON_CODES,
      element: (
        <ProtectedRoute
          element={<AdminCoupons />}
          allowedRoles={[USER_ROLE.ADMIN]}
        />
      ),
    },
    {
      path: PRIVATE_ROUTE.USERS,
      element: (
        <ProtectedRoute
          element={<AdminUsers />}
          allowedRoles={[USER_ROLE.ADMIN]}
        />
      ),
    },
    {
      path: PRIVATE_ROUTE.RIDER_REQUESTS,
      element: (
        <ProtectedRoute
          element={<AdminRiderRequests />}
          allowedRoles={[USER_ROLE.ADMIN]}
        />
      ),
    },
    {
      path: PRIVATE_ROUTE.JOBS,
      element: (
        <ProtectedRoute
          element={<AdminJobs />}
          allowedRoles={[USER_ROLE.ADMIN]}
        />
      ),
    },
    {
      path: PRIVATE_ROUTE.OWNER_DASHBOARD,
      element: (
        <ProtectedRoute
          element={<OwnerDashboard />}
          allowedRoles={[USER_ROLE.OWNER]}
        />
      ),
    },
    {
      path: PRIVATE_ROUTE.RESTAURANT,
      element: (
        <ProtectedRoute
          element={<OwnerRestaurant />}
          allowedRoles={[USER_ROLE.OWNER]}
        />
      ),
    },
    {
      path: PRIVATE_ROUTE.MENU,
      element: (
        <ProtectedRoute
          element={<OwnerMenu />}
          allowedRoles={[USER_ROLE.OWNER]}
        />
      ),
    },
    {
      path: PRIVATE_ROUTE.ORDER_REQUESTS,
      element: (
        <ProtectedRoute
          element={<OwnerOrderRequests />}
          allowedRoles={[USER_ROLE.OWNER]}
        />
      ),
    },
    {
      path: PRIVATE_ROUTE.RIDERS_DASHBOARD,
      element: (
        <ProtectedRoute
          element={<RidersDashboard />}
          allowedRoles={[USER_ROLE.RIDER]}
        />
      ),
    },
    {
      path: PRIVATE_ROUTE.RIDERS,
      element: (
        <ProtectedRoute
          element={<RidersPage />}
          allowedRoles={[USER_ROLE.RIDER]}
        />
      ),
    },
    {
      path: PUBLIC_ROUTE.UNAUTHORIZED,
      element: <UnauthorizedPage />,
    },
    {
      path: PUBLIC_ROUTE.NOT_FOUND,
      element: <NotFoundPage />,
    },
  ]);
  return routes;
};

export default AllRoutes;
