export function nonempty(str: string | null | undefined) {
  if (str === "") {
    return null;
  }
}

export function emptythrows(str: string) {
  if (str === "") {
    throw new Error("emptythrows exception: empty string");
  } else {
    return str;
  }
}
