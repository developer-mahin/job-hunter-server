export const verifyHtml = (name: string, token: string, server_url: string) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Verification</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            color: #333;
            line-height: 1.6;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(to right, #6a11cb, #2575fc);
            color: white;
            padding: 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 30px 20px;
            text-align: center;
        }
        .content p {
            font-size: 16px;
            margin-bottom: 20px;
        }
        .cta-button {
            display: inline-block;
            padding: 15px 30px;
            color: #fff;
            background: #2575fc;
            border-radius: 50px;
            text-decoration: none;
            font-size: 16px;
            font-weight: bold;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: background-color 0.3s ease;
        }
        .cta-button:hover {
            background-color: #1a5fda;
        }
        .footer {
            margin-top: 30px;
            font-size: 12px;
            color: #777;
            text-align: center;
            padding: 20px;
            background-color: #f9f9f9;
            border-top: 1px solid #eee;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome, ${name}!</h1>
        </div>
        <div class="content">
            <p>We're excited to have you join our community. To start your journey, please verify your email address by clicking the button below:</p>
            <a href="${server_url}/api/v1/auth/verify/${token}" target="_blank" class="cta-button">Verify Your Account</a>
            <p>If you did not create an account, no further action is required.</p>
        </div>
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} JOB HUNTER. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
};
