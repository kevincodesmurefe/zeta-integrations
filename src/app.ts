import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

app.get("/zeta-login", async (req: Request, res: Response): Promise<void> => {
    try {
        const respose = await fetch('https://sandbox.zata.rw/api/v1/login',
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: '{ "email": "shemakevin2005@gmail.com", "password": "England@2026!" }'
            }
        );
        const data = await respose.json()
        console.log("Zata Sandbox Response Status:", respose.status);
    console.log("Zata Sandbox Validation Errors:", data);
    res.status(respose.status).json(data);
    } catch (error) {
        console.error("Network or execution error:", error);
    res.status(500).json({ error: "Internal Server Error" });
    }
});
app.get("/zeta-register", async (req: Request, res: Response): Promise<void> => { 
  try {
    const response = await fetch("https://sandbox.zata.rw/api/v1/create-account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "name": "kevin",
        "email": "shemakevinmuvunyi@gmail.com", 
        "password": "England@2026!",
        "password_confirmation": "England@2026!",
        "terms": true
      }),
    });

    const data = await response.json();
    
    console.log("Zata Sandbox Response Status:", response.status);
    console.log("Zata Sandbox Validation Errors:", data);

    res.status(response.status).json(data);

  } catch (error) {
    console.error("Network or execution error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.use('/zeta-register-company', async (req: Request, res: Response): Promise<void> => {
  const url = 'https://sandbox.zata.rw/api/v1/company';
  const options = {
  method: 'POST',
  headers: {Authorization: `Bearer ${process.env.ZATA_API_KEY}`, 'Content-Type': 'application/json'},
  body: '{"name":"kevin demo company","phone":"0790074070","address":"No 1, kevin Point Street, Zata Point","email":"shemakevin2005@gmail.com","tin":"123456789"}'
};
try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log("Zata Sandbox Response Status:", response.status);
  console.log("Zata Sandbox Validation Errors:", data);
  res.status(response.status).json(data);
  } catch (error) {
    console.error("Network or execution error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})
app.use((req: Request, res: Response, next: NextFunction): void => { 
  res.status(404).json({ message: `route ${req.method} ${req.url} not found` }); 
});

export default app;
