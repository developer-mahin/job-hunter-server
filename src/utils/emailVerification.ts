/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from 'nodemailer';
import config from '../config';

type TMailData = {
  email: string;
  subject: string;
  html: string;
};

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: config.smtp_user,
    pass: config.smtp_password,
  },
});

const emailVerification = async (mailData: TMailData) => {
  try {
    const mailOption = {
      from: config.smtp_user,
      to: mailData.email,
      subject: mailData.subject,
      html: mailData.html,
    };

    const info = await transporter.sendMail(mailOption);
    console.log('message %s', info.messageId);
  } catch (error: any) {
    throw new Error(error);
  }
};

export default emailVerification;
