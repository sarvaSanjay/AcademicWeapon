from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import json
from azure.storage.blob import BlobServiceClient, ContainerClient
from werkzeug.datastructures import FileStorage
from azure.ai.formrecognizer import DocumentAnalysisClient
from azure.core.credentials import AzureKeyCredential



app = Flask(__name__)
CORS(app)

def processQuiz(text: str):
    listOfStrings = text.split("\n")
    quiz = []
    for i in range(0, len(listOfStrings), 7):
        question = {
            'question': listOfStrings[i].strip()[listOfStrings[i].strip().index(':') + 2:],
            'optionA': listOfStrings[i + 1].strip()[3:],
            'optionB': listOfStrings[i + 2].strip()[3:],
            'optionC': listOfStrings[i + 3].strip()[3:],
            'optionD': listOfStrings[i + 4].strip()[3:],
            'correctAnswer': listOfStrings[i + 5].strip()[19:]
        }
        quiz.append(question)
    return quiz

    
@app.route('/quiz', methods = ['POST'])
def quiz():
    initialInstruction = """I want you to act like a quiz generator.
    I shall provide you with content in my next message and you will create at least 10
    multiple choice questions based on the content I provided. Each choice should be on
    a new line. Remember after you have listed the options for a question, you should tell me what the correct answer is on the next line. 
    Do not return anything other than the questions and answers. Do you understand?"""
    
    confirmation = "Yes"
    
    data = """In the decades following its publication, the Chinese Room argument was the subject of very many discussions.
    By 1984, Searle presented the Chinese Room argument in a book, Minds, Brains and Science. In January 1990,
    the popular periodical Scientific American took the debate to a general scientific audience. Searle included the
    Chinese Room Argument in his contribution, “Is the Brain's Mind a Computer Program?”, and Searle's piece was
    followed by a responding article, “Could a Machine Think?”, written by philosophers Paul and Patricia
    Churchland. Soon thereafter Searle had a published exchange about the Chinese Room with another leading
    philosopher, Jerry Fodor (in Rosenthal (ed.) 1991).
    The heart of the argument is an imagined human simulation of a computer, similar to Turing's Paper Machine.
    The human in the Chinese Room follows English instructions for manipulating Chinese symbols, where a
    computer “follows” a program written in a computing language. The human produces the appearance of
    understanding Chinese by following the symbol manipulating instructions, but does not thereby come to
    understand Chinese. Since a computer just does what the human does—manipulate symbols on the basis of their
    syntax alone—no computer, merely by following a program, comes to genuinely understand Chinese.
    This narrow argument, based closely on the Chinese Room scenario, is specifically directed at a position Searle
    calls “Strong AI”. Strong AI is the view that suitably programmed computers (or the programs themselves) can
    understand natural language and actually have other mental capabilities similar to the humans whose behavior
    they mimic. According to Strong AI, these computers really play chess intelligently, make clever moves, or
    understand language. By contrast, “weak AI” is the much more modest claim that computers are merely useful in
    psychology, linguistics, and other areas, in part because they can simulate mental abilities. But weak AI makes
    no claim that computers actually understand or are intelligent. The Chinese Room argument is not directed at
    weak AI, nor does it purport to show that no machine can think—Searle says that brains are machines, and brains
    think. The argument is directed at the view that formal computations on symbols can produce thought."""
    
    sampleResponse = """Question 1: Who presented the Chinese Room argument in his book "Minds, Brains and Science"?
    A) Paul Churchland
    B) Jerry Fodor
    C) John Searle
    D) Alan Turing 
    Correct answer: C) John Searle
    
    Question 2: In which publication did the Chinese Room argument gain popularity in 1990?
    A) Minds, Brains and Science
    B) Scientific American
    C) Rosenthal (ed.) 1991
    D) Turing's Paper Machine
    Correct answer: B) Scientific American
    
    Question 3: Which philosopher(s) wrote the responding article "Could a Machine Think?"?
    A) Paul Churchland
    B) Patricia Churchland
    C) Both Paul and Patricia Churchland
    D) Jerry Fodor
    Correct answer: C) Both Paul and Patricia Churchland
    
    Question 4: What is the main analogy used in the Chinese Room argument?
    A) A human following English instructions
    B) A computer following a program
    C) Manipulating Chinese symbols
    D) Turing's Paper Machine
    Correct answer: A) A human following English instructions
    
    Question 5: What is the target of the Chinese Room argument?
    A) Weak AI
    B) Strong AI
    C) Psychology and linguistics
    D) Natural language understanding
    Correct answer: B) Strong AI
    
    Question 6: According to Strong AI, computers can understand natural language and have which of the following capabilities?
    A) Playing chess intelligently
    B) Making clever moves
    C) Understanding language
    D) All of the above
    Correct answer: D) All of the above
    
    Question 7: What is the main difference between weak AI and strong AI?
    A) Weak AI claims computers are intelligent, while strong AI does not
    B) Weak AI claims computers can simulate mental abilities, while strong AI claims they can truly understand
    C) Weak AI is based on syntax, while strong AI is based on semantics
    D) Weak AI is practical, while strong AI is theoretical
    Correct answer: B) Weak AI claims computers can simulate mental abilities, while strong AI claims they can truly understand
    
    Question 8: The Chinese Room argument does NOT aim to prove that no machine can think but is specifically directed at:
    A) Weak AI
    B) Human cognition
    C) Formal computations on symbols
    D) Brains and their thinking capabilities
    Correct answer: C) Formal computations on symbols
    
    Question 9: Who did Searle say that brains think?
    A) Computers
    B) Humans
    C) Machines
    D) Animals
    Correct answer: B) Humans
    
    Question 10: What does Searle acknowledge when arguing against Strong AI?
    A) Computers are intelligent
    B) Brains are machines
    C) Formal computations can produce thought
    D) Weak AI is obsolete
    Correct answer: B) Brains are machines
    """
    new_data = request.get_json()['text']
    
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
                    {"role": "user", "content": initialInstruction},
                    {"role": "assistant", "content": confirmation},
                    {"role": "user", "content": data},
                    {"role": "assistant", "content": sampleResponse},
                    {"role": "user", "content": new_data}
                ]
        )
    print(completion.choices[0].message)
    return json.dumps(processQuiz(completion.choices[0].message.content))

def processFlashcards(text):
    listOfStrings = text.split("\n")
    flashcards = []
    for i in range(0, len(listOfStrings), 3):
        flashcard = {
            'question': listOfStrings[i].strip()[listOfStrings[i].strip().index('.') + 2:],
            'answer': listOfStrings[i + 1].strip()[listOfStrings[i + 1].strip().index('-') + 2:],
        }
        flashcards.append(flashcard)
    return flashcards

@app.route('/flashcards', methods=['POST'])
def flashcards():

    initialInstruction = """I want you to act like a flashcard generator.
    I shall provide you with content in my next message and you will create at least 10
    flashcards based on the content I provided. The answer to each flashcard should be on the line after the question.
    Each flashcard should be separated by a new line. Do you understand?"""

    confirmation = "Yes"

    data = """In the decades following its publication, the Chinese Room argument was the subject of very many discussions.
    By 1984, Searle presented the Chinese Room argument in a book, Minds, Brains and Science. In January 1990,
    the popular periodical Scientific American took the debate to a general scientific audience. Searle included the
    Chinese Room Argument in his contribution, “Is the Brain's Mind a Computer Program?”, and Searle's piece was
    followed by a responding article, “Could a Machine Think?”, written by philosophers Paul and Patricia
    Churchland. Soon thereafter Searle had a published exchange about the Chinese Room with another leading
    philosopher, Jerry Fodor (in Rosenthal (ed.) 1991).
    The heart of the argument is an imagined human simulation of a computer, similar to Turing's Paper Machine.
    The human in the Chinese Room follows English instructions for manipulating Chinese symbols, where a
    computer “follows” a program written in a computing language. The human produces the appearance of
    understanding Chinese by following the symbol manipulating instructions, but does not thereby come to
    understand Chinese. Since a computer just does what the human does—manipulate symbols on the basis of their
    syntax alone—no computer, merely by following a program, comes to genuinely understand Chinese.
    This narrow argument, based closely on the Chinese Room scenario, is specifically directed at a position Searle
    calls “Strong AI”. Strong AI is the view that suitably programmed computers (or the programs themselves) can
    understand natural language and actually have other mental capabilities similar to the humans whose behavior
    they mimic. According to Strong AI, these computers really play chess intelligently, make clever moves, or
    understand language. By contrast, “weak AI” is the much more modest claim that computers are merely useful in
    psychology, linguistics, and other areas, in part because they can simulate mental abilities. But weak AI makes
    no claim that computers actually understand or are intelligent. The Chinese Room argument is not directed at
    weak AI, nor does it purport to show that no machine can think—Searle says that brains are machines, and brains
    think. The argument is directed at the view that formal computations on symbols can produce thought."""

    sampleResponse = """1. What is the Chinese Room argument mainly targeted at?
    - The view of "Strong AI"
    
    2. Who presented the Chinese Room argument in a book called "Minds, Brains and Science"?
    - John Searle
    
    3. In what year did Scientific American publish a debate on the Chinese Room argument?
    - January 1990
    
    4. Who wrote the responding article to Searle's contribution in Scientific American?
    - Paul and Patricia Churchland
    
    5. What does the human in the Chinese Room simulation do with the Chinese symbols?
    - Manipulate them according to English instructions
    
    6. Does Searle's argument claim that no machine can think?
    - No, Searle acknowledges that brains, which are machines, can think.
    
    7. What is the difference between "Strong AI" and "weak AI"?
    - Strong AI claims that computers can understand language and have mental capabilities like humans, while weak AI acknowledges that computers can simulate mental abilities without actual understanding or intelligence.
    
    8. What does the Chinese Room scenario demonstrate about computers and understanding?
    - That computers, by following a program and manipulating symbols based on their syntax alone, do not genuinely understand Chinese.
    
    9. Which philosopher engaged in a published exchange about the Chinese Room argument with Searle?
    - Jerry Fodor
    
    10. Is the Chinese Room argument directed at weak AI or strong AI?
    - It is specifically directed at strong AI, not weak AI.
    """
    new_data = request.get_json()['text']

    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
                    {"role": "user", "content": initialInstruction},
                    {"role": "assistant", "content": confirmation},
                    {"role": "user", "content": data},
                    {"role": "assistant", "content": sampleResponse},
                    {"role": "user", "content": new_data}
                ]
        )
    return json.dumps(processFlashcards(completion.choices[0].message.content))

def upload(file: FileStorage):
    container_name = "bread"
    blob_name = file.filename

    # Authenticate with your Azure Storage Account
    blob_service_client = BlobServiceClient.from_connection_string(connection_string)

    # Create a container (if it doesn't already exist)
    container_client = blob_service_client.get_container_client(container_name)

    # Upload the PDF file to Azure Blob Storage
    blob_client = container_client.get_blob_client(blob_name)
    blob_client.upload_blob(file)
    return blob_name

def get_link(file):
    blob_name = file

    # Authenticate with your Azure Storage Account
    blob_service_client = BlobServiceClient.from_connection_string(connection_string)

    # Get the container client
    container_client = blob_service_client.get_container_client(container_name)

    # Get the blob client
    blob_client = container_client.get_blob_client(blob_name)

    # Get the URL for the blob
    blob_url = blob_client.url

    return blob_url

key = "97f4a509568d44fba22f13e74b116144" 
endpoint = "https://quizme.cognitiveservices.azure.com/"

def format_polygon(polygon):
    if not polygon:
        return "N/A"
    return ", ".join(["[{}, {}]".format(p.x, p.y) for p in polygon])


def analyze_read(link):
    # sample document
    formUrl = link
    file1=''
    document_analysis_client = DocumentAnalysisClient(
        endpoint=endpoint, credential=AzureKeyCredential(key)
    )

    poller = document_analysis_client.begin_analyze_document_from_url(
        "prebuilt-read", formUrl
    )
    result = poller.result()
    for page in result.pages:
        for word in page.words:
            file1+=word.content + " "


    print("----------------------------------------")
    return file1

def ocr_pdf(file: FileStorage):
    upload(file)
    print(1)
    link=get_link(file.filename)
    print(2)
    a=analyze_read(link)
    return a

@app.route('/ocr', methods=['POST'])
def upload_file():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'}), 400
        
        file = request.files['file']
        
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400
        
        text = ocr_pdf(file)
        return json.dumps({'text': text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
