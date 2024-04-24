# Monster Candidate API

A simple and typed npm package providing a wrapper around the Monster Candidate API. This package is designed to be used in a Node.js environment.

## Installation

```bash
npm install monster-candidate-api
```

## Usage

```typescript
import { CandidateSearchAPI } from "monster-candidate-api";

const api = new CandidateSearchAPI({
    clientId: "your-api-key",
    clientSecret: "your-api-secret",
});

api.searchCandidates({
    country: "CA",
    searchType: "JobDetail",
    jobDetail: {
        jobTitle: "Software Developer",
    },
})
    .then((candidates) => {
        console.log(candidates);
    })
    .catch((error) => {
        console.error(error);
    });
```


## API Reference
You can find the API reference this package is based on [here](https://partner.monster.com/candidate-api)

## Disclaimers
This package is not affiliated with Monster. It is an unofficial package created by a third party.

Much of the code in this package is generated with the help of AI. As such, it may not be perfect. If you find any issues, please report them in the [GitHub repository](https://github.com/samiy803/monster-candidate-api/issues)

## License
This package is licensed under GPL-3.0. You can find the full license text [here](LICENSE)