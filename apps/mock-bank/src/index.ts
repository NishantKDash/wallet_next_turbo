import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
const port = process.env.PORT;

app.get("/wallet/debit", (req, res) => {
  const token = req.query.token;
  const user_identifier = req.query.user_identifier;
  const amount = req.query.amount;
  const displayAmount = Number(amount) / 100;
  if (!token || !user_identifier || !amount) res.send("Unauthorized Access");
  const hostName = req.hostname;
  const subDomain = hostName.split(".")[0];
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subDomain}</title>
      <link rel="icon" href="data:;base64,iVBORw0KGgo=">
      <style>
        body {
          font-family: Arial, sans-serif;
          text-align: center;
          margin: 50px auto;
        }
        h1 {
          margin-bottom: 20px;
        }
        input {
          margin: 10px;
          padding: 5px;
        }
        button {
          padding: 10px 20px;
          cursor: pointer;
        }
      </style>
    </head>
    <body>
      <h1>Net Banking-${subDomain}</h1>
      <div>
        <label>TransactionToken</label><br>
        <input id="token" type="text" value=${token} readonly><br>
        <label>User Id</label><br>
        <input id="userId" type="text" value=${user_identifier} readonly><br>
        <label>Amount</label><br>
        <input id="amount" type="text" value=${displayAmount} readonly><br>
        <button id="button" onClick="handleClick()">Submit</button>
      </div>
      <script>
        async function handleClick(){
          const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: document.getElementById('token').value,
              user_identifier: document.getElementById('userId').value,
              amount: document.getElementById('amount').value * 100,
            }),
          };
          const response = await fetch("http://localhost:5000/", options);
          alert('Transaction successful');
          window.location.href = 'http://localhost:3000/';
          console.log(response);
        }
      </script>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Mock bank listening at ${port}`);
});
