// 1. mkdir myapp >> สร้างโฟลเดอร์ myapp
// 2. cd myapp >> เข้าไปในโฟลเดอร์ myapp
// 3. npm init -y >> สร้างไฟล์ package.json
// 4. npm install express >> ติดตั้ง express

// ประกาศตัวแปร express ซึ่ง require คือคำสั่งที่ใช้ในการนำเข้าโมดูล
const express = require('express');

const bodyParser = require('body-parser'); // ใช้สำหรับแปลงข้อมูลที่ส่งมาจาก client เป็น JSON

// ประกาศตัวแปร app ซึ่งเป็น instance ของ express
const app = express(); // ใช้สำหรับจัดการตัว express

// app.use(bodyParser.text()); // ใช้ body-parser เพื่อแปลงข้อมูลที่ส่งมาจาก client เป็น text
app.use(bodyParser.json()); // ใช้ body-parser เพื่อแปลงข้อมูลที่ส่งมาจาก client เป็น JSON

// ประกาศตัวแปร port ซึ่งเก็บหมายเลขพอร์ตที่ใช้ในการรันเซิร์ฟเวอร์
const port = 3000; // หมายเลขพอร์ตที่ใช้ในการรันเซิร์ฟเวอร์

// ประกาศตเก็บ user
let users = []

// ประกาศตัวแปร path คือ '/users' เพื่อใช้ในการดึงข้อมูลผู้ใช้จาก path /user ที่มีการยิงด้านล่าง
// วิธีนี้จะเก็บอยู่ใน memory ของ server แปลว่าเมื่อไหร่ก็ตามที่มันมีการ run ใหม่ มันจะลบข้อมูลเก่าออกไป จึงเป็นเหตุผลว่าต้องมี database
app.get('/users', (req, res) => {
    res.json(users); // ส่งข้อมูลที่เก็บใน array users กลับไปยัง client

});

// path = post /user >> text
app.post('/user', (req, res) => {
    // console.log('Body received:', req.body);
    let user = req.body; // เก็บข้อมูลที่ส่งมาจาก client
    // console.log('user : ',user); // แสดงข้อมูลที่ส่งมาจาก client ใน console
    users.push(user); // เพิ่มข้อมูลที่ส่งมาจาก client ลงใน array user
    // res.send(req.body);// ส่งข้อมูลที่ได้รับจาก client กลับไปยัง client
    res.json({
        message: 'User data received successfully',
        user: user
    }); // ส่งข้อมูลที่ได้รับจาก client กลับไปยัง client
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
}); // เริ่มต้นเซิร์ฟเวอร์ที่พอร์ต 3000 และแสดงข้อความเมื่อเซิร์ฟเวอร์เริ่มทำงาน

// node index_post.js >> run file
// npm install --save-dev nodemon >> ติดตั้ง nodemon
// npx nodemon index_post.js >> run file
