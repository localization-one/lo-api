const getDateNow = (): number => {
  const now = new Date();
  return Math.floor(Date.UTC(
    now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),
    now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds()
  ) / 1000);
}

export { getDateNow };
