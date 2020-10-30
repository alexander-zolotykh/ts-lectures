const separator = "\n\n======================\n\n";

export const output = (...args: any[]) => {
  const out = document.getElementById("out");
  if (out) {
    out.innerHTML += args
      .map((arg) => JSON.stringify(arg, null, 2))
      .join(separator);
    out.innerHTML += separator;
  }
};
