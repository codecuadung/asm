const express = require('express')
const router = express.Router();
const sanphamModel = require('../model/sanphamModel')

router.get('/sanphams', async (req,res)=>{
    try {
        const sanpham = await sanphamModel.find(); // Sử dụng sanphamModel để truy vấn dữ liệu từ collection sanpham
        res.json(sanpham); // Trả về dữ liệu dưới dạng JSON
        console.log(sanpham);
    } catch (error) {
        console.error(error);
        res.json({error: error});
    }
});

module.exports = router;
