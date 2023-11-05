const OpenAI = require('openai');

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

async function createFlashcards(pages){
    let quiz = []
    for(let i = 0; i < pages.length; i++){
        let page = pages[i];
        let miniQuiz = await getFlashcardsPerPage(page);
        quiz.push(...miniQuiz);
    }
    
    return quiz;
}

async function getFlashcardsPerPage(page) {
  
    const initialInstruction = `I want you to act like a flashcard generator.
    I shall provide you with content in my next message and you will create at least 10
    flashcards based on the content I provided. The answer to each flashcard should be on the line after the question.
     Each flashcard should be separated by a new line. Do you understand?`;

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

    const sampleResponse = `1. What is the Chinese Room argument mainly targeted at?
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
  return process(completion.choices[0]['message']['content']);
}

function process(quizString){
    const listOfStrings = quizString.split("\n");
    let flashcards = []
    for(let i = 0; i<listOfStrings.length; i+=3){
        let flashcard = {
            question: listOfStrings[i].trim().slice(listOfStrings[i].trim().indexOf('.') + 2),
            answer: listOfStrings[i + 1].trim().slice(listOfStrings[i + 1].trim().indexOf('-') + 2),
        }
        flashcards.push(flashcard);
    }
    return flashcards;
}

module.exports = {
    createFlashcards
}
console.log(await createFlashcards([data]));