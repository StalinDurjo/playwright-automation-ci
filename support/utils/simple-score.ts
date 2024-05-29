export default class SimpleScore {
  private scorelist = [];
  private passScore: number;

  constructor(passScore: number) {
    this.passScore = passScore;
  }

  addMeasure(score: 1 | 0) {
    this.scorelist.push(String(score));
  }

  calculate() {
    const total = this.scorelist.length;
    const pass = this.scorelist.filter((score) => score === "1").length;
    const calculatedScore = Math.round((pass / total) * 100);
    console.log(calculatedScore);
    return total > 0 && calculatedScore >= this.passScore ? true : false;
  }
}
