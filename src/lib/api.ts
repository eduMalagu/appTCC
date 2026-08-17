const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export const api = {
  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `API Error: ${response.status}`);
    }

    return response.json();
  },

  restaurantes: {
    getAll() {
      return api.request('/restaurantes');
    },

    getById(id: string | number) {
      return api.request(`/restaurantes/${id}`);
    },

    create(data: any) {
      return api.request('/restaurantes', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },

    update(id: string | number, data: any) {
      return api.request(`/restaurantes/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },

    delete(id: string | number) {
      return api.request(`/restaurantes/${id}`, {
        method: 'DELETE',
      });
    },
  },

  produtos: {
    getByRestaurante(restauranteId: string | number) {
      return api.request(`/produtos/restaurante/${restauranteId}`);
    },

    getById(id: string | number) {
      return api.request(`/produtos/${id}`);
    },

    create(data: any) {
      return api.request('/produtos', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },

    update(id: string | number, data: any) {
      return api.request(`/produtos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },

    delete(id: string | number) {
      return api.request(`/produtos/${id}`, {
        method: 'DELETE',
      });
    },
  },

  pedidos: {
    getAll() {
      return api.request('/pedidos');
    },

    getMeus() {
      return api.request('/pedidos/meus');
    },

    getById(id: string | number) {
      return api.request(`/pedidos/${id}`);
    },

    create(data: any) {
      return api.request('/pedidos', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },

    updateStatus(id: string | number, status: string) {
      return api.request(`/pedidos/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
    },

    delete(id: string | number) {
      return api.request(`/pedidos/${id}`, {
        method: 'DELETE',
      });
    },
  },

  usuarios: {
    login(email: string, senha: string) {
      return api.request('/usuarios/login', {
        method: 'POST',
        body: JSON.stringify({ email, senha }),
      });
    },

    registrar(nome: string, email: string, senha: string) {
      return api.request('/usuarios/registrar', {
        method: 'POST',
        body: JSON.stringify({ nome, email, senha }),
      });
    },

    getById(id: string | number) {
      return api.request(`/usuarios/${id}`);
    },

    update(id: string | number, data: any) {
      return api.request(`/usuarios/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },
  },
};
