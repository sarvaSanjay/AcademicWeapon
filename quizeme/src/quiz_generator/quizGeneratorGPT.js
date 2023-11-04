import OpenAI from "openai";

const openai = new OpenAI();

const data = `In the decades following its publication, the Chinese Room argument was the subject of very many discussions.
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
    think. The argument is directed at the view that formal computations on symbols can produce thought.`;

export async function createQuiz(pages){
    let quiz = []
    for(let i = 0; i < pages.length; i++){
        let page = pages[i];
        let miniQuiz = getQuizPerPage(page);
        quiz.push(miniQuiz);
    }
    return quiz;
}

async function getQuizPerPage(page) {
  
    const initialInstruction = `I want you to act like a quiz generator.
    I shall provide you with content in my next message and you will create at least 10
    multiple choice questions based on the content I provided. Each choice should be on
    a new line. Remember after you have listed the options for a question, you should tell me what the correct answer is on the next line. 
    Do not return anything other than the questions and answers. Do you understand?`;

    const confirmation = "Yes";

    const data = `In the decades following its publication, the Chinese Room argument was the subject of very many discussions.
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
    think. The argument is directed at the view that formal computations on symbols can produce thought.`;

    const sampleResponse = `Question 1: Who presented the Chinese Room argument in his book "Minds, Brains and Science"?
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
    `

    const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: initialInstruction},
                    { role: "assistant", content: confirmation},
                    { role: "user", content: data},
                    {role: 'assistant', content: sampleResponse},
                    {role: 'user', content: page}
                ],
        model: "gpt-3.5-turbo",
    });

  console.log(process(completion.choices[0]['message']['content']));
  return completion.choices[0]['message']['content'];
}

function process(quizString){
    const listOfStrings = quizString.split("\n");
    let quiz = []
    for(let i = 0; i<listOfStrings.length; i+=7){
        let question = {
            question: listOfStrings[i].trim().slice(listOfStrings[i].trim().indexOf(':') + 2),
            optionA: listOfStrings[i + 1].trim().slice(3),
            optionB: listOfStrings[i + 2].trim().slice(3),
            optionC: listOfStrings[i + 3].trim().slice(3),
            optionD: listOfStrings[i + 4].trim().slice(3),
            correctAnswer: listOfStrings[i + 5].trim().slice(19)
        }
        quiz.push(question);
    }
    return quiz;
}

createQuiz([data]);