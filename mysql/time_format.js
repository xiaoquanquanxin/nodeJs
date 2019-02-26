module.exports = {
    time2date: function (timeStamp) {
        timeStamp = timeStamp * 1000;
        if (isNaN(timeStamp)) {
            return {}
        }
        let time = new Date(timeStamp);
        return {
            year: time.getFullYear(),
            month: this.fillZero(time.getMonth() + 1),
            date: this.fillZero(time.getDate()),
            hour: this.fillZero(time.getHours()),
            minutes: this.fillZero(time.getMinutes()),
            second: this.fillZero(time.getSeconds()),
        }
    },
    fillZero: function (val) {
        val = Number(val);
        if (isNaN(val)) {
            return false
        }
        return (val < 10 ? '0' + val : val);
    }
};