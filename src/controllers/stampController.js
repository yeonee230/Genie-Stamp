import StampModel from '../models/Stamp';
import StudentModel from '../models/Student';

export const getBoard = async (req, res) => {
  const { _id } = req.session.user;
  const dbStudents = await StudentModel.find({ teacherId: _id });
  const stamps = await StampModel.find({ teacherId: _id });
  const arr = dbStudents[0].currStamps;
  const lastValue = arr[arr.length - 1];

  const newMonth = new Date().getMonth() + 1; // 현재 월 가져오기 (1월: 1, 2월: 2, ...)
  let currentMonth = lastValue.month; // 디비에 저장되어 있는 가장 최신 month 확인

  if (currentMonth !== newMonth) {
    console.log('❗️ currentMonth !== newMonth');
    currentMonth = newMonth;
    await onMonthChanged(currentMonth, req);
  } else {
    console.log('✅ currentMonth === newMonth');
  }

  //const data = students.forEach(student => ({... student, index:11}));
  const students = dbStudents.map((item) => ({
    ...item._doc,
    currStamps: item.currStamps.filter(
      (stamp) => stamp.month === new Date().getMonth() + 1
    ),
  }));

  return res.render('board', { pageTitle: '칭찬도장판', stamps, students });
};

export const getStats = async (req, res) => {
  const { _id } = req.session.user;
  const stamps = await StampModel.find({ teacherId: _id });

  return res.render('stats', { pageTitle: '통계', stamps });
};

//칭찬 도장 종류 추가
export const addStampType = async (req, res) => {
  const { title } = req.body;

  const newStamp = new StampModel({
    title,
    teacherId: req.session.user._id,
  });
  await newStamp.save();

  res.redirect('/setting');
};

//칭찬 도장 종류 삭제
export const deleteStampType = async (req, res) => {
  const { id } = req.params; //stampID
  console.log('stamp id:: ', id);
  const stamp = await StampModel.findById(id);

  if (!stamp) {
    return res.status(404).render('404', { pageName: 'stamp not found!' });
  }

  await StampModel.findByIdAndDelete(id);
  return res.redirect('/setting');
};

//칭찬 도장 이름 수정
export const editStampType = async (req, res) => {
  const { id } = req.params; //stampID

  await StampModel.findByIdAndUpdate(id, {
    title: req.body.title,
  });

  return res.redirect('/setting');
};

//-------------- 누적 도장 랭킹 가져오기 --------------
//이번달 누적 도장 랭킹 가져오기
export const rankingTotalStamps1 = async (req, res) => {
  const { _id } = req.session.user;
  const dbStudents = await StudentModel.find({ teacherId: _id });
  const stamps = await StampModel.find({ teacherId: _id });
  // console.log("dbStudents:: ", dbStudents);

  const students = dbStudents.map((item) => ({
    ...item._doc,
    currStamps: item.currStamps.filter(
      (stamp) => stamp.month === new Date().getMonth() + 1
    ),
  }));
  // console.log("students:: ", students);

  const filteredStudents = students.sort(
    (a, b) => b.currStamps[0].total - a.currStamps[0].total
  );
  // console.log("filteredStudents:: ", filteredStudents);

  const rankingStudnets = filteredStudents.map((item, index) => ({
    ...item,
    ranking: index + 1,
  }));
  // console.log("rankingStudnets:: ", rankingStudnets);
  return res.render('stats', {
    pageTitle: '도장 통계',
    stamps,
    rankingStudnets,
  });
};
// rankingTotalStamps 함수 리팩토링
export const rankingTotalStamps = async (req, res) => {
  const { _id } = req.session.user;
  const dbStudents = await StudentModel.find({ teacherId: _id });
  const stamps = await StampModel.find({ teacherId: _id });

  const filteredStudents = dbStudents
    .map((student) => ({
      ...student._doc,
      currStamps: student.currStamps.filter(
        (stamp) => stamp.month === new Date().getMonth() + 1
      ),
    }))
    .filter((student) => student.currStamps.length > 0)
    .sort((a, b) => b.currStamps[0].total - a.currStamps[0].total)
    .map((student, index) => ({ ...student, ranking: index + 1 }));

  return res.render('stats', {
    pageTitle: '도장 통계',
    stamps,
    rankingStudnets: filteredStudents,
  });
};

//----
// 월 변경 시 실행할 함수
async function onMonthChanged(newMonth, req) {
  try {
    console.log('onMonthChanged 실행');

    const { _id } = req.session.user; // 선생님이 누군지 찾고
    console.log('_id : ', _id);
    const dbStudents = await StudentModel.find({ teacherId: _id }).exec(); // 선생님의 학생들을 모두 찾고
    const stamps = await StampModel.find({ teacherId: _id }).exec(); // 선생님의 도장을 모두 찾고

    console.log('dbStudents : ', dbStudents);
    console.log('stamps : ', stamps);

    // 학생 도장데이터에 새로운 month 추가하기
    for (const student of dbStudents) {
      console.log('student1 : ', student);
      student.currStamps.push({
        month: newMonth,
        stamps: stamps.map((stamp) => ({
          stamp_id: stamp._doc._id,
          title: stamp._doc.title,
          value: 0,
        })),
        total: 0,
      });
      await student.save().catch((error) => {
        console.error(
          '학생 data의 new month 저장 중 에러가 발생했습니다.',
          error
        );
      });
      console.log('student2 : ', student);
    }

    console.log('✅ dbStudents 저장 성공 : ', dbStudents);
  } catch (error) {
    console.error('월 변경 중 에러가 발생했습니다.', error);
  }
}
