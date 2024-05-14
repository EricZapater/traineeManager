import { v4 as uuidv4 } from "uuid";
export const getNewUuid = () => {
  return uuidv4();
};

export const rowClass = (data: any) => {
  return [{ "inactive-row": data.Active === false }];
};

export const formatDate = (date: any) => {
  if (!date) return ""; // Devuelve cadena vacía si la fecha no es válida

  const year = date.getFullYear(); // Obtener el año de la fecha
  let month = date.getMonth() + 1; // Obtener el mes de la fecha (0-11, por eso se suma 1)
  let day = date.getDate(); // Obtener el día de la fecha

  // Asegurarse de que el mes y el día tengan dos dígitos
  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;

  return `${year}-${month}-${day}`; // Formato YYYY-MM-DD
};

export const formatISO8601Date = (date: Date) => {
  if (!date) return ""; // Devuelve cadena vacía si la fecha no es válida

  // Convierte la fecha a un string ISO 8601 (Ej: 2020-01-01T12:00:00.000Z)
  const isoString = date.toISOString();

  // Extrae la fecha y la hora en formato local
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  const localDateString = localDate.toISOString().slice(0, 19);

  // Obtener el offset de la zona horaria en horas y minutos
  const tzOffset = -date.getTimezoneOffset();
  const offsetSign = tzOffset >= 0 ? "+" : "-";
  const offsetHours = Math.floor(Math.abs(tzOffset) / 60)
    .toString()
    .padStart(2, "0");
  const offsetMinutes = (Math.abs(tzOffset) % 60).toString().padStart(2, "0");

  // Componer la fecha final en formato requerido por el backend
  return `${localDateString}${offsetSign}${offsetHours}:${offsetMinutes}`;
};
