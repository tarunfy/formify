import FormModel from "../models/form.js";
import SubmissionModel from "../models/submission.js";
import UserModel from "../models/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import axios from "axios";

dotenv.config();
const privateKey = process.env.PRIVATE_KEY;

export const createForm = (req, res) => {
  const { formName } = req.body;

  const token = req.cookies["access_token"];

  if (!token) {
    return res.status(401).json({ error: "Token invalid" });
  }

  jwt.verify(token, privateKey, async (err, decode) => {
    if (err) {
      return res.status(401).json({ error: "Token invalid" });
    }
    try {
      const form = await FormModel.create({
        formName,
        userId: decode.userId,
        createdAt: new Date(),
      });
      return res.status(200).json({ form });
    } catch (err) {
      res.status(401).json({ error: "User doesn't exists with that userId" });
    }
  });
};

export const getForms = (req, res) => {
  const token = req.cookies["access_token"];

  if (!token) {
    return res.status(401).json({ error: "Token invalid" });
  }

  jwt.verify(token, privateKey, async (err, decode) => {
    if (err) {
      return res.status(401).json({ error: "Token invalid" });
    }
    try {
      const forms = await FormModel.find({ userId: decode.userId });
      return res.status(200).json({ forms });
    } catch (err) {
      res.status(401).json({ error: "User doesn't exists with that userId" });
    }
  });
};

export const getForm = async (req, res) => {
  const formId = req.params.id;
  const token = req.cookies["access_token"];

  if (!token) {
    return res.status(401).json({ error: "Token invalid" });
  }

  jwt.verify(token, privateKey, async (err, decode) => {
    if (err) {
      return res.status(401).json({ error: "Token invalid" });
    }
    try {
      const form = await FormModel.findById(formId);
      return res.status(200).json({ form });
    } catch (err) {
      res.status(401).json({ error: "User doesn't exists with that userId" });
    }
  });
};

export const deleteForm = async (req, res) => {
  const formId = req.params.id;
  const token = req.cookies["access_token"];

  if (!token) {
    return res.status(401).json({ error: "Token invalid" });
  }

  jwt.verify(token, privateKey, async (err, decode) => {
    if (err) {
      return res.status(401).json({ error: "Token invalid" });
    }
    try {
      const form = await FormModel.findByIdAndDelete(formId);
      const submissions = await SubmissionModel.find({ formId });
      submissions.map(async (sub) => {
        const deleteSub = await SubmissionModel.findByIdAndDelete(sub._id);
      });
      return res.status(200).json({ message: "Form deleted" });
    } catch (err) {
      res.status(401).json({ error: "User doesn't exists with that userId" });
    }
  });
};

export const updateForm = async (req, res) => {
  const formId = req.params.id;
  const { formName, webhookUrl, returnUrl } = req.body;
  const token = req.cookies["access_token"];

  if (!token) {
    return res.status(401).json({ error: "Token invalid" });
  }

  jwt.verify(token, privateKey, async (err, decode) => {
    if (err) {
      return res.status(401).json({ error: "Token invalid" });
    }
    try {
      if (formName && webhookUrl) {
        const updatedForm = await FormModel.findByIdAndUpdate(formId, {
          formName,
          webhookUrl,
        });
      }
      if (formName && returnUrl) {
        const updatedForm = await FormModel.findByIdAndUpdate(formId, {
          formName,
          returnUrl,
        });
      }
      if (webhookUrl && returnUrl) {
        const updatedForm = await FormModel.findByIdAndUpdate(formId, {
          webhookUrl,
          returnUrl,
        });
      }
      if (formName) {
        const updatedForm = await FormModel.findByIdAndUpdate(formId, {
          formName,
        });
      } else if (returnUrl) {
        const updatedForm = await FormModel.findByIdAndUpdate(formId, {
          returnUrl,
        });
      } else if (webhookUrl) {
        const updatedForm = await FormModel.findByIdAndUpdate(formId, {
          webhookUrl,
        });
      } else {
        const updatedForm = await FormModel.findByIdAndUpdate(formId, {
          formName,
          webhookUrl,
          returnUrl,
        });
      }
      return res.status(200).json({ message: "Form updated" });
    } catch (err) {
      res.status(401).json({ error: "User doesn't exists with that userId" });
    }
  });
};

export const handleSubmission = async (req, res) => {
  const data = req.body;
  const formId = req.params.id;

  try {
    const submission = await SubmissionModel.create({
      ...data,
      formId,
      submittedAt: new Date(),
    });

    const form = await FormModel.findById(formId);
    const formName = form.formName;
    const webhookUrl = form.webhookUrl;
    const returnUrl = form.returnUrl;
    const user = await UserModel.findById(form.userId);
    const email = user.email;

    delete submission._id;
    delete submission.__v;
    delete submission.formId;
    delete submission.submittedAt;

    let fields = [];

    let keys = Object.keys(submission).filter(
      (value) =>
        value !== "$__" &&
        value !== "$isNew" &&
        value !== "_doc" &&
        value !== "$errors"
    );

    for (let index = 0; index < keys.length; index++) {
      fields.push({
        name: keys[index],
        value: submission[keys[index]],
      });
    }

    if (webhookUrl) {
      await axios.post(webhookUrl, {
        content: null,
        embeds: [
          {
            title: `Hey ${user.fullName} new submission recieved on Register form`,
            color: 1953294,
            fields: fields,
            footer: {
              text: "2022, formify.",
            },
            timestamp: new Date(),
          },
        ],
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      name: "formify",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: `New Submission Recieved`,
      text: `New Submission Recieved`,
      html: `
      <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div style="background-image:url('https://miro.medium.com/max/3002/1*dP81IJq-tGFxy1rIK3RYsg.png');background-color:#3ac5fc;background-position:center center;background-size:cover;background-repeat:repeat;padding-bottom:50px">
    <table border="0" cellpadding="0" cellspacing="0">
    <tbody>
    <tr>
    <td colspan="3" height="50"></td>
    </tr>
    </tbody>
    </table>
      <div  style="" >
        <div style="background:#fff;background-color:#fff;Margin:0px auto;border-radius:6px;max-width:600px">
          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#fff;background-color:#fff;width:100%;height:80%;border-radius:6px">
          <tbody>
            <tr>
              <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top">
                 <div style="margin:0 auto;max-width:600px">
                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%">
                    <tbody><tr style="vertical-align:top">
                      <td style="background:#ffffff;background-position:center center;background-repeat:no-repeat;padding:0px;vertical-align:top" height="0">
                        <div style="margin:0px auto">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;margin:0px">
                            <tbody><tr>
                              <td>
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;margin:0px">
                                  
                                  <tbody><tr>
                                    <td align="center" style="font-size:0px;padding:0px 25px;word-break:break-word">
                                      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px">
                                        <tbody>
                                          <tr>
                                            <td style="width:360px">
                                              <h1 style="text-align:center;font-size:50px;font-weight:800;" width="360px">&#60;formify&#62;</h1>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody></table>
                              </td>
                            </tr>
                          </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                  </table>
                </div>
                <div style="Margin:0px auto;max-width:600px">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%">
                    <tbody>
                      <tr>
                        <td style="direction:ltr;font-size:0px;padding:0;text-align:center;vertical-align:top">
                          <div style="font-size:35px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top" width="100%">
                              <tbody><tr>
                                <td align="left" style="font-size:0px;padding:0px 25px;word-break:break-word">
                                  <div style="font-family:Montserrat,Arial,Tahoma,Geneva,sans-serif;font-size:34px;line-height:1;text-align:center;color:#000000">
                                    <p> 
                                       Hey ${user.fullName} new submission recieved on ${formName} form
                                    </p>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td align="left" style="font-size:0px;padding:10px 25px;padding-top:15px;word-break:break-word">
                                  <div style="font-family:Montserrat,Arial,Tahoma,Geneva,sans-serif;font-size:18px;font-weight:600;line-height:1;text-align:center;color:#9798a4">
                                     2022,
                                    formify. 
                                  </div>
                                </td>
                              </tr>
                            </tbody></table>
                          </div> 
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>   
              </td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
    </div>
  </body>
</html>
      `,
    };

    const response = await transporter.sendMail(mailOptions);

    if (returnUrl) {
      return res.redirect(returnUrl);
    }

    return res
      .status(200)
      .json({ message: "We have recieved your submission." });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Something went wrong Oops!" });
  }
};

export const getSubmissions = async (req, res) => {
  const formId = req.params.id;
  const token = req.cookies["access_token"];

  if (!token) {
    return res.status(401).json({ error: "Token invalid" });
  }
  try {
    const submissions = await SubmissionModel.find({ formId });
    return res.status(200).json({ submissions });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: "Token invalid" });
  }
};
