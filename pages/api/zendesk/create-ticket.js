/* /api/zendesk */
import axios from 'axios'

export default async function handler(req, res) {
  const { subject, message, email, name, order_number, phone_number } = JSON.parse(req.body)

  const body = {
    "ticket": {
      "status": "new",
      "subject": subject,
      "is_public": true,
      "comment": {
        "body": message,
        "public": true
      },
      "recipient": email,
      "requester": { "name": name, "email": email },
      "custom_fields" : [
        {
          "id": 360029378952,
          "value": order_number,
        },
        {
          "id": 9837143197076,
          "value": phone_number
        }
      ]
    }
  }

  // console.log("body:", body)

  axios.post('https://healthynesting.zendesk.com/api/v2/tickets.json', JSON.stringify(body), {
    headers: {
      'Content-Type': 'application/json'
    },
    auth: {
      'username': 'team@scoutside.com/token',
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