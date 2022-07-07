let db = firebase.firestore();
let timeLast;

function listen_cps(converter, func) {
  db.collection("test_user_2").doc("dr_cps")
    .onSnapshot((doc) => {
      console.log(doc.data().dr);
      func(doc.data().dr, doc.data().cps);
    });
}

function listen_new(converter, func) {
  db.collection("test_user_2").doc("gc_log").collection("session").withConverter(converter)
    .onSnapshot((snapshot) => {
      let arr = [];
      snapshot.forEach((doc) => {
        obj = doc.data();
        arr.push(obj);
      });
      func(arr);
    });
}

function addDrCps(dr, cps) {
  document.getElementById('dr').textContent = dr.toFixed(3);
  document.getElementById('cps').textContent = cps.toFixed(0);
}

function getTimePassed(time) {
  let min = (time/60).toFixed(0)+'мин ';
  let sec = (time%60).toFixed(0);
  sec = sec<10?'0'+sec:sec;
  sec += 'сек';
  return min+sec;
}

function insertNothing(target) {
  if (document.getElementById(target) != null) {
    document.getElementById(target).innerHTML = '<table>' +
      '<tr>' +
      '  <td>№ Изм.</td>' +
      '  <td>Дата</td>' +
      '  <td>Время между изм. (с)</td>' +
      '  <td>Температура</td>' +
      '  <td>Код усиления</td>' +
      '  <td>Позиция пика</td>' +
      '  <td>Стаб. позиция</td>' +
      '</tr>' +
      '</table>';
  }
}

function addData(arr) {
  if (arr.length === 0) insertNothing('row_table');
  else if (document.getElementById('row_table') != null) {

    let meas;
    let data = '';


      data +='<table>';
      data +=
        '<tr>'+
        '  <td>№ Изм.</td>'+
        '  <td>Дата</td>'+
        '  <td>Время между изм. (с)</td>'+
        '  <td>Температура</td>'+
        '  <td>Код усиления</td>'+
        '  <td>Позиция пика / среднее</td>'+
        '  <td>Стаб. позиция</td>'+
        '</tr>';

    for (let i = arr.length-1; i >=0 ; i--) {
      meas = arr[i];
      if (i === arr.length-1) timeLast = meas.date;

      let gainCode = (meas.gain_code);
      let peak = (meas.peak);//.toFixed(3);
      let stateDate = meas.date.toDate().toLocaleDateString('ru-RU'); //Дата - 18.03.2021
      let stateTime = meas.date.toDate().toLocaleTimeString('ru-RU'); //Время - 09:07:49
      let date = stateDate + " " + stateTime;
      let timePassed = getTimePassed(timeLast - meas.date);
      timeLast = meas.date;
      let peakIsOk = meas.result===0?'':'<span style="color: #33ff33"> OK</span>';
      let temperature = (meas.temperature).toFixed(1);
      let stabPosition = meas.stabPosition;
      let averagePosition = (meas.averagePosition).toFixed(1);

      data +=
      '<tr>'+
      '  <td class="num">'+i+'</td>'+
      '  <td class="date">'+date+'</td>'+
      '  <td class="date">'+timePassed+'</td>'+
      '  <td>'+temperature+'</td>'+
      '  <td>'+gainCode+'</td>'+
      '  <td>'+peak + /*' / ' + averagePosition +*/ peakIsOk+'</td>'+
      '  <td>'+stabPosition+'</td>'+
      '</tr>';
    }

    document.getElementById('row_table').innerHTML = '' + data;
  }
  console.log(arr.length);
}


function addNewData(arr) {
  addData(arr);

  let gArr = [arr.length];
  for (let i = 0; i < arr.length; i++) {
    gArr[i] = arr[i].peak;
  }
  addGData(gArr);
}

// listen_new(measConverter, addData);
listen_new(measConverter, addNewData);
listen_cps(drCpsConverter, addDrCps);
