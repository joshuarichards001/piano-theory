import { Middleware, PayloadAction } from "@reduxjs/toolkit";
import { setMute } from "./slices/muteSlice";
import { addRecord, setRecords, updateRecord } from "./slices/recordsSlice";
import { RootState } from "./store";

const fetchRecordsMiddleware: Middleware<unknown, RootState> =
  () => (next) => (action) => {
    if (!isAction(action) || action.type !== "fetchRecords") {
      return next(action);
    }

    const storedRecords = localStorage.getItem("records");
    const records = storedRecords ? JSON.parse(storedRecords) : [];

    next(setRecords(records));

    return next(action);
  };

const setRecordMiddleware: Middleware<unknown, RootState> =
  () => (next) => (action) => {
    if (
      !isAction(action) ||
      (action.type !== addRecord.type && action.type !== updateRecord.type)
    ) {
      return next(action);
    }

    const storedRecords = localStorage.getItem("records");
    const records = storedRecords ? JSON.parse(storedRecords) : [];

    let recordExists = false;
    const updatedRecords = records.map((record: QuizTypeRecord) => {
      if (record.quizType === action.payload.quizType) {
        recordExists = true;
        return action.payload;
      }
      return record;
    });

    if (!recordExists) {
      updatedRecords.push(action.payload);
    }

    localStorage.setItem("records", JSON.stringify(updatedRecords));

    return next(action);
  };

const fetchMuteMiddleware: Middleware<unknown, RootState> =
  () => (next) => (action) => {
    if (!isAction(action) || action.type !== "fetchMute") {
      return next(action);
    }

    const storedMute = localStorage.getItem("mute");
    const mute = storedMute ? JSON.parse(storedMute) : false;

    next(setMute(mute));

    return next(action);
  };

const setMuteMiddleware: Middleware<unknown, RootState> =
  () => (next) => (action) => {
    if (!isAction(action) || action.type !== setMute.type) {
      return next(action);
    }

    localStorage.setItem("mute", JSON.stringify(action.payload));

    return next(action);
  };

function isAction(action: unknown): action is PayloadAction<QuizTypeRecord> {
  return (action as PayloadAction).type !== undefined;
}

export const rootCustomMiddleware: Middleware[] = [
  fetchRecordsMiddleware,
  setRecordMiddleware,
  fetchMuteMiddleware,
  setMuteMiddleware,
];
