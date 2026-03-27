import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.GOOGLE_USER,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    accessToken: process.env.GOOGLE_ACCESS_TOKEN
  },
});

transporter.verify()
  .then(() => {
    console.log("✅ Email transporter is ready");
  })
  .catch((err) => {
    console.error("❌ Verification failed:", err);
  });



export async function SendEmail({ to, subject, html, text = "" }) {

  const mailOptions = {
    from: process.env.GOOGLE_USER,
    to,
    subject,
    html,
    text
  };

  const details = await transporter.sendMail(mailOptions);
  console.log("Email sent:", details.response);
  return "email sent successfully, to " + to;
}



// import dotenv from "dotenv";
// dotenv.config();

// import nodemailer from "nodemailer";

// console.log("MAIL USER:", process.env.GOOGLE_USER);
// console.log("MAIL PASS:", process.env.GOOGLE_PASS);

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.GOOGLE_USER,
//     pass: process.env.GOOGLE_PASS,
//   },
// });

// export async function SendEmail({ to, subject, html, text }) {
//   const mailOption = {
//     from: process.env.GOOGLE_USER,
//     to,
//     subject,
//     text,
//     html,
//   };

//   const details = await transporter.sendMail(mailOption);
//   console.log("Mail details:", details.response);

//   return details;
// }