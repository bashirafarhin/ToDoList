import env from "dotenv";
import pg from "pg";
const { Pool } = pg

env.config();

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
})

pool.connect((err,client,done) => {
    if(err) {
        console.log(err);
    } else {
        console.log("connection created with PostgreSQL");
    }
});

export default pool;