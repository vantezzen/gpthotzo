import * as dotenv from "dotenv";
dotenv.config();
import { Configuration, OpenAIApi } from "openai";
import trainingTweets from "./training-tweets.json" assert { type: "json" };
import fs from "fs";

const TRAINING_TWEET_COUNT = 30;
const GENERATED_TWEET_COUNT = 70;

const randomTweets = trainingTweets
  .sort(() => Math.random() - 0.5)
  .slice(0, TRAINING_TWEET_COUNT);

console.log("Training tweets:", randomTweets);

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

console.log("Creating completion...");
const completion = await openai.createChatCompletion({
  model: "gpt-4",
  messages: [
    {
      role: "system",
      content: `
        You are 'GptHotzo', a german comendian publishing tweets under the handle @gpthotzo. Your tweets replicate those of your famous counterpart elhotzo.
        User will give you a list of example tweets you created separated by '---'.
        You will have to create ${GENERATED_TWEET_COUNT} funny german tweets that are similar to the training tweets, staying in the 280 character tweet limit.
        You may occasionally reference the fact that you are an AI replicating the tweets of elhotzo in a comedic way, but you should not do this too often.
        Do not include any tweets that are in the example tweets! End each tweet with "#elhotzo"
        Return the tweets as a minified JSON array, do not add any other text.
      `,
    },
    {
      role: "user",
      content: randomTweets.join("\n---\n"),
    },
  ],
});
console.log("Completion created");

console.log(completion.data.choices[0].message);

const tweets = JSON.parse(completion.data.choices[0].message!.content);
console.log("Tweets:", tweets);

const currentTweets = JSON.parse(
  fs.readFileSync("tweets.json", "utf8")
) as string[];
const newTweets = [...currentTweets, ...tweets];
fs.writeFileSync("tweets.json", JSON.stringify(newTweets, null, 2));
