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

// ประกาศตัวแปร counter เพื่อใช้ในการนับจำนวนผู้ใช้
let counter = 1

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
    user.id = counter; // เพิ่ม id ให้กับผู้ใช้ โดยใช้ counter เป็นตัวนับ
    counter += 1; // เพิ่มค่า counter ขึ้น 1 เพื่อใช้ในการนับผู้ใช้ถัดไป
    users.push(user); // เพิ่มข้อมูลที่ส่งมาจาก client ลงใน array user
    // res.send(req.body);// ส่งข้อมูลที่ได้รับจาก client กลับไปยัง client
    res.json({
        message: 'User data received successfully',
        user: user
    }); // ส่งข้อมูลที่ได้รับจาก client กลับไปยัง client
});

// path = put /user/:id
// patch คือ การอัพเดทข้อมูลที่มีอยู่แล้ว >> มี field นั้นค่อยทำการอัพเดท
// :id คือ parameter ที่ใช้ในการระบุ id ของผู้ใช้ที่ต้องการอัพเดท
// ถ้าเป็น param พวก get จะสามารถรับค่าจาก url ได้เลย แต่ถ้าเป็น body พวก get จะไม่สามารถรับข้อมูลจาก url ได้
app.patch('/user/:id', (req, res) => {
    let id = req.params.id; // เก็บ id ที่ส่งมาจาก client

    let updateUser = req.body; // เก็บข้อมูลที่ส่งมาจาก client

    // ค้นหาผู้ใช้ที่มี id ตรงกับ id ที่ส่งมาจาก client
    // let selectedIndex = users.findIndex(user => {
    //     if (user.id == id) {
    //         return true; // ถ้าพบผู้ใช้ที่มี id ตรงกัน ให้คืนค่า true
    //     } else {
    //         return false; // ถ้าไม่พบผู้ใช้ที่มี id ตรงกัน ให้คืนค่า false
    //     }
    // });
    // or
    let selectedIndex = users.findIndex(user => user.id == id); // ค้นหาผู้ใช้ที่มี id ตรงกับ id ที่ส่งมาจาก client

    // update user
    // users[selectedIndex] = updateUser // อัพเดทข้อมูลผู้ใช้ที่พบ โดยใช้ selectedIndex เป็นดัชนีในการเข้าถึง array users
    // or
    if (updateUser.firstname) { // ถ้ามีการส่งชื่อใหม่มา
        users[selectedIndex].firstname = updateUser.firstname; // อัพเดทชื่อผู้ใช้
    }
    if (updateUser.lastname) { // ถ้ามีการส่งนามสกุลใหม่มา
        users[selectedIndex].lastname = updateUser.lastname; // อัพเดทนามสกุลผู้ใช้
    }
    if (updateUser.age) { // ถ้ามีการส่งอายุใหม่มา
        users[selectedIndex].age = updateUser.age; // อัพเดทอายุผู้ใช้
    }
    if (updateUser.email) { // ถ้ามีการส่งอีเมลใหม่มา
        users[selectedIndex].email = updateUser.email; // อัพเดทอีเมลผู้ใช้
    }

    // users ที่ update ใหม่ update กลับเข้าไปที่ users เดิม
    // res.send(selectedIndex + '');
    res.json({
        message: 'User data updated successfully',
        date: {
            user : updateUser,
            indexUpdate: selectedIndex
        }
    }); // ส่งข้อมูลที่ได้รับจาก client กลับไปยัง client
});

// path = delete /user/:id >> ระบุ id ของผู้ใช้ที่ต้องการลบ
// app.delete('/users/:id', (req, res) => {
//     let id = req.params.id; // เก็บ id ที่ส่งมาจาก client

//     // ค้นหาผู้ใช้ที่มี id ตรงกับ id ที่ส่งมาจาก client
//     let selectedIndex = users.findIndex(user => user.id == id); // ค้นหาผู้ใช้ที่มี id ตรงกับ id ที่ส่งมาจาก client

//     // ลบผู้ใช้ที่พบ
//     delete users[selectedIndex]; // ลบผู้ใช้ที่พบ โดยใช้ selectedIndex เป็นดัชนีในการเข้าถึง array users

//     res.json({
//         message: 'User data deleted successfully',
//         date: {
//             user : users[selectedIndex],
//             indexDelete: selectedIndex
//         }
//     }); // ส่งข้อมูลที่ได้รับจาก client กลับไปยัง client
// });
// or
app.delete('/users/:id', (req, res) => {
    let id = req.params.id; // เก็บ id ที่ส่งมาจาก client

    // ค้นหาผู้ใช้ที่มี id ตรงกับ id ที่ส่งมาจาก client
    let selectedIndex = users.findIndex(user => user.id == id); // ค้นหาผู้ใช้ที่มี id ตรงกับ id ที่ส่งมาจาก client

    // ลบผู้ใช้ที่พบ
    users.splice(selectedIndex, 1); // ลบผู้ใช้ที่พบ โดยใช้ selectedIndex เป็นดัชนีในการเข้าถึง array users

    res.json({
        message: 'User data deleted successfully',
        date: {
            user : users[selectedIndex],
            indexDelete: selectedIndex
        }
    }); // ส่งข้อมูลที่ได้รับจาก client กลับไปยัง client
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
}); // เริ่มต้นเซิร์ฟเวอร์ที่พอร์ต 3000 และแสดงข้อความเมื่อเซิร์ฟเวอร์เริ่มทำงาน

// node index_post.js >> run file
// npm install --save-dev nodemon >> ติดตั้ง nodemon
// npx nodemon index_post.js >> run file
