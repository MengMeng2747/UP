const express = require('express')
const path = require('path');
const app = express()

const port = 3000



app.set('view engine','ejs')
app.set('Views', path.join(__dirname, 'Views'));

// ตั้งค่า static folder สำหรับไฟล์ CSS
app.use(express.static('Public'));
// ให้บริการไฟล์ static (CSS, images, JS)
app.use(express.static(path.join(__dirname, 'Public')));

app.get('/',(req, res) => {
    res.render('Login')
})

app.get('/home',(req, res) => {
    res.render('home')
})

app.get('/Project',(req, res) => {
    res.render('Project')
})

app.get('/Forgot',(req, res) => {
    res.render('Forgot')
})

app.get('/Register',(req, res) => {
    res.render('Register')
})

//--------------------------------------------------------------------------------------------

app.get('/Na1',(req, res) => {
    res.render('Na1')
})

app.get('/Na2',(req, res) => {
    res.render('Na2')
})

app.get('/Na3',(req, res) => {
    res.render('Na3')
})

app.get('/Na4',(req, res) => {
    res.render('Na4')
})

app.get('/Na5',(req, res) => {
    res.render('Na5')
})

app.get('/Na6',(req, res) => {
    res.render('Na6')
})

app.get('/Na7',(req, res) => {
    res.render('Na7')
})

app.get('/Na8',(req, res) => {
    res.render('Na8')
})

app.get('/Na9',(req, res) => {
    res.render('Na9')
})

app.get('/Na10',(req, res) => {
    res.render('Na10')
})



app.get('/Na11',(req, res) => {
    res.render('Na11')
})

app.get('/Na12',(req, res) => {
    res.render('Na12')
})

app.get('/Na13',(req, res) => {
    res.render('Na13')
})

app.get('/Na14',(req, res) => {
    res.render('Na14')
})

app.get('/Na15',(req, res) => {
    res.render('Na15')
})

app.get('/Na16',(req, res) => {
    res.render('Na16')
})

app.get('/Na17',(req, res) => {
    res.render('Na17')
})

app.get('/Na18',(req, res) => {
    res.render('Na18')
})

//--------------------------------------------------------------------------------------------

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});