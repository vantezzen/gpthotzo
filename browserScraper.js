/**
 * Scape a list of tweets in the browser
 *
 * Copy this code into the browser and it will output the scrape results once
 * the limit has been reached
 */
(async () => {
  const TWEET_LIMIT = 350;
  const SCROLL_DELAY = 5000;

  const scrapeTweets = () => {
    const tweets = Array.from(
      document.querySelectorAll('article[role="article"]')
    );
    return tweets
      .map((tweet) => {
        const tweetTextElement = tweet.querySelector("div[lang]");
        if (!tweetTextElement) return false;
        console.log(tweetTextElement);

        const tweetTextItems = Array.from(tweetTextElement.children);

        let tweetText = "";
        tweetTextItems.forEach((item) => {
          if (item.tagName === "IMG") {
            tweetText += item.getAttribute("alt");
          } else {
            tweetText += item.innerText;
          }
        });

        return tweetText;
      })
      .filter(Boolean);
  };

  let tweets = new Set();
  console.log("Scraping tweets...");
  while (tweets.size < TWEET_LIMIT) {
    const newTweets = await scrapeTweets();
    tweets = new Set([...tweets, ...newTweets]);
    window.scrollTo(0, document.body.scrollHeight);
    console.log(`Scraped ${tweets.size} tweets`);
    window.tweets = tweets;

    await new Promise((resolve) => setTimeout(resolve, SCROLL_DELAY));
  }

  console.log("Tweets scraped and are ready at window.tweets");
  window.tweets = tweets;
  console.log(tweets);
  console.log(JSON.stringify([...tweets]).replaceAll("\\\\", "\\"));
})();
