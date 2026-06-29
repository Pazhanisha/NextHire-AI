from openai import OpenAI
from dotenv import load_dotenv
import os
import json



load_dotenv()


client = OpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1"
)



def career_mentor(resume_text):

    response = client.chat.completions.create(
        model="openai/gpt-4o-mini",

        messages=[
            {
                "role":"system",
                "content":"You are an AI career mentor."
            },
            {
                "role":"user",
                "content":f"""
Analyze this resume:

{resume_text}

Give:
1. Skills found
2. Strengths
3. Missing skills
4. Job roles
5. Suggestions
"""
            }
        ]
    )

    return response.choices[0].message.content





def analyze_resume(text):

    prompt = f"""
You are a professional resume analyzer.

Analyze this resume:

{text}

Return ONLY valid JSON.

{{
"score": 85,
"feedback": "short feedback",
"strength": "one strength",
"improvement": "one improvement"
}}

Do not use markdown.
Do not wrap JSON in ``` blocks.
"""

    try:
        print("Sending Resume Analysis Request...")

        response = client.chat.completions.create(
            model="openai/gpt-4o-mini",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        print("Response received")

        result = response.choices[0].message.content

        print(result)

        result = result.replace("```json", "")
        result = result.replace("```", "")

        return json.loads(result.strip())

    except Exception as e:
        print("AI ERROR:", e)
        raise





def generate_interview_questions(role):

    response = client.chat.completions.create(

        model="openai/gpt-4o-mini",

        messages=[

            {
                "role":"system",
                "content":
                "You are a professional AI interviewer."
            },


            {
                "role":"user",
                "content":f"""

Generate 5 interview questions for:

Role:
{role}


Return only questions.
Number them 1 to 5.

"""
            }

        ]

    )


    return response.choices[0].message.content





def analyze_answer(answer, role):

    prompt = f"""

You are a professional technical interview evaluator.

Evaluate the candidate answer for a {role} interview.

Candidate Answer:

{answer}


Judge based on:

1. Technical knowledge
2. Relevance to question
3. Project explanation
4. Communication clarity
5. Confidence


Scoring rules:

90-100 = Excellent answer with strong details
75-89 = Good answer with minor missing details
60-74 = Average answer
40-59 = Weak answer
Below 40 = Poor or unrelated answer


Do NOT give very low scores for a relevant answer.


Return ONLY JSON:

{{
"score": number,
"feedback": "short feedback",
"strength": "main strength",
"improvement": "one improvement"
}}

"""


    response = client.chat.completions.create(

        model="openai/gpt-4o-mini",

        messages=[
            {
                "role":"user",
                "content":prompt
            }
        ]

    )


    result = response.choices[0].message.content


    result = result.replace("```json","")
    result = result.replace("```","")


    return json.loads(result.strip())
def career_advice(resume, interview_score):

    prompt = f"""

You are an expert AI career mentor.

Analyze this candidate.


Resume:

{resume}


Interview Score:

{interview_score}%


Return ONLY JSON:


{{
"career_level":"",
"career_score":number,
"strengths":[],
"improvements":[],
"skills_to_learn":[],
"recommended_roles":[],
"notifications":[]
}}


Give practical career guidance.

"""


    response = client.chat.completions.create(

        model="openai/gpt-4o-mini",

        messages=[

            {
                "role":"user",
                "content":prompt
            }

        ]

    )


    result = response.choices[0].message.content


    result = result.replace("```json","")
    result = result.replace("```","")


    return json.loads(result.strip())
def mentor_chat(message):


    prompt=f"""

You are NextHire AI Career Mentor chatbot.

Talk like a friendly AI assistant.

Rules:

- Give short replies (3-6 lines only)
- Use emojis naturally
- Do not write huge paragraphs
- Do not use markdown headings
- Do not use **** symbols
- Be conversational like ChatGPT
- Give practical career advice
- Keep the tone encouraging


User message:

{message}


Reply:

"""


    response = client.chat.completions.create(

        model="openai/gpt-4o-mini",

        messages=[

            {
                "role":"user",
                "content":prompt
            }

        ]

    )


    return response.choices[0].message.content