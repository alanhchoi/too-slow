const majorScales = {
  C: ["C", "D", "E", "F", "G", "A", "B"],
  Db: ["Db", "Eb", "F", "Gb", "Ab", "Bb", "C"],
  D: ["D", "E", "F#", "G", "A", "B", "C#"],
  Eb: ["Eb", "F", "G", "Ab", "Bb", "C", "D"],
  E: ["E", "F#", "G#", "A", "B", "C#", "D#"],
  F: ["F", "G", "A", "Bb", "C", "D", "E"],
  Gb: ["Gb", "Ab", "Bb", "Cb", "Db", "Eb", "E"],
  G: ["G", "A", "B", "C", "D", "E", "F#"],
  Ab: ["Ab", "Bb", "C", "Db", "Eb", "F", "G"],
  A: ["A", "B", "C#", "D", "E", "F#", "G#"],
  Bb: ["Bb", "C", "D", "Eb", "F", "G", "A"],
  B: ["B", "C#", "D#", "E", "F#", "G#", "A#"],
};

export const scaleRoots = Object.keys(
  majorScales
) as (keyof typeof majorScales)[];

function flatNote(note: string): string {
  if (note.endsWith("#")) {
    return note.slice(0, -1);
  }
  return note + "b";
}

function getDominantScale(root: keyof typeof majorScales): string[] {
  const scale = majorScales[root];
  if (!scale) {
    throw new Error(`Scale for root ${root} not found`);
  }

  // Convert the scale to a dominant scale by flattening the 7th note
  return scale.map((note, i) => (i === 6 ? flatNote(note) : note));
}

export function getNoteOnScaleByNumber(
  scaleRoot: string,
  number: number
): string {
  if (number < 1 || number > 7) {
    throw new Error("Number must be between 1 and 7");
  }
  const dominantScale = getDominantScale(scaleRoot as keyof typeof majorScales);
  return dominantScale[number - 1];
}
