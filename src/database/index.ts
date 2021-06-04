import { createConnection } from "mysql2/promise";
import { tables } from "./tables";
import { mysqlConfig } from "../config";
import dateformat from "dateformat";
import { IDefaultResponse } from "../interfaces/common";

interface IPayloadFind {
  table: string;
  params: any;
}

interface IPayloadCreateOne {
  table: string;
  values: any;
}

interface IPayloadCreateMultiple {
  table: string;
  payload: Array<any>;
}

interface IPayloadUpdateOne {
  table: string;
  params: any;
  values: any;
}

class Database {
  tables = tables;

  async findOne({ table, params }: IPayloadFind): Promise<IDefaultResponse> {
    try {
      const connection = await createConnection(mysqlConfig);
      const sql = `SELECT * from ${table} WHERE ?`;
      const result = await connection.query(sql, params);
      const [rows, fields] = await connection.query(sql, params);
      return { result: true, data: rows[0] };
    } catch (error) {
      throw new Error(error);
    }
  }

  async find({ table, params }: IPayloadFind): Promise<IDefaultResponse> {
    try {
      let sql: string = `SELECT * from ${table} WHERE ?`;
      const connection = await createConnection(mysqlConfig);
      const [rows, fields] = await connection.query(sql, params);
      await connection.destroy();

      return { result: true, data: rows };
    } catch (error) {
      throw new Error(error);
    }
  }

  async createOne({
    table,
    values,
  }: IPayloadCreateOne): Promise<IDefaultResponse> {
    const connection = await createConnection(mysqlConfig);
    try {
      if (!values) return { result: false, data: [] };

      const currDate = new Date();
      const newValues = {
        ...values,
        created_at: dateformat(currDate, "YYYY-MM-DD HH:mm:ss", true),
        updated_at: dateformat(currDate, "YYYY-MM-DD HH:mm:ss", true),
      };

      const sql: string = `INSERT INTO ${table} SET ?`;
      const [rows] = await connection.query(sql, newValues);

      if (!rows)
        throw new Error(`Failed to create a record in the table ${table}`);

      return { result: true, data: rows[0] };
    } catch (error) {
      console.log(error);
      throw new Error(error);
    } finally {
      await connection.destroy();
    }
  }

  async createMultiple({
    table,
    payload,
  }: IPayloadCreateMultiple): Promise<IDefaultResponse> {
    const connection = await createConnection(mysqlConfig);
    try {
      await connection.beginTransaction();

      if (!payload) return { result: false, data: [] };

      const sql: string = `INSERT INTO ${table} SET ?`;

      payload.forEach(async (element) => await connection.query(sql, element));

      await connection.commit();

      return { result: true };
    } catch (error) {
      throw error;
    } finally {
      await connection.destroy();
    }
  }

  async updateOne({
    table,
    params,
    values,
  }: IPayloadUpdateOne): Promise<IDefaultResponse> {
    const connection = await createConnection(mysqlConfig);
    try {
      if (!values) return { result: false, data: [] };
      let where = "";
      Object.keys(params).forEach(
        (key, index) => `${index ? " AND " : ""}${key} = ${params[key]}`
      );

      const sql: string = `UPDATE ${table} SET ? WHERE ${where}`;
      const data = await connection.query(sql, values)[0][0];

      return { result: true, data };
    } catch (error) {
      throw error;
    } finally {
      await connection.destroy();
    }
  }
}

export { Database };
