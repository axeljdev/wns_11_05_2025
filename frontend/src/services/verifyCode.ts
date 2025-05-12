const isValidCountryCode = (str: string) => {
  if (str === "") return true;
  return /^[A-Z]{2}$/.test(str);
};

export default isValidCountryCode;
