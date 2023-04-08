# GPTHotzo

GPTHotzo automatically generates and posts tweets using GPT 4.

## Development

- Clone the repository
- Install dependencies with `npm install`
- Copy `.env.example` to `.env` and fill in the values

GPTHotzo works in two steps: Generating the tweets and putting them in a queue-like file at `tweets.json` and then tweeting them from that file one-by-one and removing them from there.
Both steps are designed to be able to run in parallel: You can let the `tweet` cron run constantly and then run `npm start` whenever you want to generate new tweets. New tweets will be added to the queue after the remaining tweets from previous runs.

### Commands

- `npm start` - Create new tweets using the training tweets in `training-tweets.json` and insert them into `tweets.json`
- `npm run tweet` - Automatically tweet the tweets in `tweets.json` at the specified interval in `tweet.ts`
- `npm run crossReference` - Remove tweets from `tweets.json` that are already in `training-tweets.json`

## License

MIT
