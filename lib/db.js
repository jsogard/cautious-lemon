const mysql = require('serverless-mysql')

const getConfig = () => {

  if(process.env.JAWSDB_MARIA_URL) {
    const creds = process.env.JAWSDB_MARIA_URL.match(/mysql:\/\/(.*?):(.*?)@(.*):3306\/(.*)/);
    return {
      user: creds[1],
      password: creds[2],
      host: creds[3],
      database: creds[4]
    };
  }

  return {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD
  }
}

const db = mysql({
  config: getConfig()
})

exports.query = async query => {
  try {
    const results = await db.query(query)
    await db.end()
    return results
  } catch (error) {
    return { error }
  }
}
