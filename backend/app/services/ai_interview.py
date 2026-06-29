def generate_question(
 interview_type,
 previous_answer,
 question_no
):


 if interview_type=="technical":

    questions=[
    "Explain your project architecture",
    "How did you handle database design?",
    "Explain API communication",
    "How would you optimize performance?"
    ]


 return questions[question_no]