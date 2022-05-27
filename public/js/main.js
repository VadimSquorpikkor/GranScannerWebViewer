let db = firebase.firestore();
let timeLast = 0;

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
        '  <td>Код усиления</td>'+
        '  <td>Позиция пика</td>'+
        '</tr>';

    for (let i = arr.length-1; i >=0 ; i--) {
      meas = arr[i];

      let gainCode = (meas.gain_code);
      let peak = (meas.peak);//.toFixed(3);
      let stateDate = meas.date.toDate().toLocaleDateString('ru-RU'); //Дата - 18.03.2021
      let stateTime = meas.date.toDate().toLocaleTimeString('ru-RU'); //Время - 09:07:49
      let date = stateDate + " " + stateTime;
      let timePassed = timeLast===0?0:timeLast - meas.date;
      timePassed = timePassed.toFixed(1);
      timeLast = meas.date;

      data +=
      '<tr>'+
      '  <td class="num">'+i+'</td>'+
      '  <td class="date">'+date+'</td>'+
      '  <td class="date">'+timePassed+'</td>'+
      '  <td>'+gainCode+'</td>'+
      '  <td>'+peak+'</td>'+
      '</tr>';
    }

    document.getElementById('row_table').innerHTML = '' + data;
  }
  console.log(arr.length);
}

listen_new(measConverter, addData);
listen_cps(drCpsConverter, addDrCps);
