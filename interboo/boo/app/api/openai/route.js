import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const { code, role } = await request.json();
    
    console.log('Received code:', code); // Debug
    console.log('API Key exists:', !!process.env.OPENAI_API_KEY); // Debug
    
    const response = await openai.chat.completions.create({
      model: "gpt-4.1-nano-2025-04-14",
      messages: [{
        role: "system",
        content: `You are interviewing a candidate for an ${role} position. 
        They just wrote this C++ code: ${code}
        
        Ask them ONE specific technical question about their code or approach. 
        Keep it concise and relevant to embedded systems.`
      }],
      max_tokens: 150
    });
    
    console.log('OpenAI response:', response.choices[0].message.content); // Debug
    
    return Response.json({ 
      question: response.choices[0].message.content 
    });
    
  } catch (error) {
    console.error('Full error:', error); // Better error logging
    return Response.json({ error: 'Failed to generate question: ' + error.message }, { status: 500 });
  }
}