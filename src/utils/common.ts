import { v4 as uuidv4 } from "uuid";
export const getNewUuid = () => {
  return uuidv4();
};

export const rowClass = (data: any) => {
  return [{ "inactive-row": data.Active === false }];
};
