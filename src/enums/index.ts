export enum PUBLIC_ROUTE {
  HOME = "/",
  NOT_FOUND = "*",
  SIGNIN = "/signin",
  SIGNUP = "/signup",
  FORGOT_PASSWORD = "/forgot-password",
  FOOD_COLLECTION = "/food-collection",
  RESTAURANT = "/restaurant",
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

export enum PRIVATE_ROUTE {
  DASHBOARD = "/dashboard",
  USER_PROFILE = "/profile",
  CART = "/cart",
  RESTAURANTS = "/restaurants",
  FOODS = "/foods",
  USERS = "/users",
  COUPON_CODES = "/coupon-codes",
  RIDER_REQUESTS = "/rider-requests",
  JOBS = "/jobs",
}

export enum USER_ROLE {
  ADMIN = "admin",
  USER = "user",
}

export enum BUTTON_TYPE {
  SUBMIT = "submit",
  BUTTON = "button",
  RESET = "reset",
}

export enum BUTTON_VARIANT {
  CONTAINED = "contained",
  OUTLINED = "outlined",
  TEXT = "text",
}

export enum COLOR {
  ERROR = "error",
  SUCCESS = "success",
  WARNING = "warning",
  INFO = "info",
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

export enum INPUT_VARIANT {
  FILLED = "filled",
  OUTLINED = "outlined",
  STANDARD = "standard",
}

export enum INPUT_TYPE {
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

export enum INPUT_SIZE {
  SMALL = "small",
  MEDIUM = "medium",
}

export enum RESTAURANT_TYPE {
  VEG = "veg",
  NON_VEG = "non-veg",
}

export enum RESTAURANT_MODE {
  ONLINE = "online",
  DINE_IN = "dine",
}

export enum FOOD_CARD_TYPE {
  TOP_PICK = "top",
  LIST = "list",
}

export enum TABLE_NAME {
  RESTAURANTS = "restaurants",
  FOODS = "foods",
  COUPONS = "coupons",
  JOBS = "jobs",
  USERS = "users",
}

export enum STATUS {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}
