import api from './apiService';

class ContactUs {
  static send(info) {
    return api.post('/contact_us', info);
  }
}

export default ContactUs;
