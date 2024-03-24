const mongoose = require('mongoose');
const sanphamSchema = new mongoose.Schema({
    idSP: {
        type: String,
        require: true
    },
    tenSP: {
        type: String,
        require: true
    },
    ghiChu: {
        type: String,
        require: true
    },
    giaSP: {
        type: Number,
        require: true
    },
    maLoaiSP: {
        type: String,
        require: true
    },
    hinhAnh: {
        type: String,
        require: true
    }
})
const sanphamModel = mongoose.model('sanpham', sanphamSchema);
module.exports = sanphamModel