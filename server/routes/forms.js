import express from "express";
import {
  createForm,
  getForms,
  getForm,
  deleteForm,
  updateForm,
  handleSubmission,
  getSubmissions,
} from "../controllers/form.js";

const router = express.Router();

router.post("/f/:id", handleSubmission);
router.post("/create-form", createForm);
router.get("/get-forms", getForms);
router.get("/get-form/:id", getForm);
router.get("/submissions/:id", getSubmissions);
router.delete("/delete-form/:id", deleteForm);
router.put("/update-form/:id", updateForm);

export default router;
