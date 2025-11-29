
const TABLE = {
  'About Us': 'Về chúng tôi',
  'Multimedia': 'Đa phương tiện',
  'Artist': 'Nghệ sĩ',
  'Schedule': 'Lịch diễn',
  'Contact': 'Liên hệ',
  'Privacy Policy': 'Chính sách',
  'Amount': 'Số lượng',
  'Price': 'Giá',
  'Create a new account': 'Đăng ký tài khoản',
  'Forgot your password?': 'Quên mật khẩu',
  'Login': 'Đăng nhập',
  'Username': 'Tên đăng nhập',
  'Password': 'Mật khẩu',
  'Shop': 'Cửa hàng',
  'Back': 'Quay về',
  'Product': 'Sản phẩm',
  'Coming soon': 'Đang cập nhật',

  'Product Information': 'Thông tin sản phẩm',
  'Add to cart': 'Thêm vào giỏ hàng',
  'Check out': 'Thanh toán',
  'Name of product': 'Sản phẩm',

  'January': 'Tháng 1',
  'February': 'Tháng 2',
  'March': 'Tháng 3',
  'April': 'Tháng 4',
  'May': 'Tháng 5',
  'June': 'Tháng 6',
  'July': 'Tháng 7',
  'August': 'Tháng 8',
  'September': 'Tháng 9',
  'October': 'Tháng 10',
  'November': 'Tháng 11',
  'December': 'Tháng 12',

  'Mon': 'Thứ 2',
  'Tue': 'Thứ 3',
  'Wed': 'Thứ 4',
  'Thu': 'Thứ 5',
  'Fri': 'Thứ 6',
  'Sat': 'Thứ 7',
  'Sun': 'C.nhật',

  'Jan': 'Th.1',
  'Feb': 'Th.2',
  'Mar': 'Th.3',
  'Apr': 'Th.4',
  'May': 'Th.5',
  'Jun': 'Th.6',
  'Jul': 'Th.7',
  'Aug': 'Th.8',
  'Sep': 'Th.9',
  'Oct': 'Th.10',
  'Nov': 'Th.11',
  'Dec': 'Th.12',

  'Artist Training & Management': 'CHUYÊN BÁN TINH DẦU TẠI ĐỨC',
  'A member of VTQ Entertainment Group': 'MỘT THÀNH VIÊN CỦA TẬP ĐOÀN GIẢI TRÍ VTQ ENTERTAINMENT',
  'The Entertainment company established by famous singer SON TUNG M-TP': 'THÀNH LẬP BỞI NGHỆ SĨ VTQ',

  'Full name: ': 'Họ tên: ',
  'DOB: ': 'Ngày sinh: ',
  'Hometown: ': 'Quê quán: ',
  'Occupation: ': 'Lĩnh vực hoạt động: ',

  'July 05, 1994': '05 tháng 7, 1994',
  'Thai Binh, Vietnam': 'Thái Bình, Việt Nam',
  'Singer, Composer, Actor': 'Ca sĩ, Nhạc sĩ, Diễn viên',

  'May 06, 1994': '06 tháng 5, 1994',
  'Ho Chi Minh city, Vietnam': 'TP. Hồ Chí Minh, Việt Nam',

  'November 12, 1997': '12 tháng 11, 1997',
  'Actress': 'Diễn viên',

  'October 9,1993': '09 tháng 10, 1993',
  'Hanoi, Vietnam': 'Hà Nội, Việt Nam',
  'Music Producer, DJ': 'Nhà sản xuất âm nhạc, DJ',

  'August 29, 1988': '29 tháng 8, 1988',
  'Event/Show Director, Music Producer': 'Giám đốc sự kiện, Nhà sản xuất âm nhạc',
  
  'September 06, 1998': '06 tháng 9, 1998',
  'Creative/Art Director, Actor': 'Giám đốc sáng tạo, Diễn viên',

  'Address': 'Địa chỉ',
  'Phone': 'Điện thoại',
  '77 Hoang Van Thai, District 7, Ho Chi Minh city, Vietnam': 'Số 77 Hoàng Văn Thái, Quận 7, TP. Hồ Chí Minh, Việt Nam',

  'Purchasing Methods': 'Phương thức thanh toán',
  'Please choose your method for purchasing': 'Vui lòng chọn phương thức thanh toán',
  'Transfer': 'Chuyển khoản',
  'Cart': 'Giỏ hàng',
  'Shipping Information': 'Thông tin thanh toán',
  'Name': 'Tên',
  'Total': 'Tổng tiền',
  'Enter the new password': 'Nhập mật khẩu mới',
  'Username': 'Tên đăng nhập',
  'Change password': 'Thay đổi mật khẩu',
  'Save': 'Lưu',
  'Update Account': 'Cập nhật tài khoản',
  'Next': 'Tiếp tục',
  'Thank you for your order': 'Bạn đã đặt hàng thành công',
  'Please check your email for order information': 'Thông tin đơn hàng của bạn đã được gửi vào địa chỉ email của bạn'
};

const _e = txt=> localStorage.vni == 1 && TABLE[txt]? TABLE[txt]: txt;

export default _e;



// WEBPACK FOOTER //
// ./src/inc/lang.js