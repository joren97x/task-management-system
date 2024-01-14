// import mysql from 'mysql2'
import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('task_management', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
})

export default sequelize

// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'task_management'
// })

// export default db