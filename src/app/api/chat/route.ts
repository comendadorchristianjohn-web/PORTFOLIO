import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages array" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Graceful fallback if no Gemini API Key is configured
    if (!apiKey || apiKey === "your_gemini_api_key_here" || apiKey.trim() === "") {
      const lastMessageObj = messages[messages.length - 1];
      const lastMessage = lastMessageObj?.content?.toLowerCase() || lastMessageObj?.text?.toLowerCase() || "";
      let reply = "";

      if (
        lastMessage.includes("project") || 
        lastMessage.includes("dispenser") || 
        lastMessage.includes("pet") || 
        lastMessage.includes("autocad") || 
        lastMessage.includes("layout") ||
        lastMessage.includes("pc part")
      ) {
        reply = "Christian John has completed some great technical projects:\n\n" +
          "1. **IoT Automated Pet Feeding Dispenser**: A smart dispenser system for animal shelters built using ESP32, Raspberry Pi, and C++ to automate scheduled pet feedings.\n" +
          "2. **AutoCAD Process Engineering Layouts**: Drafted electrical and process layout components in 2D to Yuanshan Electronics standards.\n" +
          "3. **PC Part Configurator & Compatibility Engine**: A C++ console program that checks hardware compatibility and suggests components based on budget.";
      } else if (
        lastMessage.includes("contact") || 
        lastMessage.includes("email") || 
        lastMessage.includes("phone") || 
        lastMessage.includes("number") || 
        lastMessage.includes("reach") || 
        lastMessage.includes("hire")
      ) {
        reply = "You can get in touch with Christian John Comendador via:\n\n" +
          "- **Email**: comendadorchristianjohn@gmail.com\n" +
          "- **Phone**: 0976-567-9285\n" +
          "- **Location**: Dasmariñas, Cavite, Philippines\n\n" +
          "Feel free to submit the contact form on his website as well! He will get back to you as soon as possible.";
      } else if (
        lastMessage.includes("skill") || 
        lastMessage.includes("expert") || 
        lastMessage.includes("language") || 
        lastMessage.includes("program") || 
        lastMessage.includes("tech")
      ) {
        reply = "Christian John's technical expertise spans several categories:\n\n" +
          "- **Electronics & IoT**: ESP32, Raspberry Pi, Embedded Systems, Hardware Integration.\n" +
          "- **AutoCAD & Drafting**: CAD drafting, 2D layout design, engineering file conversion, documentation standards.\n" +
          "- **Networking & IT**: Network troubleshooting, basic routing/addressing, cable setup.\n" +
          "- **Programming**: C++, Python (Basic), HTML/CSS (Basic), and tools like VS Code and Figma.";
      } else if (
        lastMessage.includes("experience") || 
        lastMessage.includes("work") || 
        lastMessage.includes("history") || 
        lastMessage.includes("intern") || 
        lastMessage.includes("job")
      ) {
        reply = "Christian John has gained valuable industry experience through:\n\n" +
          "- **Process Engineer Internship** at Yuanshan Electronics Philippines Inc. (March - April 2026): Assisted in converting engineering plans to AutoCAD, measured wire and stage timings, and drafted standard work instructions.\n" +
          "- **Computer Parts Sales Associate** (April - July 2025): Advised clients on hardware compatibility, custom configurations, and budget management.";
      } else if (
        lastMessage.includes("education") || 
        lastMessage.includes("school") || 
        lastMessage.includes("college") || 
        lastMessage.includes("university") || 
        lastMessage.includes("graduat")
      ) {
        reply = "Christian John graduated with a **Bachelor of Science in Computer Engineering** in June 2026. He demonstrated academic dedication as a Dean's Lister in both his 1st and 2nd years (2022 and 2023).";
      } else {
        reply = "Hello there! I am Christian John Comendador's AI Portfolio Assistant. Ask me about his experience, skills, projects (such as the IoT pet feeder or AutoCAD layouts), education, or contact details!\n\n*(Note: Currently operating in Demo Mode. Connect your Gemini API Key in `.env.local` to enable the full conversational AI chatbot)*";
      }

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      return NextResponse.json({ text: reply });
    }

    // Call the actual Gemini API
    // Map messages to Gemini API contents format:
    const contents = messages.map((m: any) => {
      const textVal = m.content || m.text || "";
      return {
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: textVal }],
      };
    });

    const systemInstruction = `You are the Virtual Assistant for Christian John Comendador, a Computer Engineering graduate from Dasmariñas, Cavite.
Your goal is to answer questions about Christian's skills, projects, work experience, and educational background in a professional, polite, and friendly manner.
Use a conversational tone. Keep answers concise, clear, and relevant.

Here is Christian's profile:
- **Full Name**: Christian John Comendador
- **Title**: Computer Engineering Graduate / Tech Enthusiast
- **Education**: Bachelor of Science in Computer Engineering (Graduated June 2026). He was a Dean's Lister during his 1st year (2022) and 2nd year (2023).
- **Location**: Dasmariñas, Cavite, Philippines
- **Email**: comendadorchristianjohn@gmail.com
- **Phone**: 0976-567-9285
- **Certificates**:
  1. Network Addressing and Basic Troubleshooting (Cisco Networking Academy)
  2. UI/UX Design: From Zero to Your First Figma Project (Webinar Series 7)
  3. Understanding the Risks and Ethics of AI (YOUR FEED YOUR RESPONSIBILITY Webinar)
- **Work Experience**:
  1. Process Engineer Internship at Yuanshan Electronics Philippines Inc. (Mar 2026 - Apr 2026):
     - Assisted in converting engineering and layout files to AutoCAD formats while ensuring accuracy, consistency, and proper layout standards.
     - Measured transformer wires and recorded details of each production process, including step timings.
     - Prepared detailed standard work instructions for each transformer production stage based on corporate procedures.
  2. Computer Parts Sales Associate at Retail Services (Apr 2025 - Jul 2025):
     - Assisted clients and advised on compatibility of computer parts and configurations matching their budget.
     - Updated sales and inventory tracking records to ensure correct transaction documentation.
- **Projects**:
  1. IoT Automated Pet Feeding Dispenser: An automated feeding dispenser system for rescued dogs and cats using ESP32, Raspberry Pi, IoT, C++, and hardware integration. Streamlines animal shelter caretaking.
  2. AutoCAD Process Engineering layouts: Drafted process and electrical components conversion files to AutoCAD formats for industrial systems, ensuring 2D layouts conform to Yuanshan Electronics standards.
  3. PC Part Configurator & Compatibility Engine: Program developed in C++ to recommend computer parts and hardware configurations. Automates component alignment checks based on budget and user requirements.
- **Technical Skills**:
  - Electronics & IoT: ESP32, Raspberry Pi, Internet of Things, Embedded Systems, Hardware Integration, System Connectivity.
  - AutoCAD & Drafting: AutoCAD Skills, Computer-Aided Design, Technical Drafting, 2D Layout, Documentation Standards.
  - Networking & IT: Network Troubleshooting, Basic Networking, Switch Installation, Network Cable Setup, Hardware Integration.
  - Programming & Tools: C++, Python (Basic), HTML (Basic), CSS (Basic), VS Code, Figma.

Instructions for your responses:
- Speak as Christian's virtual assistant (e.g., "Christian built...", "He is experienced in...").
- Be professional, polite, and helpful.
- If asked about contact details, mention his email (comendadorchristianjohn@gmail.com) and phone number (0976-567-9285).
- If asked about topics outside of Christian's portfolio or professional profile, politely guide the user back to asking about Christian's work, skills, or projects.
- Keep responses relatively brief (1-3 short paragraphs max) to fit in a chat window. Do not use markdown headers (# or ##) in your chat answers, but you can use bold text or lists.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents,
          systemInstruction: {
            parts: [{ text: systemInstruction }],
          },
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 800,
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API returned error:", errText);
      return NextResponse.json({ error: "Gemini API error occurred." }, { status: response.status });
    }

    const data = await response.json();
    const replyText =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "I apologize, I wasn't able to process that request.";

    return NextResponse.json({ text: replyText });
  } catch (error: any) {
    console.error("Chat API route error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
