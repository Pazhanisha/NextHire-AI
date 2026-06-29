from datetime import datetime


def generate_recommendation(
    resume_data,
    interview_score,
    skills
):


    if interview_score >= 80:

        role = "AI Engineer"


    elif interview_score >= 60:

        role = "Full Stack AI Developer"


    else:

        role = "Junior Software Developer"



    required_skills = [

        "Python",
        "Machine Learning",
        "FastAPI",
        "SQL",
        "System Design"

    ]


    skill_gap = []


    for skill in required_skills:


        if skill not in skills:

            skill_gap.append(skill)



    roadmap = """

Week 1:
Improve Python and backend skills


Week 2:
Learn Machine Learning concepts


Week 3:
Build AI projects


Week 4:
Prepare interviews and apply jobs

"""



    return {


        "recommended_role": role,


        "skill_gap":
        ", ".join(skill_gap),


        "roadmap": roadmap,


        "created_at":
        str(datetime.now())


    }