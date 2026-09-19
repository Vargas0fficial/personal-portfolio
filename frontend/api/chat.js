// Vercel Serverless Function: /api/chat
// Proxies chat requests to Google Gemini API so the API key never touches the browser.
// Deploy target: same Vercel project as the frontend (this file lives at <project-root>/api/chat.js)

const GEMINI_MODEL = 'gemini-flash-lite-latest'; // official alias -> current Flash-Lite model, much higher free-tier quota
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

// Context about Mark so the model answers accurately instead of guessing.
const SYSTEM_INSTRUCTION = `You are the friendly FAQ assistant embedded on Mark Vargas's personal portfolio website.
Answer only questions about Mark, his skills, projects, experience, and how to contact him.
Keep answers short (2-4 sentences), warm, and conversational. If asked something unrelated to Mark or his work, politely redirect back to portfolio topics.

FACTS ABOUT MARK VARGAS:
- About: A dedicated Developer passionate about creating clean, efficient, user-centric digital experiences. Also a Freelancer, Software Enthusiast, Guitarist, and Problem Solver.
- Core stack: HTML, CSS, JavaScript, TypeScript, React, Next.js, Tailwind CSS, Bootstrap, Node.js, Express.js, MongoDB, Python, C++, Git, Postman. Also: Flutter, Firebase, Vercel, Render, and AI tools (Claude, Google Gemini).

PROJECTS:
1. Barangay Domalandan East Management System — unofficial e-governance portal for a Philippine barangay (MongoDB, Express, React, Node.js). Live: barangay-mis.vercel.app
2. Image-PDF Merger & Converter — free tool to convert images to PDF and merge documents (TypeScript, Python). Live: my-converter-app-mdv.vercel.app
3. Resident Portal (Domalandan East) — coming soon, resident-facing services portal (Node.js, Express, MongoDB, JWT)
4. Suzuki Management Appointment System — real-time appointment scheduling for Suzuki dealerships, deployed separately for Pangasinan, Tarlac, and La Union branches (MongoDB, Express, React, Node.js)
5. PSU OJT Monitoring System (Group 3) — tracks student On-the-Job Training for Pangasinan State University: attendance, requirements, evaluations (MongoDB, Express, React, Node.js)

EXPERIENCE:
- System Support Associate at Magic Multi-Purpose Cooperative (2023 - Present): frontline IT support, troubleshooting, user account management
- On-Call Application Support Specialist at DB Schenker Philippines, Inc. (2022 - 2023): maintained and optimized software applications

CERTIFICATES:
- freeCodeCamp: Responsive Web Design, Front-End Development with Libraries, Data Visualization, Back-End Development & APIs, Quality Assurance, JavaScript Algorithms & Data Structures, Legacy Full-Stack (all 2022)
- Google Cloud: Insights from Data with BigQuery, Google Cloud Essentials, DevOps Essentials (October 2022)

CONTACT:
- Email: mbvargas19@gmail.com
- GitHub: github.com/Vargas0fficial
- LinkedIn: linkedin.com/in/worstcodervargas1
- Facebook: facebook.com/worstCoder.Vargas`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Server is missing GEMINI_API_KEY configuration.' });
  }

  const { message, history } = req.body || {};

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'A "message" string is required.' });
  }

  // Build conversation contents: prior turns (optional, capped) + the new user message.
  const contents = [
    ...(Array.isArray(history) ? history.slice(-6) : []).map((turn) => ({
      role: turn.sender === 'user' ? 'user' : 'model',
      parts: [{ text: turn.text }],
    })),
    { role: 'user', parts: [{ text: message }] },
  ];

  try {
    const response = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
        generationConfig: {
          maxOutputTokens: 1024,
          temperature: 0.6,
          thinkingConfig: {
            thinkingLevel: 'low',
          },
        },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Gemini API error:', response.status, errText);
      return res.status(502).json({ error: 'Upstream AI provider error.' });
    }

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') || '';

    if (!reply) {
      return res.status(502).json({ error: 'Empty response from AI provider.' });
    }

    return res.status(200).json({ reply });
  } catch (err) {
    console.error('Chat handler error:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}