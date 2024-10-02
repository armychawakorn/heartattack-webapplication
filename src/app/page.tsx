'use client';
import { useState } from "react";
import Swal from "sweetalert2";

interface IInput {
  age: number
  sex: number
  cp: number
  chol: number
  fastingbs: number
  maxhr: number
  oldpeak: number
  slope: number
}

export default function Home() {
  const [data, setData] = useState<IInput>({
    age: 1,
    sex: 0,
    cp: 0,
    chol: 0,
    fastingbs: 0,
    maxhr: 0,
    oldpeak: 0,
    slope: 0
  } as IInput)

  function predict() {
    Swal.fire({
      title: 'กำลังวิเคราะห์',
      didOpen: () => {
        Swal.showLoading()
      }
    })
    setTimeout(() => {
      fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([
          data.age,
          data.sex,
          data.cp,
          data.chol,
          data.fastingbs,
          data.maxhr,
          data.oldpeak,
          data.slope
        ])
      }).then(res => res.json()).then(data => {
        if (data.prediction == -1) {
          Swal.fire({
            title: 'ผลการวิเคราะห์',
            html: 'เกิดข้อผิดพลาดในการวิเคราะห์',
            icon: 'error'
          });
          return;
        }
        Swal.fire({
          title: 'ผลการวิเคราะห์',
          html: data.prediction == 0 ? '<span class="font-bold text-green-500">ไม่มีโอกาศ</span>เป็นโรคการโจมตีหัวใจ' : '<span class="font-bold text-red-500">มีโอกาศ</span>เป็นโรคการโจมตีหัวใจ',
          icon: 'success'
        });
      });
    }, 500);
  }
  return (
    <div className="flex justify-center text-white rounded-xl">
      <div className="container p-3 py-8">
        <div className="grid grid-row justify-center gap-5 border border-bg-white py-16">
          <p className="text-3xl text-center">ยินดีต้อนรับเข้าสู่AIวิเคราะห์<br />โรคหัวใจล้มเหลว</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid grid-rows-4 gap-3">
              <div className="grid grid-rows-2">
                <label htmlFor="age">อายุ</label>
                <input className="rounded-lg text-black px-2" type="number" id="age" name="age" defaultValue={1} max={200} min={1} onChange={(e) => {
                  setData({ ...data, age: parseInt(e.target.value) })
                }} />
              </div>
              <div className="grid grid-rows-2">
                <label htmlFor="sex">เพศ</label>
                <select className="rounded-lg text-black px-2" id="sex" name="sex" defaultValue={0} onChange={(e) => {
                  setData({ ...data, sex: parseInt(e.target.value) })
                }} >
                  <option value={0}>ชาย</option>
                  <option value={1}>หญิง</option>
                </select>
              </div>
              <div className="grid grid-rows-2">
                <label htmlFor="cp">ความเจ็บปวดในหน้าอก</label>
                <select className="rounded-lg text-black px-2" id="cp" name="cp" defaultValue={0} onChange={(e) => {
                  setData({ ...data, cp: parseInt(e.target.value) })
                }} >
                  <option value={0}>(ASY) ไม่มีอาการ</option>
                  <option value={1}>(ATA) หัวใจขาดเลือดแบบผิดปกติ</option>
                  <option value={2}>(NAP) อาการเจ็บหน้าอกที่ไม่ใช่หัวใจขาดเลือด</option>
                  <option value={3}>(TA) หัวใจขาดเลือดแบบทั่วไป</option>
                </select>
              </div>
              <div className="grid grid-rows-2">
                <label htmlFor="chol">คอเลสเตอรอลในเลือด</label>
                <input className="rounded-lg text-black px-2" type="number" id="chol" name="chol" defaultValue={0} onChange={(e) => {
                  setData({ ...data, chol: parseInt(e.target.value) })
                }} />
              </div>
            </div>
            <div className="grid grid-rows-4">
              <div className="grid grid-rows-2">
                <label htmlFor="fastingbs">ระดับน้ำตาลในเลือดหลังอดอาหาร</label>
                <select className="rounded-lg text-black px-2" id="fastingbs" name="fastingbs" defaultValue={0} onChange={(e) => {
                  setData({ ...data, fastingbs: parseInt(e.target.value) })
                }} >
                  <option value={0}>น้อยกว่า 120 mg/dl</option>
                  <option value={1}>มากกว่า 120 mg/dl</option>
                </select>
              </div>
              <div className="grid grid-rows-2">
                <label htmlFor="maxhr">อัตราการเต้นของหัวใจ</label>
                <input className="rounded-lg text-black px-2" type="number" id="maxhr" name="maxhr" defaultValue={0} onChange={(e) => {
                  setData({ ...data, maxhr: parseInt(e.target.value) })
                }} />
              </div>
              <div className="grid grid-rows-2">
                <label htmlFor="oldpeak">การเปลี่ยนแปลงของ ST</label>
                <input className="rounded-lg text-black px-2" type="number" id="oldpeak" name="oldpeak" defaultValue={0} onChange={(e) => {
                  setData({ ...data, oldpeak: parseInt(e.target.value) })
                }} />
              </div>
              <div className="grid grid-rows-2">
                <label htmlFor="slope">ความลาดเอียงของ ST</label>
                <select className="rounded-lg text-black px-2" id="slope" name="slope" defaultValue={0} onChange={(e) => {
                  setData({ ...data, slope: parseInt(e.target.value) })
                }} >
                  <option value={0}>ลง</option>
                  <option value={1}>เรียบ</option>
                  <option value={2}>ขึ้น</option>
                </select>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1">
            <button className="rounded-lg bg-green-500 text-white px-2 py-1" onClick={predict}>วิเคราะห์</button>
          </div>
        </div>
      </div>
    </div>
  );
}
