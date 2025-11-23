import { mockUsers } from "./constants.mjs";

export const resolveIndexByUserId = (request, response, next) => {
  const {
    params: { id },
  } = request;
  const userId = parseInt(id, 10);
  if (isNaN(userId)) return response.sendStatus(400);

  const findUserIndex = mockUsers.findIndex((user) => user.id === userId);

  if (findUserIndex < 0) return response.sendStatus(404);

  request.findUserIndex = findUserIndex;
  next();
};
