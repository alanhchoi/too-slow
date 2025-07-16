import classNames from "classnames";
import { useState } from "react";
import type { Route } from "./+types/home";
import { getNoteOnScaleByNumber, scaleRoots } from "~/getNoteOnScaleByNumber";

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

export default function Home() {
  // get random scale root
  const [scaleRoot, setScaleRoot] = useState(getRandomScaleRoot());
  const [scaleDegree, setScaleDegree] = useState(getRandomScaleDegree());
  const [showAnswer, setShowAnswer] = useState(false);
  const note = getNoteOnScaleByNumber(scaleRoot, scaleDegree);

  const scaleDegreeWord = scaleDegreeWords[scaleDegree - 1];

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 relative">
      <h1
        className={classNames(
          "text-4xl font-bold",
          showAnswer && "absolute -translate-y-16 text-xl"
        )}
      >
        What is the {scaleDegreeWord} of {formatNote(scaleRoot)}7 scale?
      </h1>
      {showAnswer && <p className="text-4xl font-bold">{formatNote(note)}</p>}
      {showAnswer ? (
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => {
            setScaleRoot(getRandomScaleRoot());
            setScaleDegree(getRandomScaleDegree());
            setShowAnswer(false);
          }}
        >
          New Question
        </button>
      ) : (
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setShowAnswer(true)}
        >
          Show Answer
        </button>
      )}
    </div>
  );
}
