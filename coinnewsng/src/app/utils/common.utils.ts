export const updatedModelWithValues = (model: any, data: any) => {
  if (model && data) {
    Object.entries(data).forEach((entry) => {
      const [key, value] = entry;
      model[key] = value;
    });
  }
};
