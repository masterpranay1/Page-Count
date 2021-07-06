const date = document.querySelector(".date");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

const plusAll = document.querySelectorAll(".fa-plus-circle");
const minusAll = document.querySelectorAll(".fa-minus-circle");
const cntUser1 = document.querySelector(".countUser1");
const cntUser2 = document.querySelector(".countUser2");
let cnt1 = 0;
let cnt2 = 0;

const winner = document.querySelectorAll(".currentWinner");

/* firebase config */
var firebaseConfig = {
  apiKey: "AIzaSyB_cKB4FsUaI5BeRMp0C5HtFa1P2OMYqks",
  authDomain: "page-count-7d901.firebaseapp.com",
  projectId: "page-count-7d901",
  storageBucket: "page-count-7d901.appspot.com",
  messagingSenderId: "605505235627",
  appId: "1:605505235627:web:6902c52831032b60e2e5ee",
  measurementId: "G-KC1MSS5Y2C",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

var d = new Date();
var year = d.getFullYear();
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
var month = months[d.getMonth()];
var dateNum = d.getDate();
var dateStr = dateNum + month + year;
date.textContent = `${dateNum} ${month} ${year}`;


const updateDocument = (dateString) => {
// this funtion creates or overWrites the document in firestore
  db.collection("dates")
    .doc(dateString)
    .set({
      date: dateString,
      Pranay: cnt1,
      Ishan: cnt2,
    })
    .then(() => {
      // console.log("Document Succesfully written");
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateWinner = () => {
  if (cnt1 > cnt2) {
    winner[0].classList.remove("inActive");
    winner[1].classList.add("inActive");
  } else if (cnt1 < cnt2) {
    winner[0].classList.add("inActive");
    winner[1].classList.remove("inActive");
  } else {
    winner[0].classList.add("inActive");
    winner[1].classList.add("inActive");
  }
};
const updateCounts = () => {
// this function performs the UI tasks
  cntUser1.textContent = cnt1;
  cntUser2.textContent = cnt2;
  updateWinner();
};

const getDocument = (dateString) => {
// this function loads a new document and update Ui accordingly
  db.collection("dates")
    .doc(dateString)
    .get()
    .then((doc) => {
      if (doc.exists) {
        cnt1 = doc.data().Pranay;
        cnt2 = doc.data().Ishan;
        updateCounts();
      } else {
        updateDocument(dateString);
        updateCounts();
      }
    });
};
getDocument(dateStr);

plusAll.forEach((plus) => {
  plus.addEventListener("click", (e) => {
    if (e.target.parentElement.classList.contains("user1")) {
      cnt1 += 1;
    } else {
      cnt2 += 1;
    }
    updateCounts();
    updateDocument(dateStr);
  });
});
minusAll.forEach((minus) => {
  minus.addEventListener("click", (e) => {
    if (e.target.parentElement.classList.contains("user1")) {
      if (cnt1 > 0) cnt1 -= 1;
    } else {
      if (cnt2 > 0) cnt2 -= 1;
    }
    updateCounts();
    updateDocument(dateStr);
  });
});


let prevDateCnt = 0;
const updatePrevDate = () => {
  let prevDate = new Date();
  prevDate.setDate(prevDate.getDate() - prevDateCnt);
  let prevDateNum = prevDate.getDate();
  let prevDateMonth = months[prevDate.getMonth()];
  let prevDateYear = prevDate.getFullYear();
  let prevDateStr = prevDateNum + prevDateMonth + prevDateYear;
  date.textContent = `${prevDateNum} ${prevDateMonth} ${prevDateYear}`;
  (cnt1 = 0), (cnt2 = 0);
  dateStr = prevDateStr;
  getDocument(prevDateStr);
};
prev.addEventListener("click", (e) => {
  prevDateCnt += 1;
  updatePrevDate();
});
next.addEventListener("click", (e) => {
  if (prevDateCnt > 0) {
    prevDateCnt -= 1;
    updatePrevDate();
  } else {
    alert("Why do you want to check future");
  }
});
