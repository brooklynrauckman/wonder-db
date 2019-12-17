const Pool = require('pg').Pool
const pool = new Pool({
  user: 'orefbeit',
  host: 'salt.db.elephantsql.com',
  database: 'orefbeit',
  password: 'PJ-eu0z5aBf0hqQxA7JLQM1DWns-hwQp',
  port: 5432,
})

const getListByType = (request, response) => {
  const type = request.params.type

  return new Promise((resolve, reject)=>{
    pool.query(`SELECT * FROM "public"."objects" WHERE type = '${type}'`, (error, results) => {
      if (error) reject({error: 'query messed up'});
      resolve(results.rows);

    })
  })
}

const insertName = (request, response) => {
  const name = request.body.name

  return new Promise((resolve, reject)=>{
   
    pool.query(`INSERT INTO "public"."guests" (name) VALUES ('${name}')`, (error, results) => {
      if (error) reject({error: 'query messed up'});
      
      resolve({success: true});
    })
  })
}

const getNames = (request, response) => {

  return new Promise((resolve, reject)=>{
   
    pool.query(`SELECT * FROM "public"."guests"`, (error, results) => {
      if (error) reject({error: 'query messed up'});
      
      resolve(results.rows);
      console.log(results.rows);
    })
  })
}

module.exports = {
  getListByType, 
  insertName, 
  getNames
  }