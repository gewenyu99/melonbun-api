import * as mongoose from 'mongoose';
import { LoremIpsum } from "lorem-ipsum";
import { RequestSchema } from "../models/request";

const Request = mongoose.model('Request', RequestSchema);
const DEFAULT_NUM_DOCS = 50;
const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});
const STATUSES = ["PENDING", "FULFILLED", "COMPLETE", "INCOMPLETE"];

export class DummyData {
  _numDocs: number;

  constructor(numDocs: number) {
    this._numDocs = numDocs;
  }

  private getData() {
    let data: object[] = [];
    const numToGenerate = this._numDocs || DEFAULT_NUM_DOCS;
    console.log(`generateing ${numToGenerate} docs`);

    for (let i = 0; i < numToGenerate; i++) {
      data.push({
        name: lorem.generateWords(1),
        description: lorem.generateWords(5),
        created_by: "Tester",
        status: STATUSES[i % STATUSES.length],
        price: { value: i, currency: "CAD" },
        tags: ["api", "test"]
      });
    }
    return data;
  }

  public populateDB(): void {
    Request.insertMany(this.getData(), (err) => {
      if (err) {
        console.error(err);
      }
    })
  }
}