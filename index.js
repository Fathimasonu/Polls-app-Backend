require('dotenv').config() 
const express = require('express')
const cors = require('cors')
const { checkSchema } = require('express-validator')
const configureDB = require('./config/db')

const usersCltr = require('./app/controllers/users-cltr')
const categoryCltr=require('./app/controllers/category-cltr')
const pollsCltr = require('./app/controllers/poll-cltr')
const votesCltr=require('./app/controllers/vote-cltr')
const { authenticateUser } = require('./app/middlewares/authentication')
const { userRegisterValidationSchema, userLoginValidationSchema } = require('./app/helpers/user-validation')
const categoryValidationSchema=require('./app/helpers/category-validation')
const pollValidationSchema=require('./app/helpers/poll-validation')
const voteValidationSchema=require('./app/helpers/vote-validation')



const port = 3090
const app = express() 
app.use(express.json())
app.use(cors())

configureDB()

app.post('/auth/register', checkSchema(userRegisterValidationSchema), usersCltr.register)
app.post('/auth/login', checkSchema(userLoginValidationSchema), usersCltr.login)
app.get('/api/users/account', authenticateUser, usersCltr.account)

app.post('/api/category/create',authenticateUser,checkSchema(categoryValidationSchema),categoryCltr.create)
app.get('/api/category/list',categoryCltr.list)

app.get('/api/polls/active',pollsCltr.active)
app.post('/api/polls', authenticateUser, checkSchema(pollValidationSchema), pollsCltr.create) 
app.get('/api/mypolls',authenticateUser,pollsCltr.myPolls)

app.post('/api/polls/vote/:pollId',authenticateUser,checkSchema(voteValidationSchema),votesCltr.create)
app.get('/api/votes/myvotes', authenticateUser, votesCltr.myVotes)

app.listen(port, () => {
    console.log('server running on port', port)
})