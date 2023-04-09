import * as dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import { TwitterApi } from "twitter-api-v2";

// Free API limit is 1500 tweets per month = 50 tweets per day = 2 tweets per hour
const TWEET_INTERVAL = 1000 * 60 * 30;
let interval: NodeJS.Timer;

console.log("Starting tweet bot");

const postTweet = async (reason: string) => {
  console.log("Posting tweet because of", reason);

  const tweets: string[] = JSON.parse(fs.readFileSync("tweets.json", "utf8"));
  const tweet = tweets.shift();
  if (!tweet) {
    console.log("No more tweets to tweet");
    clearInterval(interval);
    return;
  }

  console.log("Tweeting:", tweet);

  const consumerClient = new TwitterApi({
    appKey: process.env.TWITTER_APP_KEY!,
    appSecret: process.env.TWITTER_APP_SECRET!,
    accessToken: process.env.TWITTER_ACCESS_TOKEN!,
    accessSecret: process.env.TWITTER_ACCESS_SECRET!,
  });

  const { data: createdTweet } = await consumerClient.v2.tweet(tweet);
  console.log("Tweeted:", createdTweet);
  fs.writeFileSync("tweets.json", JSON.stringify(tweets, null, 2));
};

console.log("Posting first tweet");
postTweet("first tweet");

console.log("Setting interval");
interval = setInterval(() => postTweet("cron"), TWEET_INTERVAL);
