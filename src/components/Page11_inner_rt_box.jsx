import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import '../pages/Home.scss';

const Page11_inner_rt_box = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    message: ''
  });

  const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const userID = import.meta.env.VITE_EMAILJS_USER_ID;

  const resetForm = () => {
    setFormData({
      from_name: '',
      from_email: '',
      message: ''
    });
    form.current.reset(); // 폼 초기화
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      serviceID,
      templateID,
      form.current,
      userID 
    )
    .then(() => {
      alert('메세지가 전송되었습니다.\n감사합니다 :)');
      resetForm(); // 성공 시 폼 리셋
    })
    .catch(() => {
      alert('메세지 전송에 실패하였습니다.\n다시 시도해주세요.');
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // 기본 Enter 동작을 막음
      
      // 모든 필드가 입력되었을 때만 전송
      if (formData.from_name && formData.from_email && formData.message) {
        sendEmail(e);
        alert('메세지가 전송되었습니다.\n감사합니다 :)');
      } else {
        alert('모든 필드를 입력해주세요.');
      }
    }
  };

  return (
    <div className="page11_inner_rt_box">
      <div className="page11_inner_rt_box_inner">
        <div className="page11_inner_rt_box_t">
          <h2>Let’s Work <span>Together.</span></h2>
          <p>함께 일할 기회나 문의 사항이 있으시면 메세지를 보내주세요.</p>
        </div>
        <div className="page11_inner_rt_box_bt">
          <form ref={form} onSubmit={sendEmail}>
            <div className="input_box">
              <div className="name_input">
                <label htmlFor="from_name">Name:</label>
                <input 
                  type="text" 
                  id="from_name" 
                  name="from_name" 
                  placeholder="성함 및 회사명을 작성해주세요." 
                  required 
                  value={formData.from_name}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress} // Enter 키 눌렀을 때 처리
                />
                <span className="material-symbols-rounded contact_ic">
                  account_circle
                </span>
              </div>
              <div className="email_input">
                <label htmlFor="from_email">Email:</label>
                <input 
                  type="text" 
                  id="from_email" 
                  name="from_email" 
                  placeholder="이메일 및 연락처를 작성해주세요." 
                  required 
                  value={formData.from_email}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress} // Enter 키 눌렀을 때 처리
                />
                <span className="material-symbols-rounded contact_ic">
                  call
                </span>
              </div>
              <div className="tx_input">
                <label htmlFor="message">Message:</label>
                <textarea 
                  id="message" 
                  name="message" 
                  placeholder="메세지를 입력해주세요." 
                  required 
                  value={formData.message}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress} // Enter 키 눌렀을 때 처리
                />
                <span className="material-symbols-rounded contact_ic">
                  sms
                </span>
              </div>
            </div>
            <button type="submit">
              Send message
              <span className="material-symbols-rounded">
                send
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page11_inner_rt_box;
