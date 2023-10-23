import { GRAPHQL_SERVER, TOKEN_KEY } from "./constant";

export const graphQLRequest = async (payload, options = {}) => {
  if (localStorage.getItem(TOKEN_KEY)) {
    const res = await fetch(`${GRAPHQL_SERVER}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
        ...options,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      if (res.status === 403) {
        return null;
      }
    }

    const { data } = await res.json();
    return data;
  }

  return null;
};
