export const enum PUBLIC_ROUTE {
  HOME = "/",
  NOT_FOUND = "*",
  UNAUTHORIZED = "/unauthorized",
  SIGNIN = "/signin",
  SIGNUP = "/signup",
  FORGOT_PASSWORD = "/forgot-password",
  FOOD_COLLECTION = "/food-collection",
  DINE_IN_RESTAURANT = "/restaurant/dine-in",
  SEARCH = "/search",
  OFFERS = "/offers",
  HISTORY = "/order-history",
  ABOUT_US = "/about",
  CAREERS = "/careers",
  CONTACT_US = "/contact-us",
  RIDE_WITH_US = "/ride-with-us",
  PRIVACY_POLICY = "/privacy",
  TERM_POLICY = "/terms",
}

export const enum PRIVATE_ROUTE {
  DASHBOARD = "/dashboard",
  USER_PROFILE = "/profile",
  CART = "/cart",
  RESTAURANTS = "/restaurants",
  FOODS = "/foods",
  USERS = "/users",
  COUPON_CODES = "/coupon-codes",
  RIDER_REQUESTS = "/rider-requests",
  JOBS = "/jobs",
  ORDERS = "/orders",
  ORDER_PLACED = "/order-placed",

  OWNER_DASHBOARD = "/owner/dashboard",
  RESTAURANT = "/restaurant",
  MENU = "/menu",
  ORDER_REQUESTS = "/order-requests",

  RIDERS_DASHBOARD = "/riders/dashboard",
  RIDERS = "/riders/rides",
}

export const enum USER_ROLE {
  ADMIN = 1,
  USER = 2,
  RIDER = 3,
  OWNER = 4,
}

export const enum BUTTON_TYPE {
  SUBMIT = "submit",
  BUTTON = "button",
  RESET = "reset",
}

export const enum BUTTON_VARIANT {
  CONTAINED = "contained",
  OUTLINED = "outlined",
  TEXT = "text",
}

export const enum COLOR {
  ERROR = "error",
  SUCCESS = "success",
  WARNING = "warning",
  INFO = "info",
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

export const enum INPUT_VARIANT {
  FILLED = "filled",
  OUTLINED = "outlined",
  STANDARD = "standard",
}

export const enum INPUT_TYPE {
  EMAIL = "email",
  TEXT = "text",
  PASSWORD = "password",
  CHECKBOX = "checkbox",
  FILE = "file",
  IMAGE = "image",
  BUTTON = "button",
  DATE = "date",
  NUMBER = "number",
  RADIO = "radio",
  SEARCH = "search",
  TEL = "tel",
}

export const enum INPUT_SIZE {
  SMALL = "small",
  MEDIUM = "medium",
}

export const enum RESTAURANT_TYPE {
  VEG = "veg",
  NON_VEG = "nonVeg",
}

export const enum RESTAURANT_MODE {
  ONLINE = "online",
  DINE_IN = "dine",
}

export const enum FOOD_CARD_TYPE {
  TOP_PICK = "top",
  LIST = "list",
}

export const enum TABLE_NAME {
  RESTAURANTS = "restaurants",
  FOODS = "foods",
  COUPONS = "coupons",
  ORDERS = "orders",
  JOBS = "jobs",
  USERS = "users",
  MENU = "menu",
}

export const enum STATUS {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export const enum ORDER_STATUS {
  PREPARING = 1,
  READY_FOR_PICKUP = 2,
  OUT_FOR_DELIVERY = 3,
  DELIVERED = 4,
  CANCELLED = 5,
  ORDER_PLACED = 6,
  ORDER_REJECTED = 7,
}
