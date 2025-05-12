const isCountryFlag = (str: string) => {
  if (str === "") return true;
  return /^🇦|^🇧|^🇨|^🇩|^🇪|^🇫|^🇬|^🇭|^🇮|^🇯|^🇰|^🇱|^🇲|^🇳|^🇴|^🇵|^🇶|^🇷|^🇸|^🇹|^🇺|^🇻|^🇼|^🇽|^🇾|^🇿/.test(
    str
  );
};

export default isCountryFlag;
