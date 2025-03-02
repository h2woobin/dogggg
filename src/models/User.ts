import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, '이메일을 입력해주세요'],
    unique: true,
  },
  name: {
    type: String,
    required: [true, '이름을 입력해주세요'],
  },
  password: {
    type: String,
    required: [true, '비밀번호를 입력해주세요'],
  },
  profileImage: {
    type: String,
    default: '',
  },
  pets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
  }],
  matches: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema); 