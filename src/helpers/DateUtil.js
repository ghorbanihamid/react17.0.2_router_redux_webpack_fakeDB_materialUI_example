import {CommonUtil}                     from "../helpers/CommonUtil";


export const DAYS_NAMES = ['SUNDAY','MONDAY','TUESDAY','WEDNEWSDAY','THURSDAY','FRIDAY','SATURDAY'];

export const DateUtil = {

    isValidDate : function (jDate) {

        let tempDate = jDate.toString();
        if (tempDate.indexOf('/') > 0) {
            tempDate = tempDate.replace(new RegExp('/', 'g'), '');
        }

        if(!CommonUtil.isNumeric(tempDate))
            return false;

        return tempDate.length === 8;
    },
    addDateSeparator: function (jDate,delimiter) {
        let tempYear = 0;
        let tempMonth = 0;
        let tempDay = 0;
        if (jDate.length === 8) {
            tempYear  = jDate.substring(0, 4);
            tempMonth = jDate.substring(4, 6);
            tempDay   = jDate.substring(6, 8);
        }
        else if (jDate.length === 10) {
            tempYear = jDate.substring(0, 4);
            tempMonth = jDate.substring(5, 7);
            tempDay = jDate.substring(8, 10);
        }
        if(!delimiter || !['/', '-', '.'].includes(delimiter)) {
            delimiter = '/';
        }
        return tempYear + delimiter + tempMonth + delimiter + tempDay;
    }
    ,
    removeDateDelimiter : function (jDate) {

        if (!DateUtil.isValidDate(jDate)) {
            return '';
        }
        let delimiter = '';
        if (jDate.indexOf('/') > 0) {
            delimiter = '/';
        }
        if (jDate.indexOf('-') > 0) {
            delimiter = '-';
        }
        if (jDate.indexOf('.') > 0) {
            delimiter = '.';
        }
        let tempDate = jDate;
        if(delimiter !== '') {
            tempDate = tempDate.replace(new RegExp(delimiter, 'g'), '');
        }
        if(tempDate.length !== 8){
            return '';
        }
        return tempDate;
    }
    ,
    isLeapYear : function (jDate) {

        let tempDate = DateUtil.removeDateDelimiter(jDate);
        if(tempDate === ''){
            return false;
        }
        let year  = tempDate.substring(0,4);
        let remainNumbers = [1,5,9,13,17,22,26,30];
        for(let i = 0; i<remainNumbers.length; i++) {
            if (remainNumbers[i] === (year % 33))
                return true;
        }
        return false;
    }
    ,
    daysInMonth : function(jDate) {

        let tempDate = DateUtil.removeDateDelimiter(jDate);
        if(tempDate === ''){
            return 0;
        }
        let year  = parseInt(tempDate.substring(0, 4));
        let month = parseInt(tempDate.substring(4, 6));
        if (month < 7)
            return 31;
        else if (month < 12)
            return 30;
        else {
            if (DateUtil.isLeapYear(year))
                return 30;
            else
                return 29;
        }
    },
    isSameDate : function (jDate1,jDate2) {

        let tempDate1 = DateUtil.removeDateDelimiter(jDate1);
        let tempDate2 = DateUtil.removeDateDelimiter(jDate2);
        if(tempDate1 === '' || tempDate2 === ''){
            return false;
        }
        return tempDate1 === tempDate2;
    }
    ,
    isLessThanOrEqual : function (jDate1,jDate2) {

        let tempDate1 = DateUtil.removeDateDelimiter(jDate1);
        let tempDate2 = DateUtil.removeDateDelimiter(jDate2);
        if(tempDate1 === '' || tempDate2 === ''){
            return false;
        }
        return parseInt(tempDate1) <= parseInt(tempDate2);
    }
    ,
    isSameMonth : function (jDate1,jDate2) {

        let tempDate1 = DateUtil.removeDateDelimiter(jDate1);
        let tempDate2 = DateUtil.removeDateDelimiter(jDate2);
        if(tempDate1 === '' || tempDate2 === ''){
            return false;
        }
        let month1 = parseInt(tempDate1.substring(4, 6));
        let month2 = parseInt(tempDate2.substring(4, 6));
        return month1 === month2;
    }
    ,
    isSameDay : function (jDate1,jDate2) {

        let tempDate1 = DateUtil.removeDateDelimiter(jDate1);
        let tempDate2 = DateUtil.removeDateDelimiter(jDate2);
        if(tempDate1 === '' || tempDate2 === ''){
            return false;
        }
        let day1 = parseInt(tempDate1.substring(6, 8));
        let day2 = parseInt(tempDate2.substring(6, 8));
        return day1 === day2;
    }
    ,
    getDayOfWeek : function (jDate) {
        let tempDate = DateUtil.removeDateDelimiter(jDate);
        if(tempDate === '')
            return 0;
        return DateUtil.getDaysFromBegin(tempDate) % 7;
    }
    ,
    getDayOfWeekName : function (jDate) {

        let day = DateUtil.getDayOfWeek(jDate);
        return DAYS_NAMES[day];
    }
    ,
    getStartDateOfWeek : function (jDate,delimiter) {

        if(arguments.length === 1) {
            if (arguments[0].length <= 1) {
                delimiter = arguments[0];
                jDate = DateUtil.getJalaliCurrentDate('');
            }
        }
        if(!jDate)
            jDate = DateUtil.getJalaliCurrentDate('');
        let day = DateUtil.getDayOfWeek(jDate);
        return DateUtil.subtractDaysFromDate(jDate,day,delimiter);
    }
    ,
    getEndDateOfWeek : function (jDate,delimiter) {
        if(arguments.length === 1) {
            if (arguments[0].length <= 1) {
                delimiter = arguments[0];
                jDate = DateUtil.getJalaliCurrentDate('');
            }
        }
        if(!jDate)
            jDate = DateUtil.getJalaliCurrentDate('');
        let day = DateUtil.getDayOfWeek(jDate);
        return DateUtil.addDaysToDate(jDate,6 - day,delimiter);
    }
    ,
    getStartOfMonth : function (jDate) {
        return jDate.toString().substring(0, 6) + '01';
    }
    ,
    getEndOfMonth(jDate) {

        let tempDate = DateUtil.removeDateDelimiter(jDate);
        if(tempDate === ''){
            return 0;
        }
        let year  = parseInt(tempDate.substring(0, 4));
        let month = parseInt(tempDate.substring(4, 6));
        const daysInMonth = DateUtil.daysInMonth(year, month);
        return year.toString() + month.toString() + daysInMonth.toString();
    }
    ,
    addDaysToDate : function (jDate,days,delimiter) {

        if(days === 0){
            return jDate;
        }
        let tempDate = DateUtil.removeDateDelimiter(jDate);
        if(tempDate === ''){
            return tempDate;
        }
        let year  = parseInt(tempDate.substring(0, 4));
        let month = parseInt(tempDate.substring(4, 6));
        let day   = parseInt(tempDate.substring(6, 8));
        let tempDay = day + days;
        if(tempDay > 29) {
            let g = true;
            while (g) {
                if (month <= 6) {
                    if (tempDay <= 31) {
                        g = false;
                        break;
                    }
                    else {
                        tempDay -= 31;
                        month++;
                    }
                }
                else if (month <= 11 || (month === 12 && DateUtil.isLeapYear(year))) {
                    if (tempDay <= 30) {
                        g = false;
                        break;
                    }
                    else {
                        tempDay -= 30;
                        month++;
                    }
                }
                else {
                    if (tempDay <= 29) {
                        g = false;
                        break;
                    }
                    else {
                        tempDay -= 29;
                        month++;
                    }
                }
                if (month > 12) {
                    month -= 12;
                    year++;
                }
            }
        }
        let resultYear = year.toString();
        let resultMonth = month < 10 ? '0' + month : month.toString();
        let resultDay = tempDay < 10 ? '0' + tempDay : tempDay.toString();
        if(delimiter || delimiter === '') {
            if (!['/', '-', '.',''].includes(delimiter))
                delimiter = '/';
            return resultYear + delimiter + resultMonth + delimiter + resultDay;
        }
        else {
            return [resultYear,resultMonth,resultDay];
        }
    }
    ,
    subtractDaysFromDate : function (jDate,days,delimiter) {

        if(days === 0){
            return jDate;
        }
        let tempDate = DateUtil.removeDateDelimiter(jDate);
        if(tempDate === ''){
            return tempDate;
        }
        let year  = parseInt(tempDate.substring(0, 4));
        let month = parseInt(tempDate.substring(4, 6));
        let day   = parseInt(tempDate.substring(6, 8));
        let tempDay = day - days;
        if(tempDay < 0) {
            let g = true;
            while (g) {
                if (month === 1) {
                    month = 12;
                    year--;
                    if(DateUtil.isLeapYear(year))
                        tempDay += 30;
                    else
                        tempDay += 29;
                }
                else if (month <= 6) {
                    tempDay += 31;
                    month--;
                }
                else if (month <= 12) {
                    tempDay += 30;
                    month--;
                }
                if (tempDay > 0) {
                    g = false;
                    break;
                }
            }
        }
        let resultYear = year.toString();
        let resultMonth = month < 10 ? '0' + month : month.toString();
        let resultDay = tempDay < 10 ? '0' + tempDay : tempDay.toString();
        if(delimiter || delimiter === '') {
            if (!['/', '-', '.',''].includes(delimiter))
                delimiter = '/';
            return resultYear + delimiter + resultMonth + delimiter + resultDay;
        }
        else {
            return [resultYear,resultMonth,resultDay];
        }
    }
    ,
    addMonthToDate : function (jDate,months) {

        let tempDate = DateUtil.removeDateDelimiter(jDate);
        if(tempDate === ''){
            return tempDate;
        }
        let year   = parseInt(tempDate.substring(0, 4));
        let month  = parseInt(tempDate.substring(4, 6));
        let dayStr = tempDate.substring(6, 8);
        let tempMonth = month + months;
        if (tempMonth > 12) {
            year++;
            tempMonth -= 12;
        }
        return year + (tempMonth < 10 ? '0' + tempMonth : tempMonth) + dayStr;
    }
    ,
    subtractMonthFromDate : function (jDate,months) {

        let tempDate = DateUtil.removeDateDelimiter(jDate);
        if (tempDate === '') {
            return tempDate;
        }
        let year = parseInt(tempDate.substring(0, 4));
        let month = parseInt(tempDate.substring(4, 6));
        let dayStr = tempDate.substring(6, 8);
        let tempMonth = month - months;
        if (tempMonth <= 0) {
            year--;
            tempMonth += 12;
        }
        return year + (tempMonth < 10 ? '0' + tempMonth : tempMonth) + dayStr;
    }
    ,
    getDaysFromBegin : function (jDate) {

        let tempDate = DateUtil.removeDateDelimiter(jDate);
        if(tempDate === ''){
            return 0;
        }
        let year = parseInt(tempDate.substring(0, 4));
        let month = parseInt(tempDate.substring(4, 6));
        let day   = parseInt(tempDate.substring(6, 8));

        let days = 0;
        if (month <= 6) {
            days = (month - 1) * 31 + day;
        }
        else if (month <= 12) {
            if(month === 12 && day === 30) {
                days = 366;
            }
            days = (6 * 31) + ((month - 7) * 30) + day;
        }
        return (year *365) + Math.floor(year / 4) + days;
    }
    ,
    getDaysPastOfYear : function (jDate) {

        let tempDate = DateUtil.removeDateDelimiter(jDate);
        if(tempDate === ''){
            return 0;
        }
        let month = parseInt(tempDate.substring(4, 6));
        let day   = parseInt(tempDate.substring(6, 8));

        if (month <= 6) {
            return (month - 1) * 31 + day;
        }
        else if (month <= 12) {
            if(month === 12 && day === 30) {
                return 366;
            }
            return (6 * 31) + ((month - 7) * 30) + day;
        }
    }
    ,
    getDaysRemainedOfYear : function (jDate) {

        let pastDays = DateUtil.getDaysPastOfYear(jDate);
        if(DateUtil.isLeapYear(jDate)) {
            return  366 - pastDays;
        }
        else {
            return  365 - pastDays;
        }
    }
    ,
    getDaysBetweenDates : function (jDate1,jDate2) {

        let tempDate1 = DateUtil.removeDateDelimiter(jDate1);
        let tempDate2 = DateUtil.removeDateDelimiter(jDate2);
        if(tempDate1 === '' || tempDate2 === ''){
            return -1;
        }

        if(parseInt(tempDate1) === parseInt(tempDate2)){
            return 0;
        }

        if(parseInt(tempDate1) > parseInt(tempDate2)){
            let tempDate = tempDate1;
            tempDate1 = tempDate2;
            tempDate2 = tempDate;
        }

        let year1 = parseInt(tempDate1.substring(0, 4));
        let year2 = parseInt(tempDate2.substring(0, 4));

        if(parseInt(year1) === parseInt(year2)) {
            return DateUtil.getDaysPastOfYear(jDate2) - DateUtil.getDaysPastOfYear(jDate1);
        }
        let remainedDays = DateUtil.getDaysRemainedOfYear(jDate1);
        let pastDays = DateUtil.getDaysPastOfYear(jDate2);

        let tempDays = remainedDays + pastDays;
        let tempYear = year1 + 1;
        while(tempYear < year2 ){
            if(DateUtil.isLeapYear(tempYear)) {
                tempDays += 366;
            }
            else
                tempDays += 365;
            tempYear++;
        }
        return tempDays;
    }
    ,
    gregorianToJalali: function(gDateOrYear,gMonth,gDay) {

        let tempYear = 0;
        let tempMonth = 0;
        let tempDay = 0;

        if (arguments.length === 1) {
            if (gDateOrYear.length !== 8 && gDateOrYear.length !== 10)
                return '';

            if (gDateOrYear.length === 8) {
                tempYear  = gDateOrYear.substring(0, 4);
                tempMonth = gDateOrYear.substring(4, 6);
                tempDay   = gDateOrYear.substring(6, 8);
            }
            else if (gDateOrYear.length === 10) {
                tempYear = gDateOrYear.substring(0, 4);
                tempMonth = gDateOrYear.substring(5, 7);
                tempDay = gDateOrYear.substring(8, 10);
            }
        }
        else {
            tempYear  = gDateOrYear;
            tempMonth = CommonUtil.isEmpty(gMonth) ? 1 : gMonth;
            tempDay   = CommonUtil.isEmpty(gDay) ? 1 : gDay ;
        }
        let resultDate = calculateGregorianToJalali(parseInt(tempYear),parseInt(tempMonth),parseInt(tempDay),arguments.length);

        if(arguments.length === 1) {
            let resultYear = resultDate[0].toString();
            let resultMonth = resultDate[1] < 10 ? "0" + resultDate[1].toString() : resultDate[1].toString();
            let resultDay = resultDate[2] < 10 ? "0" + resultDate[2].toString() : resultDate[2].toString();
            let delimiter = '';
            if(gDateOrYear.length === 10)
                delimiter = '/';
            return resultYear + delimiter + resultMonth + delimiter + resultDay;
        }
        else {
            return resultDate;
        }

        function calculateGregorianToJalali (gYear, gMonth, gDay, argsLen) {

            let g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
            let jYear = 0;
            if (gYear > 1600) {
                jYear = 979;
                gYear -= 1600;
            }
            else {
                jYear = 0;
                gYear -= 621;
            }
            let gYear2 = (gMonth > 2) ? (gYear + 1) : gYear;
            let days = (365 * gYear) + (parseInt((gYear2 + 3) / 4)) - (parseInt((gYear2 + 99) / 100)) + (parseInt((gYear2 + 399) / 400)) - 80 + gDay + g_d_m[gMonth - 1];
            jYear += 33 * (parseInt(days / 12053));
            days %= 12053;
            jYear += 4 * (parseInt(days / 1461));
            days %= 1461;
            if (days > 365) {
                jYear += parseInt((days - 1) / 365);
                days = (days - 1) % 365;
            }
            let jMonth = (days < 186) ? 1 + parseInt(days / 31) : 7 + parseInt((days - 186) / 30);
            let jDay = 1 + ((days < 186) ? (days % 31) : ((days - 186) % 30));
            return [jYear, jMonth, jDay];
        }
    }
    ,
    getCurrentDate: function (delimiter) {
        try {
            if(CommonUtil.getCurrentLocale() === 'en'){
                return DateUtil.getGregorianCurrentDate(delimiter);
            }
            return DateUtil.getJalaliCurrentDate(delimiter);
        }
        catch (e) {
            return false
        }
    },
    getGregorianCurrentDate: function(delimiter) {
        let gDate = new Date();
        let resultYear = gDate.getFullYear();
        let resultMonth = gDate.getMonth() < 10 ? "0" + (gDate.getMonth() + 1).toString() : (gDate.getMonth() + 1).toString();
        let resultDay = gDate.getDate() < 10 ? "0" + gDate.getDate().toString() : gDate.getDate().toString();
        if(delimiter || delimiter === '') {
            if (!['/', '-', '.',''].includes(delimiter))
                delimiter = '/';
            return resultYear + delimiter + resultMonth + delimiter + resultDay;
        }
        else {
            return [resultYear,resultMonth,resultDay];
        }
    },
    getJalaliCurrentDate: function(delimiter) {
        let jDate = DateUtil.getServerCurrentDate(delimiter);
        if(jDate){
            return jDate;
        }
        let gDate = new Date();
        jDate = DateUtil.gregorianToJalali(gDate.getFullYear(),gDate.getMonth() + 1,gDate.getDate());
        let resultYear = jDate[0].toString();
        let resultMonth = jDate[1] < 10 ? "0" + jDate[1].toString() : jDate[1].toString();
        let resultDay = jDate[2] < 10 ? "0" + jDate[2].toString() : jDate[2].toString();
        if(delimiter || delimiter === '') {
            if (!['/', '-', '.',''].includes(delimiter))
                delimiter = '/';
            return resultYear + delimiter + resultMonth + delimiter + resultDay;
        }
        else {
            return jDate;
        }

    },
    getJalaliYesterdayDate: function(delimiter) {
        return DateUtil.subtractDaysFromDate(DateUtil.getJalaliCurrentDate(''),1,delimiter);
    },
    getJalaliTomorrowDate: function(delimiter) {
        return DateUtil.addDaysToDate(DateUtil.getJalaliCurrentDate(''),1,delimiter);
    }
}
