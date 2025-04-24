const formatter = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" });

export const formatAsCurrency = (value: number) => formatter.format(value);
