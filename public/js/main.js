console.log("go!");
let db = firebase.firestore();

class Meas {
  constructor(gain_code, peak, date) {
    this.gain_code = gain_code;
    this.peak = peak;
    this.date = date;
  }

  toString() {
    return this.gain_code + ', ' +
      this.peak + ', ' +
      this.date;
  }
}

let dUnitConverter = {
  toFirestore: function (meas) {
    console.log('CONVERTER - '+meas.close_date);
    return {
      gain_code: meas.gain_code,
      peak: meas.peak,
      date: meas.date
    };
  },
  fromFirestore: function (snapshot, options) {
    const data = snapshot.data(options);
    return new Meas(data.gain_code, data.peak, data.date);
  }
};


function listen_new(converter, func) {
  db.collection("test_user").doc("gc_log").collection("20211214_112600").withConverter(converter)
  // db.collection("test_user").doc("gc_log").collection("session").withConverter(converter)
    .onSnapshot((snapshot) => {
      let arr = [];
      snapshot.forEach((doc) => {
        console.log("!!!"+doc.data().gain_code);
        console.log("!!!"+doc.data().peak);
        ////func(doc.data().gain_code, doc.data().peak, doc.data().date)
        obj = doc.data();
        arr.push(obj);
      });
      func(arr);
      func(arr);
    });
}

function addData(arr) {
  if (arr.length === 0) insertNothing('row_table');
  else if (document.getElementById('row_table') != null) {

    let meas;
    let data = '';


      data +='<table>';
      data +=
        '<tr>'+
        '  <td>Дата</td>'+
        '  <td>Код усиления</td>'+
        '  <td>Позиция пика</td>'+
        '</tr>';


    for (let i = 0; i < arr.length; i++) {
      console.log(i);
      meas = arr[i];

      let gainCode = meas.gain_code;
      let peak = meas.peak;
      let stateDate = meas.date.toDate().toLocaleDateString('ru-RU'); //Дата - 18.03.2021
      let stateTime = meas.date.toDate().toLocaleTimeString('ru-RU'); //Время - 09:07:49
      let date = stateDate + " " + stateTime;

      // data +='<span>'+gainCode+' '+peak+' '+date+'</span><br>';

      data +=
      '<tr>'+
      '  <td>'+date+'</td>'+
      '  <td>'+gainCode+'</td>'+
      '  <td>'+peak+'</td>'+
      '</tr>';
    }

    document.getElementById('row_table').innerHTML = '' + data;
  }
}

listen_new(dUnitConverter, addData);
