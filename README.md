# trivia-hai-study-front

React web client for a trivia-based experimental platform used in two human-subjects studies at **Prof. David Sarne's Multi-Agent Systems lab** (Bar-Ilan University).

Built while serving as a research assistant in the lab during my B.Sc. Solo work.

## The research

The platform was deployed and used in two studies:

1. **Inclusion study** (joint with the BIU Education Department) — measured satisfaction / frustration responses of regular students vs. students with special needs when losing a trivia round.

2. **Human-agent interaction (HAI) study** — measured satisfaction / frustration when playing *with* an AI agent as a teammate, or *against* one as an opponent, across different agent behaviour profiles. The goal: inform how AI agents should behave to keep human partners engaged.

## What's in here

- Team pages with custom avatars
- i18n (English / Hebrew toggle via `LanguangeButton` — typo preserved from the original codebase)
- Game-finish screens with audio feedback (`crowd_happy.mp3` / `crowd_sad.mp3`)
- Custom `NavBar` and logout modal
- Talks to the JWT-authed Express/Mongo backend in the companion repo.

## Run

```bash
npm install
npm start   # http://localhost:3000
```

Expects the backend running separately; set the server URL in the API client.

## Companion repo

Backend: [trivia-hai-study-back](https://github.com/EliranEiluz/trivia-hai-study-back)
