const mysqlConfig = {
  user: "stgadmin",
  password: "ReetaiGhi7aemu0yi4Zaed8zii7ohqua", // this will be fetched from SSM parameter store later
  database: "accounts",
  host: "abspayment-abs-blockchain-stg-cluster.cluster-cm4cjntqldfm.eu-central-1.rds.amazonaws.com",
  port: 3306,
};

export { mysqlConfig };
