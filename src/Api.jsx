export const API_URL = "https://apicontas.megalinkpiaui.com.br:8443";

export function TOKEN_POST(body) {
  return {
    url: API_URL + "/login",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}

export function TOKEN_VALIDATE_POST(token) {
  return {
    url: API_URL + "/token/validate",
    options: {
      method: "POST",
      headers: {
        Authorization: token,
      },
    },
  };
}

export function USER_GET(token) {
  return {
    url: API_URL + "/user/info",
    options: {
      method: "GET",
      headers: {
        Authorization: token,
      },
    },
  };
}

export function USER_POST(body) {
  return {
    url: API_URL + "/user/create",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}

export function PASSWORD_LOST(body) {
  return {
    url: API_URL + "/user/password/lost",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}

export function FORNECEDOR_GET(token) {
  return {
    url: API_URL + "/api/fornecedor",
    options: {
      method: "GET",
      headers: {
        Authorization: token,
      },
    },
  };
}

export function APROVADOR_GET(token) {
  return {
    url: API_URL + "/api/aprovador",
    options: {
      method: "GET",
      headers: {
        Authorization: token,
      },
    },
  };
}

export function CONTA_POST(token, data, file) {
  const formData = new FormData();
  const jsonData = data;
  formData.append("json", JSON.stringify(jsonData));
  formData.append("file", file);
  return {
    url: API_URL + "/conta",
    options: {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: formData,
    },
  };
}

export function CONTA_GET(token) {
  return {
    url: API_URL + "/conta/lista",
    options: {
      method: "GET",
      headers: {
        Authorization: token,
      },
    },
  };
}

export function CENTRO_GET(token) {
  return {
    url: API_URL + "/api/centro",
    options: {
      method: "GET",
      headers: {
        Authorization: token,
      },
    },
  };
}

export function STATUS_POST(token, body) {
  return {
    url: API_URL + "/conta/alterstatus",
    options: {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}
