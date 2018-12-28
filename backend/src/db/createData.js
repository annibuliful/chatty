import db from './index';

export default async (tableName, data) => db.table(tableName).insert(data);
