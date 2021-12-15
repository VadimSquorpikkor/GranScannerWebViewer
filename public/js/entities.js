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

let measConverter = {
  toFirestore: function (meas) {
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


class DrCount {
  constructor(dr, cps, dr_err, count_err) {
    this.dr = dr;
    this.cps = cps;
    this.dr_err = dr_err;
    this.count_err = count_err;
  }

  toString() {
    return this.dr + ', ' +
      this.cps + ', ' +
      this.dr_err + ', ' +
      this.count_err;
  }
}

let drCpsConverter = {
  toFirestore: function (meas) {
    return {
      dr: meas.dr,
      cps: meas.cps,
      dr_err: meas.dr_err,
      cps_err: meas.cps_err
    };
  },
  fromFirestore: function (snapshot, options) {
    const data = snapshot.data(options);
    return new Meas(data.dr, data.cps, data.dr_err, data.cps_err);
  }
};
