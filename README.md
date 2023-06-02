# 🧞‍♂️ Genie Stamp (지니스탬프) ver.2

## 설명
초등 교사가 학급경영을 위해 자주 사용하는 방법인 "칭찬 도장"을 이 서비스를 통해 쉽게 관리할 수 있습니다. 

## 홈페이지
https://genie-stamp.herokuapp.com/

## 개발 목표
* [Jinee-Stamp(ver.1)](https://github.com/yeonee230/Jinee-Stamp)에서 기존 기능 성능 향상 및 기능 확장 
* 숙련도 향상을 위해서 내가 사용해본 기술들을 사용하기 (NodeJS, Pug, SCSS, MongoDB)
* 실제로 사용할 교사 및 학생의 상황을 고려하며 만들기

## 사용 기술
* Front-end : Pug, JS, SCSS
* Back-end : NodeJS, Express
* DB : MongoDB
* Deploy: Heroku
## 주요 기능
* 교사가 학생의 칭찬도장을 실시간으로 추가/삭제 할 수 있습니다. 
* 교사가 학생의 칭찬 도장 개수를 알 수 있으며 누적 순위를 확인할 수 있습니다.  
* 학생이 로그인해 자신의 칭찬도장 현황을 알 수 있습니다. 
* 반응형으로 구현했습니다.

---
## :pushpin: 데스크탑 화면 및 기능 시연 (영상)

### 교사 
* 회원가입 & 교사 로그인/로그아웃 
<video width="200" height="140" src="https://user-images.githubusercontent.com/115549917/235422865-45677e09-2ad1-4b18-b8b4-124a089e69c8.mov"></video>
* 도장 종류 추가 & 학생 추가/삭제
<video width="200" height="140" src="https://user-images.githubusercontent.com/115549917/235422872-0ecae881-4784-40aa-b026-6b6a5901c679.mov"></video>
* 학생 비밀번호 초기화
<video width="200" height="140" src="https://user-images.githubusercontent.com/115549917/235423496-bb2770f2-8070-4d40-8103-896be3449e7c.mov"></video>

* 도장 개수 실시간 추가/삭제
<video width="200" height="140" src="https://user-images.githubusercontent.com/115549917/235424306-4b225c59-2010-446a-9a7d-303bd86ea40f.mov"></video>
* 누적 도장 개수를 기반으로 순위 보여주기
<video width="200" height="140" src="https://user-images.githubusercontent.com/115549917/235422884-294d8b7f-3ae7-42d3-8c9b-b0569400f1b2.mov"></video>

### 학생
* 학생 로그인/로그아웃 & 학생 개별 도장 현황 확인
<video width="200" height="140" src="https://user-images.githubusercontent.com/115549917/235422893-905f2202-20b9-4234-a634-3db35a46f37e.mov"></video>
* 학생 비밀번호 변경
<video width="200" height="140" src="https://user-images.githubusercontent.com/115549917/235422896-73f2f3e2-9514-4584-9874-5e88ce38397e.mov"></video>

---
## :pushpin: 모바일 화면(이미지)

|  회원가입  | 교사용 로그인 1 | 교사용 로그인 2 |
| :-------------------------: | :-------------------------: | :-------------------------: | 
| <img width="300" alt="Screenshot 2023-05-01 at 4 44 20 PM" src="https://user-images.githubusercontent.com/115549917/235424907-af10575b-e62e-445e-a96f-edade6feaaa9.png"> | <img width="300" alt="Screenshot 2023-05-01 at 4 44 57 PM" src="https://user-images.githubusercontent.com/115549917/235424960-2525a006-9068-46b0-9d11-df0899704f87.png"> | <img width="300" alt="Screenshot 2023-05-01 at 4 45 48 PM" src="https://user-images.githubusercontent.com/115549917/235425073-c35b084e-e129-434f-a66d-e5632cb90112.png">


|   교사 메인 화면 | 칭찬 도장판  | 
| :-------------------------: | :-------------------------: |  
| <img width="300" alt="Screenshot 2023-05-01 at 4 45 57 PM" src="https://user-images.githubusercontent.com/115549917/235425099-eabf6084-26c3-4f7b-a99d-060ca4b81d55.png">| <img width="300" alt="Screenshot 2023-05-01 at 4 46 09 PM" src="https://user-images.githubusercontent.com/115549917/235425152-f0aa3d8d-a994-4d58-8fd7-30ef3c85dd09.png">  


|  학생 및 도장 관리1  | 학생 및 도장 관리 2 | 학생 및 도장 관리 3 |
| :-------------------------: | :-------------------------: | :-------------------------: | 
| <img width="300" alt="Screenshot 2023-05-01 at 4 46 16 PM" src="https://user-images.githubusercontent.com/115549917/235425197-42b71a18-6daa-4dff-a1fa-a8031f7e1c2e.png">| <img width="300" alt="Screenshot 2023-05-01 at 4 46 22 PM" src="https://user-images.githubusercontent.com/115549917/235425207-c7ec42cf-dfc3-4c6c-ab43-1e478ead459f.png">| <img width="300" alt="Screenshot 2023-05-01 at 4 46 26 PM" src="https://user-images.githubusercontent.com/115549917/235425211-bd533606-fa49-4083-84fa-5e1d7d24d5b9.png">

|  도장 통계1  | 도장 통계 2 | 도장 통계 3 |
| :-------------------------: | :-------------------------: | :-------------------------: | 
| <img width="300" alt="Screenshot 2023-05-01 at 4 46 35 PM" src="https://user-images.githubusercontent.com/115549917/235425311-c5db7e69-05c4-4653-a599-d1a8d409a16f.png">| <img width="300" alt="Screenshot 2023-05-01 at 4 46 39 PM" src="https://user-images.githubusercontent.com/115549917/235425316-6fdfc909-64da-4465-81bd-69dcdec00abd.png">| <img width="300" alt="Screenshot 2023-05-01 at 4 46 49 PM" src="https://user-images.githubusercontent.com/115549917/235425321-2a274415-6cb7-43d1-bdab-71cea5b1e1d3.png">

|  학생용 로그인 1  | 학생용 로그인 2  |
| :-------------------------: | :-------------------------: | 
| <img width="300" alt="Screenshot 2023-05-01 at 4 45 09 PM" src="https://user-images.githubusercontent.com/115549917/235424996-bfed9499-3443-4d8a-9cd6-e3e4e37335bf.png">| <img width="300" alt="Screenshot 2023-05-01 at 4 45 19 PM" src="https://user-images.githubusercontent.com/115549917/235425030-a9df399f-e926-4864-95d5-4fd0562884b3.png">

|  학생 메인 화면  | 학생 비밀번호 변경 화면  |
| :-------------------------: | :-------------------------: | 
| <img width="300" alt="Screenshot 2023-05-01 at 4 47 33 PM" src="https://user-images.githubusercontent.com/115549917/235425397-9375f4cf-e9a8-4beb-8224-beeefc57a953.png">| <img width="300" alt="Screenshot 2023-05-01 at 4 47 41 PM" src="https://user-images.githubusercontent.com/115549917/235425402-e9ecc25c-8769-446d-84d7-eb5b6e8cdb66.png">

---
## 기간
* 2023년 4월 15일 (토) ~ 2023년 4월 30일 (토) - 1차배포완료
* 2023년 5월 1일 (월) ~ 진행중 

---
## 앞으로 구현해야할 기능 
* ~~월별 도장 통계 보여주기~~ ✅
* 도장별 누적 개수 및 순위 보여주기
* 공동 순위 일때 처리
* 도장 이름 수정/삭제 
* ~~매월 1일 도장판 자동리셋~~ ✅
* ~~세션이 없는데, 세션 필요한 url들어갔을 경우 관리(url protector)~~ ✅
* flash 기능 


<!-- ## 겪었던 어려움
1. 디비 구성 
2. 통계 
3. CSS  -->