import db from './index';

export default tableName => db.tableCreate(tableName);
