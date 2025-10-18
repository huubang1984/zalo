const flows = {
  welcome: {
    start: {
      message: (name = 'bạn') => `Chào ${name}, tôi là HR Assistant của công ty. Tôi có thể giúp bạn các vấn đề sau:`,
      quickReplies: [
        { title: '📝 Đăng ký nghỉ phép', payload: 'leave_request' },
        { title: '📊 Tra cứu thông tin cá nhân', payload: 'personal_info' },
        { title: '⏰ Hỗ trợ chấm công', payload: 'attendance' },
        { title: '📖 Hỏi đáp chính sách', payload: 'faq' },
        { title: '👩‍💼 Kết nối với HR', payload: 'contact_hr' }
      ]
    }
  }
};
module.exports = { flows };
