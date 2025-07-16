export function getTritone(note: string): string {
  const tritoneIntervals = {
    C: "Gb",
    Db: "G",
    D: "Ab",
    Eb: "A",
    E: "Bb",
    F: "B",
    Gb: "C",
    G: "Db",
    Ab: "D",
    A: "Eb",
    Bb: "E",
    B: "F",
  };

  const tritone = tritoneIntervals[note as keyof typeof tritoneIntervals];
  if (!tritone) {
    throw new Error(`Tritone for note ${note} not found`);
  }
  return tritone;
}
