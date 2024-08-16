const prepareParams = (values) => {
  const params = new URLSearchParams();
  Object.keys(values).forEach((key) => {
    params.append(key, values[key]);
  });
  return params;
};

export default prepareParams;
