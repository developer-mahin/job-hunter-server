import { style } from './style';

export const hiredHtml = (
  name: string,
  jobTitle: string,
  companyName: string,
) => {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Congratulations!</title>
        <style>
        ${style}
        </style>
    </head>
    <body>
    
        <div class="container">
            <div class="header">
                <h2>You're Hired!</h2>
            </div>
            <div class="content">
                <h1>Congratulations, ${name}!</h1>
                <p>We are thrilled to inform you that you have been selected for the position of <strong> ${jobTitle} </strong> at <strong> ${companyName} </strong>. Your skills and experience stood out, and we are excited to have you join our team.</p>
                <p>We will inform your to the next steps in the onboarding process.</p>
            </div>
            <div class="footer">
                <p>&copy; [Year] [Company Name]. All Rights Reserved.</p>
            </div>
        </div>
    
    </body>
    </html>
    `;
};
