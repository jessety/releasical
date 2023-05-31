# releasical

> ICS calendar feed server for GitHub releases

Ever wanted your GitHub releases to start showing up in your calendar? Me either, but here we are.

[![ci](https://github.com/jessety/releasical/workflows/ci/badge.svg)](https://github.com/jessety/releasical/actions/workflows/ci.yml)

## Setup

First, install dependencies and build the project

```bash
npm install
npm run build
```

Create a `.env` file in the project directory with a GitHub PAT, and optionally a secret key:

```ini
GITHUB_TOKEN=xxx
SECRET=yyy
```

## Usage

Run the service using `npm start`. To start `untappical` as a pm2 service, run `pm2 start ecosystem.config.json`

To see the feed in your calendar application, add a subscription with the following path:
`http://host:port/users/username`

So for example, if the server is running on your local machine on port `8080` and the repository you want to monitor for releases is `jessety/releasical`, you would use the URL:
`http://localhost:8080/jessety/releasical`

If you set a secret key, all requests without it will be ignored:
`http://localhost:8080/jessety/releasical?secret=yyy`
