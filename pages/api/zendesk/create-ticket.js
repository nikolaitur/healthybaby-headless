/* /api/zendesk */
import axios from 'axios'

export default async function handler(req, res) {
  const { subject, message, email, name, order_number, phone_number } = JSON.parse(req.body)

  const body = {
    "ticket": {
      "subject": subject,
      "comment": {
        "body": message
      },
      "recipient": email,
      "requester": { "name": name, "email": email },
      "custom_fields" : [
        {
          "name": name,
          "order_number": order_number,
          "phone_number": phone_number
        }
      ]
    }
  }

  axios.post('https://{{ domain }}.zendesk.com/api/v2/tickets.json', JSON.stringify(body), {
    headers: {
      'Content-Type': 'application/json'
    },
    auth: {
      'username': '',
      'password': process.env.NEXT_PUBLIC_ZENDESK_TOKEN
    }
  })
  .then((response) => {
    res.status(201).json({ message: 'success', data: response.data });
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json({ message: 'error', data: err });
  });
};