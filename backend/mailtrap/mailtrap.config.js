
import { MailtrapClient } from "mailtrap"
import dotenv from "dotenv"

dotenv.config();
const TOKEN = process.env.MAILTRAP_TOKEN;
const ENDPOINT = process.env.MAILTRAP_ENDPOINT;

const client = new MailtrapClient({
    endpoint: 'https://send.api.mailtrap.io/api/send',
    token: TOKEN
});

const sender = {
  email: "solofoniainarakotoharimanana@gmail.com",
  name: "Project request",
};
const recipients = [
  {
    email: "solofoniainarakotoharimanana@gmail.com",
  }
];

client
  .send({
    from: sender,
    to: recipients,
    subject: "You are awesome!",
    text: "Congrats for sending test email with Mailtrap!",
    category: "Integration Test",
  })
  .then(console.log, console.error);