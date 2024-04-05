const express = require('express');
const router = express.Router();
const User = require('../model/userModel');

// Route để xử lý yêu cầu đăng ký

// GET: Lấy thông tin người dùng dựa trên email
router.get('/users/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });

        if (!user) {
            return res.status(404).json({ message: "Không tìm thấy người dùng" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET: Lấy tất cả người dùng
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
        console.log(users);
    } catch (error) {
        console.error(error);
        res.json({ error: error });
    }
});

// POST: Thêm một người dùng mới
router.post('/users', async (req, res) => {
    try {
        // Lấy thông tin người dùng từ request body
        const { email, password } = req.body;

        // Kiểm tra xem tất cả các trường đã được cung cấp hay chưa
        if (!email || !password) {
            return res.status(400).json({ message: "Vui lòng cung cấp đầy đủ thông tin người dùng" });
        }

        // Kiểm tra xem người dùng đã tồn tại trong cơ sở dữ liệu chưa
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            // Nếu người dùng không tồn tại, tạo người dùng mới
            const newUser = new User({ email, password });
            // Lưu người dùng mới vào cơ sở dữ liệu
            await newUser.save();
            // Trả về thông tin của người dùng mới đã được tạo
            return res.status(201).json(newUser);
        } else {
            // Nếu người dùng tồn tại, kiểm tra mật khẩu
            if (existingUser.password !== password) {
                // Nếu mật khẩu không khớp, trả về thông báo lỗi
                return res.status(401).json({ message: "Email hoặc mật khẩu không đúng" });
            } else {
                // Nếu mật khẩu khớp, trả về thông tin của người dùng
                return res.status(200).json(existingUser);
            }
        }
    } catch (error) {
        res.status(500).json({ message: error.message  });
    }
});
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'Người dùng không tồn tại' });
      }
  
      if (user.password !== password) {
        return res.status(401).json({ message: 'Mật khẩu không đúng' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


module.exports = router;
