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

class FormService {
  async createForm(formName) {
    const result = new Result();
    try {
      const res = await axiosInstance.post("/create-form", formName);
      result.data = res.data.form;
    } catch (err) {
      result.error = err.response.data.error;
    }
    return result;
  }

  async getForms() {
    const result = new Result();
    try {
      const res = await axiosInstance.get("/get-forms");
      result.data = res.data.forms;
    } catch (err) {
      result.error = err.response.data.error;
    }
    return result;
  }

  async getFormDetails(formId) {
    const result = new Result();
    try {
      const res = await axiosInstance.get(`get-form/${formId}`);
      result.data = res.data.form;
    } catch (err) {
      result.error = err.response.data.error;
    }
    return result;
  }

  async deleteForm(formId) {
    const result = new Result();
    try {
      const res = await axiosInstance.delete(`delete-form/${formId}`);
      result.data = res.data.message;
    } catch (err) {
      result.error = err.response.data.error;
    }
    return result;
  }
  async updateForm(formId, formName, webhookUrl, returnUrl) {
    const result = new Result();
    try {
      const res = await axiosInstance.put(`update-form/${formId}`, {
        formName,
        webhookUrl,
        returnUrl,
      });
      result.data = res.data.message;
    } catch (err) {
      result.error = err.response.data.error;
    }
    return result;
  }

  async getSubmissions(formId) {
    const result = new Result();
    try {
      const res = await axiosInstance.get(`/submissions/${formId}`);
      result.data = res.data.submissions;
    } catch (err) {
      result.error = err.response.data.error;
    }
    return result;
  }
}

export default FormService;
