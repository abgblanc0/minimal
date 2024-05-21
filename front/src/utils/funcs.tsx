export function mergeStringsBetweenQuotes(arr: string[]): string[] {
  const result: string[] = [];
  let currentString: string = "";
  let insideQuotes: boolean = false;

  for (const string of arr) {
    if (string.startsWith('"')) {
      insideQuotes = true;
      currentString += string.slice(1);
    } else if (string.endsWith('"')) {
      insideQuotes = false;
      currentString += " " + string.slice(0, -1);
      result.push(currentString);
      currentString = "";
    } else if (insideQuotes) {
      currentString += " " + string;
    } else {
      result.push(string);
    }
  }

  return result;
}

export function parsePermissions(perms: number): string {
  let result = "";
  for (let i = 0; i < 3; i++) {
      result = toChar(perms % 10) + result;
      perms = Math.floor(perms / 10);
  }
  return result;
}

function toChar(permisos: number): string {
  return ((permisos & 4) ? 'r' : '-') +
         ((permisos & 2) ? 'w' : '-') +
         ((permisos & 1) ? 'x' : '-');
}


/*
function flowetch(user?: User) {
  const ARTR1 = "    _ _        ";
  const ARTR2 = "  (_\\_)       ";
  const ARTR3 = "  (__<__)      ";
  const ARTR4 = "   (_/_)       ";
  const ARTR5 = "  \\ |         ";
  const ARTR6 = "   \\|/        ";
  return [
    `${ARTR1}  host  ...   minimal`,
    `${ARTR2}  user  ...   ${user?.username}`,
    `${ARTR3}  shell ...   zsh - >.<`,
    `${ARTR4}  wm    ...   Hyprland`,
    `${ARTR5}  theme ...   ¿#¿.-.-¿`,
    `${ARTR6}  pkg   ...   -.¿?¿?;¿?`];
}
*/
