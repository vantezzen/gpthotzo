import * as dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import { TwitterApi } from "twitter-api-v2";

const TWEET_INTERVAL = 1000 * 60 * 20;
let interval: NodeJS.Timer;

const postTweet = async () => {
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

postTweet();
interval = setInterval(postTweet, TWEET_INTERVAL);
