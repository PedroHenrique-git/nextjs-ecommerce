import api from '@sdk/api/api';

class SessionService {
  private get headersAdmin() {
    const headers = new Headers();

    headers.set('auth-context', 'admin');

    return headers;
  }

  private get headersClient() {
    const headers = new Headers();

    headers.set('auth-context', 'client');

    return headers;
  }

  async loginAdmin(
    email: string,
    password: string,
  ): Promise<{ access_token: string } | Record<string, RequestError>> {
    return api
      .post('auth/login-admin', {
        json: {
          email,
          password,
        },
        headers: this.headersAdmin,
      })
      .json();
  }

  logoutAdmin(): Promise<{ logout: true }> {
    return api.get('auth/logout-admin', { headers: this.headersAdmin }).json();
  }

  loggedAdmin(): Promise<{ admin: AuthUser }> {
    return api
      .get('auth/logged-admin', {
        headers: this.headersAdmin,
      })
      .json();
  }

  loggedClient(): Promise<{ user: AuthUser }> {
    return api
      .get('auth/logged-client', {
        headers: this.headersClient,
      })
      .json();
  }
}

export default SessionService;
