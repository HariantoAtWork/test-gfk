const fetch = require('node-fetch')

// ---- #Step 1
const numbers = []
for (let i = 0; i < 100; ++i) {
    numbers.push(i+1)
}
const bizzapp = numbers.map(x => {
    let i
    i = (x % 3 === 0) ? 'Bizz' : x
    if (x % 5 === 0) {
        i = i === 'Bizz' ? `${i}Appz` : 'Appz'
    }
    return i
})

console.log('---- #STEP 1 -------------------')
bizzapp.forEach(i => console.log(i))


// ---- #Step 2
function User(name, password, email) {
    this.name = name
    this.password = password
    this.email = email

    this.method1 = console.log.bind(console, 'Method #1:', `${name} says:`)
}

const user1 = new User('harianto', 'password', 'hariantoatwork@gmail.com')
const user2 = new User('lena', 'herpassword', 'hariantoatwork+something@gmail.com')


console.log('---- #STEP 2 -------------------')

user1.method1('I love programming')
user2.method1('#Metoo!')
// user1.method2('Undefined') // output: method not exists

User.prototype.method2 = console.log.bind(console, 'Method #2:')
User.prototype.myEmail = function() {
    console.log(`Email: ${this.email}`)
}

user1.method2('Harianto Replies')
user2.method2('Lena Replies')
user2.myEmail()

console.log('user1 instanceOf User?:', user1 instanceof User)
console.log('user2 instanceOf User?:', user2 instanceof User)

// ---- #Step 3
console.log('---- #STEP 3 -------------------')


// ---- #Step 4
console.log('---- #STEP 4 -------------------')
const url1 = 'http://cdn.gfkdaphne.com/tests/async.php?a=1'
const url2 = 'http://cdn.gfkdaphne.com/tests/async.php?a=2'

// Paralell Fetch
Promise.all([
    fetch(url1)
    .then(res => res.text())
    .catch(console.error.bind(console, 'FETCH1 FAILED!')),
    fetch(url2)
    .then(res => res.text())
    .catch(console.error.bind(console, 'FETCH2 FAILED!'))
])
.then(fulfilList => {
    console.log('PARALLEL FETCH:', ...fulfilList)
})
.catch(console.error.bind(console, 'PROMISE ALL FAILED!'))

// Concurrent Fetch
async function asyncCall() {
    const answer1 = await fetch(url1)
        .then(res => res.text())
        .catch(console.error.bind(console, 'FETCH1 FAILED!'))

    const answer2 = await fetch(url2)
        .then(res => res.text())
        .catch(console.error.bind(console, 'FETCH2 FAILED!'))

    console.log('CONCURRENT FETCH:', `${answer1} ${answer2}`)
}

asyncCall()
