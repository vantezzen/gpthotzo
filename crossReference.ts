import fs from "fs";

const trainingTweets = JSON.parse(
  fs.readFileSync("training-tweets.json", "utf8")
);
const tweets = JSON.parse(fs.readFileSync("tweets.json", "utf8"));

const filteredTweets = tweets.filter(
  (tweet: string) => !trainingTweets.includes(tweet)
);

fs.writeFileSync("tweets.json", JSON.stringify(filteredTweets, null, 2));

console.log("Removed", tweets.length - filteredTweets.length, "tweets");
