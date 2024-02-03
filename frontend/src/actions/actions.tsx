export const addCategoryOffline = (content: any) => ({
  type: "ADD_CATEGORY_TO_BACKEND",
  payload: {
    content,
  },
  meta: {
    offline: {
      effect: {
        url: "http://localhost:3001/categories",
        method: "POST",
        body: content,
        headers: { "content-type": "application/json" },
      },
      commit: { type: "ADD_CATEGORY_TO_BACKEND", meta: { content } },
    //   rollback: { type: "ADD_TODO_ROLLBACK", meta: { content } },
    },
  },
});

export const deleteCategoryOffline = (categoryId: any) => ({
  type: "DELETE_CATEGORY_TO_BACKEND",
  payload: {
    categoryId,
  },
  meta: {
    offline: {
      effect: {
        url: `http://localhost:3001/categories/${categoryId}/delete`,
        method: "POST",
        headers: { "content-type": "application/json" },
      },
      commit: { type: "DELETE_CATEGORY_TO_BACKEND"},
    },
  },
});

export const updateCategoryOffline = (categoryId: any, content: any) => ({
  type: "UPDATE_CATEGORY_TO_BACKEND",
  payload: {
    categoryId,
    content,
  },
  meta: {
    offline: {
      effect: {
        url: `http://localhost:3001/categories/${categoryId}/update`,
        method: "POST",
        body: JSON.stringify(content),
        headers: { "content-type": "application/json" },
      },
      commit: { type: "UPDATE_CATEGORY_TO_BACKEND", meta: { content } },
    },
  },
});

export const addCategoryToReduxState = (categories: any) => ({
  type: "ADD_CATEGORY",
  payload: {
    categories,
  },
});

export const addProductOffline = (content: any) => ({
  type: "ADD_PRODUCT_TO_BACKEND",
  payload: {
    content,
  },
  meta: {
    offline: {
      effect: {
        url: "http://localhost:3001/products",
        method: "POST",
        body: content,
        headers: { "content-type": "application/json" },
      },
    },
  },
});

export const updateProductOffline = (productId: any, content: any) => ({
  type: "UPDATE_PRODUCT_TO_BACKEND",
  payload: {
    productId,
    content,
  },
  meta: {
    offline: {
      effect: {
        url: `http://localhost:3001/products/${productId}/update`,
        method: "POST",
        body: JSON.stringify(content),
        headers: { "content-type": "application/json" },
      },
      commit: { type: "UPDATE_PRODUCT_TO_BACKEND", meta: { content } },
    },
  },
});

export const deleteProductOffline = (productId: any) => ({
  type: "DELETE_PRODUCT_TO_BACKEND",
  payload: {
    productId,
  },
  meta: {
    offline: {
      effect: {
        url: `http://localhost:3001/products/${productId}/delete`,
        method: "POST",
        headers: { "content-type": "application/json" },
      },
      commit: { type: "DELETE_PRODUCT_TO_BACKEND" },
    },
  },
});

export const addProductToReduxState = (products: any) => ({
  type: "ADD_PRODUCT",
  payload: {
    products,
  },
});

export const addItemOffline = (content: any) => ({
  type: "ADD_ITEM_TO_BACKEND",
  payload: {
    content,
  },
  meta: {
    offline: {
      effect: {
        url: "http://localhost:3001/items",
        method: "POST",
        body: content,
        headers: { "content-type": "application/json" },
      },
      commit: { type: "ADD_ITEM_TO_BACKEND", meta: { content } },
    },
  },
});

export const deleteItemOffline = (itemId: any) => ({
  type: "DELETE_ITEM_TO_BACKEND",
  payload: {
    itemId,
  },
  meta: {
    offline: {
      effect: {
        url: `http://localhost:3001/items/${itemId}/delete`,
        method: "POST",
        headers: { "content-type": "application/json" },
      },
      commit: { type: "DELETE_ITEM_TO_BACKEND" },
    },
  },
});

export const updateItemOffline = (itemId: any, content: any) => ({
  type: "UPDATE_ITEM_TO_BACKEND",
  payload: {
    itemId,
    content,
  },
  meta: {
    offline: {
      effect: {
        url: `http://localhost:3001/items/${itemId}/update`,
        method: "POST",
        body: JSON.stringify(content),
        headers: { "content-type": "application/json" },
      },
      commit: { type: "UPDATE_ITEM_TO_BACKEND", meta: { content } },
    },
  },
});

export const addItemToReduxState = (items: any) => ({
  type: "ADD_ITEM",
  payload: {
    items,
  },
});