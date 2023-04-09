/**
 * Scape a list of tweets in the browser
 *
 * Copy this code into the browser and it will output the scrape results once
 * the limit has been reached
 */
(async () => {
  const TWEET_LIMIT = 1000;
  const SCROLL_DELAY = 300;
  const TWEET_WORD_FILTER = [
    // Dont use sensitive topics - we don't want to joke about them
    "hanau",

    // Remove links and ads for the book
    "kiwi-verlag",
    "http://",
    "https://",
  ];

  const scrapeTweets = () => {
    const tweets = Array.from(
      document.querySelectorAll('article[role="article"]')
    );
    return tweets
      .map((tweet) => {
        const tweetTextElement = tweet.querySelector("div[lang]");
        if (!tweetTextElement) return false;

        const isRetweet = tweet.querySelector('[data-testid="socialContext"]');
        if (isRetweet) return false;

        const isTweetWithImage = tweet.querySelector(
          '[data-testid="tweetPhoto"]'
        );
        if (isTweetWithImage) return false;

        const tweetTextItems = Array.from(tweetTextElement.children);

        let tweetText = "";
        tweetTextItems.forEach((item) => {
          if (item.tagName === "IMG") {
            tweetText += item.getAttribute("alt");
          } else {
            tweetText += item.innerText;
          }
        });

        if (
          TWEET_WORD_FILTER.some((word) =>
            tweetText.toLowerCase().includes(word)
          )
        ) {
          return false;
        }

        return tweetText;
      })
      .filter(Boolean);
  };

  let tweets = new Set();
  console.log("Scraping tweets...");
  while (tweets.size < TWEET_LIMIT) {
    const newTweets = await scrapeTweets();
    tweets = new Set([...tweets, ...newTweets]);

    document.scrollingElement.scrollTop += 1000;
    console.log(`Scraped ${tweets.size} tweets`);
    window.tweets = tweets;

    await new Promise((resolve) => setTimeout(resolve, SCROLL_DELAY));
  }

  console.log("Tweets scraped and are ready at window.tweets");
  window.tweets = tweets;
  console.log(tweets);
  console.log(JSON.stringify([...tweets]).replaceAll("\\\\", "\\"));
})();
