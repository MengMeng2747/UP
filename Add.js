require('dotenv').config(); // เรียกใช้ dotenv
const express = require('express')
const path = require('path');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const port = 3000
const app = express();
const saltRounds = 10;

// ตั้งค่า body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine','ejs')
app.set('Views', path.join(__dirname, 'Views'));

app.use(express.static('Public'));
app.use(express.static(path.join(__dirname, 'Public')));

//--------------------------------------------------------------------------------------------

const db = mysql.createConnection({
    host: 'localhost',
    user: 'iot', // แก้ไขให้ตรงกับ MySQL ของคุณ
    password: '1234', // แก้ไขให้ตรงกับ MySQL ของคุณ
    database: 'user' // แก้ไขให้ตรงกับชื่อ Database ของคุณ
});

db.connect(err => {
    if (err) {
        console.error('❌ Error connecting to the database:', err);
    } else {
        console.log('✅ Connected to MySQL');
    }
});

//--------------------------------------------------------------------------------------------

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

app.get('/test',(req, res) => {
    res.render('test')
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

//--------------------------------------------------------------------------------------------

// 📌 Route สำหรับการลงทะเบียน
app.post('/Register', async (req, res) => {
    const { username, email, password, confirm_password } = req.body;

    // ตรวจสอบว่ารหัสผ่านและยืนยันรหัสผ่านตรงกันหรือไม่
    if (password !== confirm_password) {
        return res.status(400).json({ message: '❌ Passwords do not match!' });
    }

    // ตรวจสอบว่า username หรือ email มีอยู่แล้วหรือไม่
    const checkQuery = 'SELECT * FROM user WHERE username = ? OR email = ?';
    db.query(checkQuery, [username, email], async (err, result) => {
        if (err) {
            console.error('❌ Error checking user: ', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        if (result.length > 0) {
            return res.status(400).json({ message: '❌ Username or email already exists.' });
        }

        // ✅ เข้ารหัสรหัสผ่านก่อนเก็บลงฐานข้อมูล
        // const hashedPassword = await bcrypt.hash(password, saltRounds);

        // บันทึกลงฐานข้อมูล
        const insertQuery = 'INSERT INTO user (username, email, password) VALUES (?, ?, ?)';
        db.query(insertQuery, [username, email, password], (err, result) => {
            if (err) {
                console.error('❌ Error inserting user: ', err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }

            return res.redirect("/");
        });
    });
});

//--------------------------------------------------------------------------------------------

app.post('/Register1', (req, res) => {
    const username = req.body.username;
    const password = req.body.password; // เพิ่มรับค่ารหัสผ่าน
    // const md5password = crypto.createHash("md5").update(password).digest("hex");

    const sql = 'SELECT * FROM user WHERE username = ?';
    db.query(sql, [username], (err, result) => {
       if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
            return;
        }
        if (result.length === 0) {
            res.send("Email not found.");
            return;
        }
        if (result[0].password !== password) {
            res.send("Invalid password. Please try again.");
            return;
        }

        //  ถ้ารหัสผ่านถูกต้อง → Redirect ไปหน้าหลัก (เช่น "/home")
        res.redirect("/home");
    });
});

//--------------------------------------------------------------------------------------------

// เพิ่มความคิดเห็นลงในฐานข้อมูล
app.post('/add-comment', (req, res) => {
    const { user, comment } = req.body;

    if (!user || !comment) {
        return res.status(400).json({ message: 'กรุณากรอกชื่อและความคิดเห็น' });
    }

    const query = 'INSERT INTO commentgg (user, comment) VALUES (?, ?)';
    db.query(query, [user, comment], (err, result) => {
        if (err) {
            console.error('เกิดข้อผิดพลาด:', err);
            return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการเพิ่มความคิดเห็น' });
        }

        //  ถ้ารหัสผ่านถูกต้อง → Redirect ไปหน้าหลัก (เช่น "/home")
        res.redirect("/test");
    });
});

// รับความคิดเห็นทั้งหมด
app.get('/test', (req, res) => {
    const query = 'SELECT * FROM commentgg';
    db.query(query, (err, results) => {
        if (err) {
            console.error('เกิดข้อผิดพลาด:', err);
            return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลความคิดเห็น' });
        }
        res.status(200).json(results);
    });
});
