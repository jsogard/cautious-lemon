const db = require('../../lib/db');
const escp = require('sql-template-strings')


export default async (req, res) => {

	const test = await db.query(escp`
		SELECT *
		FROM test
		`);

	res.status(200).json({
		test
	});
};