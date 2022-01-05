import { axiosInstance } from "../api";

class Result {
  data = null;
  error = null;

  hasError() {
    return this.error != null;
  }

  isSuccessful() {
    return this.error == null;
  }
}

class AuthService {
  async signIn(creds) {
    const result = new Result();
    try {
      const response = await axiosInstance.post("/signin", creds);
      result.data = response.data.user;
    } catch (error) {
      result.error = error.response.data.error;
    }
    return result;
  }

  async signUp(creds) {
    const result = new Result();
    try {
      const response = await axiosInstance.post("/signup", creds);
      result.data = response.data.user;
    } catch (error) {
      result.error = error.response.data.error;
    }

    return result;
  }

  async signOut() {
    return axiosInstance.get("/logout");
  }

  async getCurrentUser() {
    return axiosInstance.get("/current-user");
  }

  async forgotPassword(email) {
    const result = new Result();
    try {
      const res = await axiosInstance.post("/forgot-password", { email });
      result.data = res.data.message;
    } catch (err) {
      result.error = err.response.data.error;
    }
    return result;
  }

  async resetPassword({ password, confirmPassword, token }) {
    const result = new Result();
    try {
      const res = await axiosInstance.post("/reset-password", {
        password,
        confirmPassword,
        token,
      });
      result.data = res.data.message;
    } catch (err) {
      result.error = err.response.data.error;
    }
    return result;
  }
}

export default AuthService;
