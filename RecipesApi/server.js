const {db} = require ('./config/data.js')

async function getVersion() {
    const result = await db.raw('select version()')
    console.log(result.rows)
}

getVersion()