import classNames from "classnames";
import { useState } from "react";
import type { Route } from "./+types/home";
import { getNoteOnScaleByNumber, scaleRoots } from "~/getNoteOnScaleByNumber";
import { getTritone } from "~/getTritone";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Too Slow" },
    { name: "description", content: "Jazz Quizzes" },
  ];
}

function getRandomScaleRoot() {
  return scaleRoots[Math.floor(Math.random() * scaleRoots.length)];
}

function formatNote(root: string): string {
  // replace b and # with flat and sharp
  return root.replace("b", "♭").replace("#", "♯");
}

function getRandomScaleDegree() {
  return Math.floor(Math.random() * 6) + 2; // 2 to 7 inclusive
}

const scaleDegreeWords = [
  "root",
  "second",
  "third",
  "fourth",
  "fifth",
  "sixth",
  "seventh",
];

function getRandomQuiz() {
  const quizType = Math.floor(Math.random() * 3);

  const scaleRoot = getRandomScaleRoot();

  if (quizType === 2) {
    // Tritone quiz
    return {
      question: `What is the tritone of ${formatNote(scaleRoot)}7?`,
      answer: `${formatNote(getTritone(scaleRoot))}7`,
    };
  }

  const scaleDegree = getRandomScaleDegree();
  const scaleDegreeWord = scaleDegreeWords[scaleDegree - 1];
  const note = getNoteOnScaleByNumber(scaleRoot, scaleDegree);

  if (quizType === 0) {
    return {
      question: `What is the ${scaleDegreeWord} of ${formatNote(
        scaleRoot
      )}7 scale?`,
      answer: formatNote(note),
    };
  } else {
    return {
      question: `${formatNote(note)} is which degree on the ${formatNote(
        scaleRoot
      )}7 scale?`,

      // make the first letter of the answer uppercase
      answer: `${scaleDegreeWord
        .charAt(0)
        .toUpperCase()}${scaleDegreeWord.slice(1)}`,
    };
  }
}

export default function Home() {
  const [{ question, answer }, setQuiz] = useState(() => getRandomQuiz());
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 relative">
      <h1
        className={classNames(
          "absolute text-4xl font-bold",
          showAnswer &&
            "-translate-y-8 scale-50 opacity-50 transition-all duration-200"
        )}
      >
        {question}
      </h1>
      {showAnswer && <p className="absolute text-4xl font-bold">{answer}</p>}
      {showAnswer ? (
        <button
          className="absolute bottom-8 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
          onClick={() => {
            setQuiz(getRandomQuiz());
            setShowAnswer(false);
          }}
        >
          New Question
        </button>
      ) : (
        <button
          className="absolute bottom-8 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
          onClick={() => setShowAnswer(true)}
        >
          Show Answer
        </button>
      )}
    </div>
  );
}
