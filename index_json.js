// 1. mkdir myapp >> สร้างโฟลเดอร์ myapp
// 2. cd myapp >> เข้าไปในโฟลเดอร์ myapp
// 3. npm init -y >> สร้างไฟล์ package.json
// 4. npm install express >> ติดตั้ง express

// ประกาศตัวแปร express ซึ่ง require คือคำสั่งที่ใช้ในการนำเข้าโมดูล
const express = require('express');
// ประกาศตัวแปร app ซึ่งเป็น instance ของ express
const app = express(); // ใช้สำหรับจัดการตัว express

// ประกาศตัวแปร port ซึ่งเก็บหมายเลขพอร์ตที่ใช้ในการรันเซิร์ฟเวอร์
const port = 3000; // หมายเลขพอร์ตที่ใช้ในการรันเซิร์ฟเวอร์

// ประกาศตัวแปร path คือ '/'
app.get('/', (req, res) => {
    // สร้าง route สำหรับหน้าแรก
    let user = {
        firstname: 'Jirada',
        lastname: 'Dechintaranarak',
        age: 24,
        email: 'pinza@hotmail.com'
    }
    // req คือ request object ที่เก็บข้อมูลการร้องขอจากผู้ใช้
    // res คือ response object ที่ใช้ในการตอบสนองกลับไปยังผู้ใช้
    res.json(user);
})

app.listen(port, (req,res) => {
    console.log(`Server is running on http://localhost:${port}`);
}); // เริ่มต้นเซิร์ฟเวอร์ที่พอร์ต 3000 และแสดงข้อความเมื่อเซิร์ฟเวอร์เริ่มทำงาน

// node index_json.js >> run file
// npm install --save-dev nodemon >> ติดตั้ง nodemon
// npx nodemon index_json.js >> run file
