const Pool = require('pg').Pool

const pool = new Pool({
    user: process.env.user,
    host: 'localhost',
    database: 'tutorialapi',
    password: process.env.password,
    port: process.env.port
})

// Get all users from DB
const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, result) => {
        if (error) {
            throw error
        }
        response.status(200).json(result.rows)
    })
}

// Get specific user
const getUserById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createUser = (request, response) => {
    const { name, email } = request.body

    pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
}
// Update a specific user's info in DB 
const updateUser = (request, response) => {
    const userID = parseInt(request.params.id)
    const { name, email } = request.body

    pool.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3',
        [name, email, userID],
        (error, results) => {
            if (error) {
                b
                throw error
            }
            response.status(200).send(`User modified with ID: ${userID}`)
        }
    )
}
// Delete a user from DB
const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}

// export functions so they can be used elsewhere.
module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}