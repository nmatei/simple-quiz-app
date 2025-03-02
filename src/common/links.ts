import { getParam } from "./utilities";
import { simpleAlert } from "./simplePrompt/simplePrompt";

function getShiftKey(date: Date) {
  return date.getMonth() + date.getDate();
}

export function getPublicTestLink(groups: { [level: string]: number[] }, expire: number) {
  const shiftKey = getShiftKey(new Date());
  const minutes = Math.floor(new Date().getTime() / 60000);
  Object.entries(groups).forEach(([level, ids]) => {
    ids.forEach((id, i) => {
      ids[i] = id + shiftKey;
    });
  });
  const test = JSON.stringify(groups);
  const strings = `${test}.${minutes}.${expire}`;
  return btoa(strings);
}

export function getTestParameters(test: string) {
  const decoded = test === "1" ? ".1" : atob(test);
  const strings = decoded.split(".");
  const generated = parseInt(strings[1]);
  const shiftKey = getShiftKey(new Date(generated * 60000));
  return {
    groups: JSON.parse(strings[0] || "{}") as { [level: string]: number[] },
    shiftKey,
    generated,
    expire: parseInt(strings[2])
  };
}

export function getQuestionIndexes(test?: string) {
  test = test || getParam("test");
  if (!test) return null;

  const minutes = Math.floor(new Date().getTime() / 60000);
  const params = getTestParameters(test);
  console.warn(params, minutes);

  if (minutes - params.generated > params.expire) {
    console.error("Link Expired", minutes - params.generated);
    simpleAlert("This link is Expired!");
    return {
      "3": [1, 2, 3]
    };
  }

  const groups = params.groups;
  Object.entries(groups).forEach(([level, ids]) => {
    ids.forEach((id, i) => {
      ids[i] = id - params.shiftKey;
    });
  });
  return groups;
}
