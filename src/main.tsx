import * as Sentry from "@sentry/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home.tsx";
import Landing from "./components/Landing.tsx";
import QuizPage from "./components/QuizPage.tsx";
import "./index.css";
import { store } from "./redux/store.ts";

Sentry.init({
  dsn: "https://7a013f5f758180efc6bc7cf5afce7b06@o4507474674319360.ingest.us.sentry.io/4507475398819841",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  tracePropagationTargets: ["localhost", "https://pianotheory.app/"],
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 0,
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: ":quizType",
        element: <QuizPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
