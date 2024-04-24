This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## for flask file
make a flask folder
```bash
py -3 -m venv .venv
.venv\Scripts\activate
pip install Flask xgboost numpy pandas
```
add app.py in .venv folder
make directory model in .venv
add model.joblib file in .venv/model
and run
```bash
flask run -h localhost -p 80
```
