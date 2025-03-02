import mongoose from 'mongoose';

const PetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '이름을 입력해주세요'],
  },
  breed: {
    type: String,
    required: [true, '품종을 입력해주세요'],
  },
  age: {
    type: Number,
    required: [true, '나이를 입력해주세요'],
  },
  images: [{
    type: String,
    required: [true, '최소 한 장의 사진이 필요합니다'],
  }],
  description: {
    type: String,
    required: [true, '소개를 입력해주세요'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  dislikes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Pet || mongoose.model('Pet', PetSchema); 