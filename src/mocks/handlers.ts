import { rest } from "msw";
import prefectures from "./api/prefectures";

export const handlers = [rest.get("/api/v1/prefectures", prefectures.get)];
