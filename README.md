# GPTHotzo

GPTHotzo automatically generates and posts tweets using GPT 4.

## Development

- Clone the repository
- Install dependencies with `npm install`
- Copy `.env.example` to `.env` and fill in the values

### Commands

- `npm start` - Create new tweets using the training tweets in `training-tweets.json` and insert them into `tweets.json`
- `npm run tweet` - Automatically tweet the tweets in `tweets.json` at the specified interval in `tweet.ts`
- `npm run crossReference` - Remove tweets from `tweets.json` that are already in `training-tweets.json`

## License

MIT
