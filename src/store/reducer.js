export const ACTION_TYPES = {
  fetch_colors: "FETCH_COLORS",
  fetch_brands: "FETCH_BRANDS",
};

export const initialState = {
  products: [],
  brands: [],
  colors: [],
};

export default function reducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.fetch_colors:
      return {
        ...state,
        colors: action.payload,
      };
    case ACTION_TYPES.fetch_brands:
      return {
        ...state,
        brands: action.payload,
      };
    default:
      return state;
  }
}
